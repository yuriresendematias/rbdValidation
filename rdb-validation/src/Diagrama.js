import ArvoreBlocos from './ArvoreBlocos';
import Bloco from './Bloco';
class Diagrama{

    constructor(){
        this.ultimoId   = 0
        this.inicio     = new ArvoreBlocos("serie")
    }

    iniciar(bloco){
        bloco.setId(this.ultimoId + 1)
        this.ultimoId += 1
        bloco.setPai(this.inicio)                           //pai do bloco será a árvore de inicio do diagrama
        this.inicio.adicionarBloco(bloco)                   //adiciona o primeiro bloco do diagrama
    }

    adicionarBlocoSerie(bloco, blocoAnterior){
        if (blocoAnterior.getPai().tipo == "paralelo"){
            this.ramificar(bloco, blocoAnterior, "serie")
        }else{
            let pai = blocoAnterior.getPai()
            bloco.setId(this.ultimoId + 1)
            this.ultimoId += 1
            bloco.setPai(pai)
            pai.adicionarBloco(bloco)                           //adiciona o bloco em serie com o bloco anterior
        } 
    }

    //caso o pai seja um bloco
    //cria uma arvore de blocos paralelos
    //que tem bloco e pai como filhos
    //e substitui pai na arvore de blocos original
    adicionarBlocoParalelo(bloco, pai){   
        if(pai instanceof Bloco){
            this.ramificar(bloco, pai, "paralelo")
        }
        
        else{ //então pai é uma arvore
            bloco.setId(this.ultimoId)
            this.ultimoId += 1
            pai.adicionarBloco(bloco)
            bloco.setPai(pai)
        }
    }

    //substitui um bloco na arvore por uma arvore contendo os dois blocos passados como parametro
    ramificar(bloco, pai, tipo){
        let idArvore = this.ultimoId + 1
        let idBloco = idArvore + 1
        let arv = new ArvoreBlocos(tipo)               //cria uma arvore de blocos
        
        this.ultimoId += 2                             //atualiza o ultimo id      
        
        bloco.setId(idBloco)                           //seta o id do bloco                           
        arv.setId(idArvore)                            //seta o id da arvore
        
        arv.adicionarBloco(pai)                        //adiciona o pai em arv 
        arv.adicionarBloco(bloco)                      //adiciona o bloco na arvore arv

        pai.getPai().trocarFilho(pai, arv)             //insere arv no lugar do pai na arvore a qual pai pertencia      
    
        bloco.setPai(arv)                              //insere o pai do bloco
        pai.setPai(arv)                                //atualiza o pai do "bloco pai"
    }

    //calcula a confiabilidade do diagrama
    calcularConfiabilidade(){
        let inicio = this.inicio.getFilhos()[0]
        if (inicio instanceof Bloco){                           //significa que os 2 primeiros blocos do diagrama estão em serie
            return this.calcularConfiabilidadeSerie(this.inicio) //então passa a arvore que representa o diagrama
        }else{                                                  //significa que os 2 primeiros blocos do diagrama estão em paralelo
            return this.calcularConfiabilidadeParalelo(inicio)   //então passa a arvore que representa os blocos em paralelo
        }
    }

    //calcula a confiabilidade dos blocos em paralelo
    calcularConfiabilidadeParalelo(arv){
        let resultado = 1
        arv.getFilhos().forEach(bloco => {
            
            if (bloco instanceof ArvoreBlocos && bloco.getTipo() == "serie"){
                resultado = resultado * (1 - this.calcularConfiabilidadeSerie(bloco))
            }else if(bloco instanceof ArvoreBlocos && bloco.getTipo() == "paralelo"){
                resultado = resultado * (1- this.calcularConfiabilidadeParalelo(bloco))
            }
            else{
                resultado = resultado * (1 - bloco.getConfiabilidade())
            }
        });

        return 1 - resultado
    }

    //calcula a confiabilidade dos blocos em serie
    calcularConfiabilidadeSerie(arv){
        let resultado = 1

        arv.getFilhos().forEach(bloco => {
            
            if (bloco instanceof ArvoreBlocos && bloco.getTipo() == "paralelo"){
                resultado = resultado * this.calcularConfiabilidadeParalelo(bloco)
            }else{
                resultado = resultado * bloco.getConfiabilidade()
            }
        });

        return resultado
    }
}

export default Diagrama;