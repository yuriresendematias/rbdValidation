import ArvoreBlocos from './ArvoreBlocos';

export default class Bloco{

    constructor(mttf, mttr, nome){
        this.id = 0
        this.confiabilidade = parseInt(mttf) / (parseInt(mttf) + parseInt(mttr));
        this.mttf   = parseInt(mttf);
        this.mttr   = parseInt(mttf);
        this.pai    = null
        this.label = nome
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

    getConfiabilidade(repetitionsValue, rangeMeanValue){
        if(rangeMeanValue == 0){
            return this.confiabilidade;
        }
                
        let mttf = 0;
        let mttr = 0;
        let repetitions = repetitionsValue;
        while(repetitions > 0){
            mttf +=  Math.random() * (this.mttf+rangeMeanValue - (this.mttf-rangeMeanValue < 0 ? 0 : this.mttf-rangeMeanValue)) + this.mttf-rangeMeanValue
            mttr +=  Math.random() * (this.mttr+rangeMeanValue - (this.mttr-rangeMeanValue < 0 ? 0 : this.mttr-rangeMeanValue)) + this.mttr-rangeMeanValue
            repetitions--
        }
        
        mttf = mttf/repetitionsValue;
        mttr = mttr/repetitionsValue;
        
        let confiabilidade = mttf / (mttf + mttr);
        
        return confiabilidade
    }

}