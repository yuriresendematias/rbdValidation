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
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import Dialog from './Dialog';
import RecursiveTreeView, {atualizarDiagrama} from "./RecursiveTreeView";
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
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 0, 6),
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
  const [selectedFile, setSelectedFile] = useState();
  const [selectedDataFile, setSelectedDataFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(null);
  const [dataCompleteLoaded, setDataCompleteLoaded] = useState(false);
  const [failureMeanValue, setFailuereMeanValue] = useState(null);
  const [repetitionsValue, setRepetitionsnValue] = useState(null);
  const [rangeMeanValue, setRangeMeanValue] = useState(null);
  const [uptime, setUptime] = useState(null);
  const [downtime, setDowntime] = useState(null);
  const [diagramaState, setDiagramaState] = useState(null);

  const criarBloco = (mttr, mttf, tipo, nome, blocoAnterior) => {
    const bloco = new Bloco(mttf, mttr, nome);

    if (blocoAnterior == null) {
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
    setDiagramaState(diagrama);
    atualizarDiagrama(diagrama);
  }

  let fileReader;
  let fileReaderData;

  const handleFileRead = (e) => {
    const content = fileReader.result;

    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(content, "text/xml");

    const availabilityFloat = parseFloat(
      xmlDoc.getElementsByTagName("availability")[0].childNodes[0].nodeValue
    );

    setUptime(availabilityFloat * 8760);
    setDowntime((availabilityFloat * 8760 - 8760) * -1);
    const resultado = {
      availability:
        xmlDoc.getElementsByTagName("availability")[0].childNodes[0].nodeValue,
      mttr: xmlDoc.getElementsByTagName("mttr")[0].childNodes[0].nodeValue,
      mttf: xmlDoc.getElementsByTagName("mttf")[0].childNodes[0].nodeValue,
      totaltime:
        xmlDoc.getElementsByTagName("totaltime")[0].childNodes[0].nodeValue,
      downtimeUnit:
        xmlDoc.getElementsByTagName("downtimeUnit")[0].childNodes[0].nodeValue,
      uptimeUnit:
        xmlDoc.getElementsByTagName("uptimeUnit")[0].childNodes[0].nodeValue,
      samplingPoints:
        xmlDoc.getElementsByTagName("samplingPoints")[0].childNodes[0]
          .nodeValue,
      showAvailability:
        xmlDoc.getElementsByTagName("showAvailability")[0].childNodes[0]
          .nodeValue,
      showDowntime:
        xmlDoc.getElementsByTagName("showDowntime")[0].childNodes[0].nodeValue,
      showUptime:
        xmlDoc.getElementsByTagName("showUptime")[0].childNodes[0].nodeValue,
    };
    setDataLoaded(resultado);
  };

  const handleFileDataRead = (e) => {
    const content = fileReaderData.result;

    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(content, "text/xml");
    const texto = xmlDoc.documentElement.textContent;
    //const jsonObj = JSON.parse(texto);
    //console.log(jsonObj)


    const blocks = xmlDoc.getElementsByTagName("org.modcs.tools.rbd.blocks.BlockExponential")[0]
    const nameBlock1 = blocks.getElementsByTagName("name")[0].childNodes[0].nodeValue

    const blockIni = blocks.getElementsByTagName("fatherBlock")[0]
    console.log(typeof (blockIni.getElementsByTagName("blocks")[0]))

    const block1 = {
      name: blocks.getElementsByTagName("name")[0].childNodes[0].nodeValue,
      failureRate: blocks.getElementsByTagName("failureRate")[0].childNodes[0].nodeValue,
      repairRate: blocks.getElementsByTagName("repairRate")[0].childNodes[0].nodeValue,
    }

    console.log(block1)   

    console.log(xmlDoc)
  }

  useEffect(() => {
    if (selectedFile) {
      fileReader = new FileReader();
      fileReader.onloadend = handleFileRead;
      fileReader.readAsText(selectedFile);
    }
  }, [selectedFile]);

  /*  useEffect(() => {
     if (selectedDataFile) {
       fileReaderData = new FileReader();
       fileReaderData.onloadend = handleFileDataRead;
       fileReaderData.readAsText(selectedDataFile)
     }
   }, [selectedDataFile]) */

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const changeHandlerData = (event) => {
    setSelectedDataFile(event.target.files[0]);
  };

  const handleSubmission = () => {    
    alert("Avaliability = " + diagrama.calcularConfiabilidade(repetitionsValue, rangeMeanValue));
  };

  const resetFile = () => {
    setSelectedFile(null);
    setDataLoaded(null);
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
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <RecursiveTreeView
              diagrama={diagramaState}
            />
            <div className={classes.heroButtons}>
              <Grid container sm={8} xs={12} style={{ alignSelf: "center" }}>
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
              <Grid container sm={8} xs={12} style={{ alignSelf: "center" }}>
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
            </div>


          </div>
          {/* ) : !dataLoaded ? (
             } */}
        </div>
      </main>

      {/* Footer */}
      <footer className={classes.footer}>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}