import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


// properties addCourse is required, function called when Add clicked.
function AddAssignment(props) { 

  const [open, setOpen] = useState(false);
  const [assignment_id, setAssignment_id] = useState(0);
 
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setAssignment_id( event.target.value);
  }

// Save course and close modal form
  const handleAdd = () => {
      props.AddAssignment(assignment_id);
      handleClose();
  }

  return (
      <div>
        <Button id="addAssignment" variant="outlined" color="primary" style={{margin: 10}} onClick={handleClickOpen}>
          Add Assignment
        </Button>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add Assignment</DialogTitle>
            <DialogContent  style={{paddingTop: 20}} >
              <TextField id="assignmentId" autoFocus fullWidth label="Assignment Id" name="assignment_id" onChange={handleChange}  /> 
            </DialogContent>
            <DialogActions>
              <Button color="secondary" onClick={handleClose}>Cancel</Button>
              <Button id="add" color="primary" onClick={handleAdd}>Add</Button>
            </DialogActions>
          </Dialog>      
      </div>
  ); 
}

// required property:  addCourse is a function to call to perform the Add action
AddAssignment.propTypes = {
  addAssignment : PropTypes.func.isRequired
}

export default AddAssignment;