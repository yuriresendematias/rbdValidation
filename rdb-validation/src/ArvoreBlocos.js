import Bloco from './Bloco';

class ArvoreBlocos{

    constructor (tipo){
        this.id     = 0
        this.tipo   = tipo                      //serie ou paralelo
        this.raiz   = new Bloco(1, 1, 1)        //raiz neutra para a realização dos calculos
        this.filhos = []                        //blocos em serie
    }

    getFilhos(){
        return this.filhos
    }

    setId(id){
        this.id = id
    }

    getTipo(){
        return this.tipo
    }

    adicionarBloco(bloco){
        this.filhos.push(bloco)
    }

    percorrerArvore(raiz){
        const resultado = 1
        raiz.filhos.forEach(bloco => {
            //manipular bloco atual tratando em serie
            //atualizando a variavel resultado
            if (bloco.filhos != null){
                let valor = this.percorrerArvore(bloco.filhos) //tem que guardar o valor retornado
                //trata valor em paralelo com o bloco atual
                //atualizando a variavel resultado
            }
        });
    }

    //troca um elemento da arvore
    trocarFilho(bloco, arv){
        let indice = this.filhos.indexOf(bloco)
        this.filhos.splice(indice, 1, arv)
    }
}

export default ArvoreBlocos;