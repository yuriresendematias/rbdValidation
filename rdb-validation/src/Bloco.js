import ArvoreBlocos from './ArvoreBlocos';

export default class Bloco{

    constructor(mttf, mttr){
        this.id = 0
        this.confiabilidade = mttf / (mttf + mttr);
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

    getConfiabilidade(){
        return this.confiabilidade
    }
}