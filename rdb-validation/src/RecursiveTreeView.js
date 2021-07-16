import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import Bloco from './Bloco';

const data = {
  id: 'root',
  name: 'Diagrama',
  children: [   
  ],
};

let diagrama = null

const useStyles = makeStyles({
  root: {
    height: 110,
    flexGrow: 1,
    maxWidth: 400,
  },
});
export const atualizarDiagrama = (diagramaEnviado) => {
  console.log(diagramaEnviado)
  diagrama= diagramaEnviado
}

export default function RecursiveTreeView(...props) {

  const classes = useStyles();  
  //console.log(props.diagrama.inicio.filhos[0])
  /* let lista = props.diagrama
  useEffect(() => {
    console.log("8933")
    console.log(lista)
  }, [lista])
  if(props.diagrama){
    console.log(props.diagrama.inicio.filhos[0])
  }
 */
  const renderTreeBloco = (nodes) => (
    <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.label}>
      {Array.isArray(nodes.filhos) ? nodes.filhos.map((node) => renderTree(node)) : null}
    </TreeItem>
  )


  const renderTree = (nodes) => (
    <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes instanceof Bloco ? nodes.label : nodes.tipo}>
      {Array.isArray(nodes.filhos) ? nodes.filhos.map((node) => node instanceof Bloco ? item(node) : renderTree(node) ) : null}
    </TreeItem>
  );

  const item = (node) => (
    <TreeItem key={node.id} nodeId={node.id} label={node.label}></TreeItem>
  )

  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpanded={['root']}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      {diagrama  && renderTree(diagrama.inicio)}
    </TreeView>
  );
}