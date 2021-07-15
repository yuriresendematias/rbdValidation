import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from 'react-select';

const options = [
    { value: 'series', label: 'Series' },
    { value: 'parallel', label: 'Parallel' },    
  ]

export default function FormDialog(props) {
    const [open, setOpen] = React.useState(false);
    const [mttr, setMttr] = React.useState(0);
    const [mttf, setMttf] = React.useState(0);
    const [tipo, setTipo] = React.useState('parallel');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        console.log("TIPO ESOCLHIDO", tipo)
        props.criarBloco(mttr, mttf, tipo);
        setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Insert new block
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Insert new block</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter the mean value of the failure distribution and the mean value of the repair distribution
                    </DialogContentText>
                    <Select autoFocus options={options} onChange={(event) => setTipo(event.value)}/>
                    <TextField                        
                        margin="dense"
                        id="failureMean"
                        label="Failure Distribution Mean Value"
                        type="number"
                        fullWidth
                        step="0.1"
                        onChange={(event) => setMttr(event.target.value)}
                    />
                    <TextField                        
                        margin="dense"
                        id="repairMean"
                        label="Repair Distribution Mean Value"
                        type="number"
                        fullWidth
                        step="0.1"
                        onChange={(event) => setMttf(event.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Insert
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
