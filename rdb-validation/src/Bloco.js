class Bloco{

    constructor(avaliabilidade, mttf, mttr){
        this.id = 0
        this.avaliabilidade = avaliabilidade;
        this.mttf   = mttf;
        this.mttr   = mttr;
        this.pai    = null
        this.filhos  = []
    }

    getId(){
        return this.id
    }

    getPai(){
        return this.pai
    }

    getFilhos(){
        return this.filho
    }

    setId(id){
        this.id = id
    }

    setPai(bloco){
        this.pai = bloco
    }

    setFilho(bloco){
        if(this.filho == null){
            let arvore = new ArvoreBlocos()             //criar outra arvore
            arvore.adicionarBloco(bloco)                //adicionar o bloco como filho dessa arvore
            this.Filho = arvore                         //adicionar a arvore como filha de blocopai 
        }else{
            this.filho.setFilho(bloco)
        }
    }

    getAvaliabilidade(){
        //salva o valor atual da avaliabilidade em uma variavel chamada resultado
        //se tiver filho, pega a avaliabilidade do bloco "+" avaliabilidade do filho
        //salva o resultado
        //"soma" o resultado com o resultado da avaliabilidade do próximo
        //retorna resultado
    }

}