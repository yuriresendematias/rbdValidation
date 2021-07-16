import Bloco from './Bloco';

class ArvoreBlocos {

    constructor(tipo) {
        this.id = 0
        this.tipo = tipo                      //serie ou paralelo
        this.raiz = new Bloco(1, 1, 1)        //raiz neutra para a realização dos calculos
        this.filhos = []                        //blocos em serie
    }

    getFilhos() {
        return this.filhos
    }

    setId(id) {
        this.id = id
    }

    getTipo() {
        return this.tipo
    }

    adicionarBloco(bloco) {
        this.filhos.push(bloco)
    }

    percorrerArvore(raiz) {
        const resultado = []
        raiz.filhos.forEach(bloco => {
            if (bloco instanceof Bloco) {
                resultado.push(bloco);
            } else {
                console.log(bloco)
                resultado.push.apply(this.percorrerArvore(bloco))
            }
        });
        return resultado;
    }

    //troca um elemento da arvore
    trocarFilho(bloco, arv) {
        let indice = this.filhos.indexOf(bloco)
        this.filhos.splice(indice, 1, arv)
    }
}

export default ArvoreBlocos;