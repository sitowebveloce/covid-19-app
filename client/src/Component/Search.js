import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

// Prevent default submit
const handleSubmit = (e)=>{
    e.preventDefault()
}
export default function BasicTextFields(props) {
    // STATE 
    const {search, setSearch} = props;
    const classes = useStyles();

  return (
    <form className={classes.root} 
    noValidate 
    autoComplete="off"
    onSubmit={handleSubmit}
    >
      <TextField 
      id="standard-basic" 
      label="Search by Country"
      value={search}
      onChange={e=> setSearch(e.target.value)}
      />

    </form>
  );
}
