import ArvoreBlocos from './ArvoreBlocos';
import Bloco from './Bloco';

class Diagrama{

    constructor(){
        this.ultimoId   = 0
        this.ultimoIdArvSerie = 1
        this.ultimoIdArvParalelo = 1
        this.inicio     = new ArvoreBlocos("serie", "Diagrama")
        this.listaBlocos = []
    }

    iniciar(bloco){
        bloco.setId(this.ultimoId + 1)
        this.ultimoId += 1
        bloco.setPai(this.inicio)                           //pai do bloco será a árvore de inicio do diagrama
        this.inicio.adicionarBloco(bloco)     
        this.listaBlocos.push(bloco)              //adiciona o primeiro bloco do diagrama
    }

    adicionarBlocoSerie(bloco, blocoAnterior){
        if(blocoAnterior instanceof ArvoreBlocos){
            bloco.setId(this.ultimoId)
            this.ultimoId += 1
            blocoAnterior.adicionarBloco(bloco)
            bloco.setPai(blocoAnterior)
            this.listaBlocos.push(bloco)  
        }
        else if (blocoAnterior.getPai().tipo == "paralelo"){
            this.ramificar(bloco, blocoAnterior, "serie")
        }else{
            let pai = blocoAnterior.getPai()
            bloco.setId(this.ultimoId + 1)
            this.ultimoId += 1
            bloco.setPai(pai)
            pai.adicionarBloco(bloco)   
            this.listaBlocos.push(bloco)                            //adiciona o bloco em serie com o bloco anterior
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
            this.listaBlocos.push(bloco)    
        }
    }

    //substitui um bloco na arvore por uma arvore contendo os dois blocos passados como parametro
    ramificar(bloco, pai, tipo){
        let idBloco = this.ultimoId + 1
        let arv = new ArvoreBlocos(tipo)  //cria uma arvore de blocos 
        if(tipo == "serie"){
            arv.setId(this.ultimoIdArvSerie); 
            this.ultimoIdArvSerie += 1; 
        }else{
            arv.setId(this.ultimoIdArvParalelo);
            this.ultimoIdArvParalelo += 1; 
        }    
        
        this.ultimoId += 1                             //atualiza o ultimo id      
        
        bloco.setId(idBloco)                           //seta o id do bloco                           
                                  //seta o id da arvore
        
        arv.adicionarBloco(pai)                        //adiciona o pai em arv 
        arv.adicionarBloco(bloco)                      //adiciona o bloco na arvore arv

        pai.getPai().trocarFilho(pai, arv)             //insere arv no lugar do pai na arvore a qual pai pertencia      
    
        bloco.setPai(arv)                              //insere o pai do bloco
        pai.setPai(arv)                                //atualiza o pai do "bloco pai"
        this.listaBlocos.push(bloco)
        this.listaBlocos.push(arv)
    }

    //calcula a confiabilidade do diagrama
    calcularConfiabilidade(repetitionsValue, rangeMeanValue){
        if(this.inicio.getFilhos){
            let inicio = this.inicio.getFilhos()[0]
            if (inicio instanceof Bloco){                           //significa que os 2 primeiros blocos do diagrama estão em serie
                return this.calcularConfiabilidadeSerie(this.inicio,repetitionsValue, rangeMeanValue) //então passa a arvore que representa o diagrama
            }else{                                                  //significa que os 2 primeiros blocos do diagrama estão em paralelo
                return this.calcularConfiabilidadeParalelo(inicio, repetitionsValue, rangeMeanValue)   //então passa a arvore que representa os blocos em paralelo
            }
        }else{
            alert("Diagrama vazio");
        }        
    }

    //calcula a confiabilidade dos blocos em paralelo
    calcularConfiabilidadeParalelo(arv, repetitionsValue, rangeMeanValue){
        if(arv){
            let resultado = 1
            arv.getFilhos().forEach(bloco => {
                
                if (bloco instanceof ArvoreBlocos && bloco.getTipo() == "serie"){
                    resultado = resultado * (1 - this.calcularConfiabilidadeSerie(bloco))
                }else if(bloco instanceof ArvoreBlocos && bloco.getTipo() == "paralelo"){
                    resultado = resultado * (1- this.calcularConfiabilidadeParalelo(bloco))
                }
                else{
                    resultado = resultado * (1 - bloco.getConfiabilidade(repetitionsValue, rangeMeanValue))
                }
            });
    
            return 1 - resultado
        }else{
            alert("Diagrama vazio");
        }
        
    }

    //calcula a confiabilidade dos blocos em serie
    calcularConfiabilidadeSerie(arv, repetitionsValue, rangeMeanValue){
        if(arv){
        let resultado = 1

        arv.getFilhos().forEach(bloco => {
            
            if (bloco instanceof ArvoreBlocos && bloco.getTipo() == "paralelo"){
                resultado = resultado * this.calcularConfiabilidadeParalelo(bloco)
            }else{                
                resultado = resultado * bloco.getConfiabilidade(repetitionsValue, rangeMeanValue)
            }
        });

        return resultado
        }else{
            alert("Diagrama vazio");
        }
    }
}

export default Diagrama;