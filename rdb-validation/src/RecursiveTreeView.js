import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';

const data = {
  id: 'root',
  name: 'Series',
  children: [
    {
      id: '1',
      name: 'Node - 1',
    },
    {
      id: '3',
      name: 'Series',
      children: [
        {
          id: '4',
          name: 'Node - 4',
        },
        {
          id: '5',
          name: 'Node - 5',
        },
      ],
    },
    {
      id: '6',
      name: 'Parallel',
      children: [
        {
          id: '7',
          name: 'Node - 7',
        },
        {
          id: '8',
          name: 'Node - 8',
        },
      ],
    },
  ],
};

const useStyles = makeStyles({
  root: {
    height: 110,
    flexGrow: 1,
    maxWidth: 400,
  },
});

export default function RecursiveTreeView(props) {
  const classes = useStyles();

  const renderTree = (nodes) => (
    <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
      {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
    </TreeItem>
  );

  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpanded={['root']}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      {renderTree(data)}
    </TreeView>
  );
}