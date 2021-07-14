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
        let arv = new ArvoreBlocos(tipo)                //cria uma arvore de blocos
        
        this.ultimoId += 2                              //atualiza o ultimo id      
        
        bloco.setId(idBloco)                            //seta o id do bloco                           
        arv.setId(idArvore)                             //seta o id da arvore
        
        arv.adicionarBloco(pai)                        //adiciona o pai em arv 
        arv.adicionarBloco(bloco)                      //adiciona o bloco na arvore arv

        pai.getPai().trocarFilho(pai, arv)             //insere arv no lugar do pai na arvore a qual pai pertencia      
    
        bloco.setPai(arv)                               //insere o pai do bloco
        pai.setPai(arv)                                 //atualiza o pai do "bloco pai"
    }
}