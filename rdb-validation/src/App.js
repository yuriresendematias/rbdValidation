import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import CameraIcon from "@material-ui/icons/PhotoCamera";
import CodeIcon from "@material-ui/icons/Code";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Paper from "@material-ui/core/Paper";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Box from '@material-ui/core/Box';
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import Dialog from './Dialog';
import RecursiveTreeView, { atualizarDiagrama } from "./RecursiveTreeView";
import { Grid, TextField } from "@material-ui/core";
import Diagrama from './Diagrama';
import Bloco from './Bloco';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        UFAPE
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 0, 6),
    width: "100%",
  },
  heroButtons: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: theme.spacing(8),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const diagrama = new Diagrama();


export default function Album() {
  const classes = useStyles();
  const [repetitionsValue, setRepetitionsnValue] = useState(null);
  const [rangeMeanValue, setRangeMeanValue] = useState(null);
  const [diagramaState, setDiagramaState] = useState(null);
  const [avaliabilitys, setAvaliabilitys] = useState([]);
  const [refreshState, setRefreshState] = useState(new Date);
  const [execution, setExecution] = useState(1);

  const criarBloco = (mttr, mttf, tipo, nome, blocoAnterior) => {
    const bloco = new Bloco(mttf, mttr, nome);

    if (blocoAnterior == null && diagrama.listaBlocos.length == 0) {
      diagrama.iniciar(bloco);
    } else {
      if (tipo == 'series') {
        diagrama.adicionarBlocoSerie(bloco, blocoAnterior);
      } else {
        if (blocoAnterior.getPai().tipo == 'paralelo') {
          diagrama.adicionarBlocoParalelo(bloco, blocoAnterior.getPai());
        } else {
          diagrama.adicionarBlocoParalelo(bloco, blocoAnterior);
        }
      }
    }
    console.log(diagrama);
    setDiagramaState(diagrama);
    atualizarDiagrama(diagrama);
  }

  const handleSubmission = () => {
    
    if (!repetitionsValue && !rangeMeanValue) {
      let availability = diagrama.calcularConfiabilidade(1, 0);
      if (availability) {
        const result = {
          executionNumber: "Execution " + execution,
          repetitionsValue: "Number of repetitions = 1",
          rangeMeanValue: "Range of mean = 0",
          availability: "Avaliability = " + availability,
        }
        let list = avaliabilitys;
        list.unshift(result);
        setExecution(execution + 1);
        setAvaliabilitys(list);
        setRefreshState(new Date);
      }
    } else if (!repetitionsValue) {
      let availability = diagrama.calcularConfiabilidade(1,rangeMeanValue);
      if (availability) {
        const result = {
          executionNumber: "Execution " + execution,
          repetitionsValue: "Number of repetitions = 1",
          rangeMeanValue: "Range of mean = "+rangeMeanValue,
          availability: "Avaliability = " + availability,
        }
        let list = avaliabilitys;
        list.unshift(result);
        setExecution(execution + 1);
        setAvaliabilitys(list);
        setRefreshState(new Date);
      }

    } else if (!rangeMeanValue) {
      let availability = diagrama.calcularConfiabilidade(repetitionsValue, 0);
      if (availability) {
        const result = {
          executionNumber: "Execution " + execution,
          repetitionsValue: "Number of repetitions = "+repetitionsValue,
          rangeMeanValue: "Range of mean = 0",
          availability: "Avaliability = " + availability,
        }
        let list = avaliabilitys;
        list.unshift(result);
        setExecution(execution + 1);
        setAvaliabilitys(list);
        setRefreshState(new Date);
      }
    } else {
      let availability = diagrama.calcularConfiabilidade(repetitionsValue, rangeMeanValue);
      if (availability) {
        const result = {
          executionNumber: "Execution " + execution,
          repetitionsValue: "Number of repetitions = "+repetitionsValue,
          rangeMeanValue: "Range of mean = "+rangeMeanValue,
          availability: "Avaliability = " + availability,
        }
        let list = avaliabilitys;
        list.unshift(result);
        setExecution(execution + 1);
        setAvaliabilitys(list);
        setRefreshState(new Date);
      }
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <CodeIcon className={classes.icon} />
          <Typography variant="h6" color="inherit" noWrap>
            RBD validation
          </Typography>
        </Toolbar>
      </AppBar>
      <Grid style={{ display: 'flex', height: 780, justifyContent: 'center' }} >

        <Grid className={classes.heroContent}>

          <div style={{ display: 'flex', justifyContent: 'space-between',  width: 720 }}>
            <RecursiveTreeView
              diagrama={diagramaState}
            />
            <div className={classes.heroButtons}>
              <Grid sm={12} xs={12} style={{ alignSelf: "center" }}>
                <TextField
                  fullWidth
                  helperText="Enter the number of repetitions"
                  id="repetitionsValue"
                  label="Number of repetitions"
                  size="small"
                  onChange={(e) => setRepetitionsnValue(e.target.value)}
                  value={repetitionsValue}
                  variant="outlined"
                />
              </Grid>
              <Grid sm={12} xs={12} style={{ alignSelf: "center" }}>
                <TextField
                  fullWidth
                  helperText="Enter the range of mean"
                  id="rangeMeanValue"
                  label="Range of mean"
                  size="small"
                  onChange={(e) => setRangeMeanValue(e.target.value)}
                  value={rangeMeanValue}
                  variant="outlined"
                />
              </Grid>
              <Grid container spacing={1} justify="center">
                <Grid item>
                  <Button
                    onClick={handleSubmission}
                    variant="contained"
                    color="primary"
                  >
                    Execute
                  </Button>
                </Grid>
                <Grid item>
                  <Dialog
                    criarBloco={criarBloco}
                    diagrama={diagrama}
                  />
                </Grid>
              </Grid>
              {
                avaliabilitys.length > 0 &&
                <Grid style={{ marginTop: 15, overflowY: 'scroll', height: 600 }}>
                  {avaliabilitys.map((elem) => {
                    return (
                      <Card style={{ marginTop: 10, padding: 5, marginRight: 15, marginLeft: 5 }}>
                        <Box  color="inherit" fontWeight="fontWeightBold" >
                          {elem.executionNumber}
                        </Box >
                        <Typography color="inherit">
                          {elem.repetitionsValue}
                        </Typography>
                        <Typography color="inherit">
                          {elem.rangeMeanValue}
                        </Typography>
                        <Typography color="inherit">
                          {elem.availability}
                        </Typography>
                      </Card>
                    )
                  })}
                </Grid>
              }

            </div>


          </div>


        </Grid>

      </Grid>

      {/* Footer */}
      <footer className={classes.footer}>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}