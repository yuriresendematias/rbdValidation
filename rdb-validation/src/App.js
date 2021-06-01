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

import { Grid, TextField } from "@material-ui/core";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        UNAME
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
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
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

export default function Album() {
  const classes = useStyles();
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(null);
  const [failureMeanValue, setFailuereMeanValue] = useState(null);
  const [repairMeanValue, setRepairMeanValueMeanValue] = useState(null);

  let fileReader;

  const handleFileRead = (e) => {
    const content = fileReader.result;

    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(content, "text/xml");

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

  useEffect(() => {
    if (selectedFile) {
      fileReader = new FileReader();
      fileReader.onloadend = handleFileRead;
      fileReader.readAsText(selectedFile);
    }
  }, [selectedFile]);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmission = () => {};

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
          <Typography
            component="h1"
            variant="h3"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            RBD model validation
          </Typography>
          {dataLoaded ? (
            <Paper
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                padding: 10,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "row",
                  padding: 10,
                }}
              >
                <Grid item sm={4} xs={12}>
                  <Typography component="h1" variant="h6" align="center">
                    {`Availability: ${dataLoaded.availability}`}
                  </Typography>
                  <Typography component="h1" variant="h6" align="center">
                    {`mttr: ${dataLoaded.mttr}`}
                  </Typography>
                  <Typography component="h1" variant="h6" align="center">
                    {`mttf: ${dataLoaded.mttf}`}
                  </Typography>
                  <Typography component="h1" variant="h6" align="center">
                    {`downtimeUnit: ${dataLoaded.downtimeUnit}`}
                  </Typography>
                  <Typography component="h1" variant="h6" align="center">
                    {`uptimeUnit: ${dataLoaded.uptimeUnit}`}
                  </Typography>
                  <Typography component="h1" variant="h6" align="center">
                    {`samplingPoints: ${dataLoaded.samplingPoints}`}
                  </Typography>
                  <Typography component="h1" variant="h6" align="center">
                    {`showDowntime: ${dataLoaded.showDowntime}`}
                  </Typography>
                  <Typography component="h1" variant="h6" align="center">
                    {`showUptime: ${dataLoaded.showUptime}`}
                  </Typography>
                </Grid>

                <Grid item sm={8} xs={12} style={{ alignSelf: "center" }}>
                  <TextField
                    fullWidth
                    helperText="Informe o valor médio da distribuição de falha"
                    id="meanValue"
                    label="Valor médio da distribuição de falha"
                    size="small"
                    onChange={(e) => setFailuereMeanValue(e.target.value)}
                    value={failureMeanValue}
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    helperText="Informe o valor médio da distribuição de falha"
                    id="meanValue"
                    label="Valor médio da distribuição de falha"
                    size="small"
                    onChange={(e) =>
                      setRepairMeanValueMeanValue(e.target.value)
                    }
                    value={repairMeanValue}
                    variant="outlined"
                    style={{ marginTop: 20 }}
                  />

                  <div className={classes.heroButtons}>
                    <Grid container spacing={2} justify="center">
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
                        <Button
                          onClick={resetFile}
                          variant="outlined"
                          color="primary"
                        >
                          Reload file
                        </Button>
                      </Grid>
                    </Grid>
                  </div>
                </Grid>

                <Grid item sm={4} xs={12}>
                  <Typography component="h1" variant="h6" align="center">
                    {`Availability: ${dataLoaded.availability}`}
                  </Typography>
                  <Typography component="h1" variant="h6" align="center">
                    {`mttr: ${dataLoaded.mttr}`}
                  </Typography>
                  <Typography component="h1" variant="h6" align="center">
                    {`mttf: ${dataLoaded.mttf}`}
                  </Typography>
                  <Typography component="h1" variant="h6" align="center">
                    {`downtimeUnit: ${dataLoaded.downtimeUnit}`}
                  </Typography>
                  <Typography component="h1" variant="h6" align="center">
                    {`uptimeUnit: ${dataLoaded.uptimeUnit}`}
                  </Typography>
                  <Typography component="h1" variant="h6" align="center">
                    {`samplingPoints: ${dataLoaded.samplingPoints}`}
                  </Typography>
                  <Typography component="h1" variant="h6" align="center">
                    {`showDowntime: ${dataLoaded.showDowntime}`}
                  </Typography>
                  <Typography component="h1" variant="h6" align="center">
                    {`showUptime: ${dataLoaded.showUptime}`}
                  </Typography>
                </Grid>
              </div>
            </Paper>
          ) : (
            <Container maxWidth="sm">
              <Typography
                variant="h5"
                align="center"
                color="textSecondary"
                paragraph
              >
                Select the RBD model xml file
              </Typography>
              <link
                href="https://cdnjs.cloudflare.com/ajax/libs/ratchet/2.0.2/css/ratchet.css"
                rel="stylesheet"
              />
              <label
                for="file"
                class="btn btn-primary btn-block btn-outlined"
              >
                Select the .xml
              </label>
              <input type="file" id="file"  name="file"  onChange={changeHandler} style={{display: "none"}}/>

            </Container>
          )}
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
