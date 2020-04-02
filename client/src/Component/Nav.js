import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  // menuButton: {
  //   marginRight: theme.spacing(2),
  // },
  title: {
    display:'flex',
    alignItems:'center'
  },
  flexCenter:{
    justifyContent:'center',
  },
  month:{
    padding:'0 10px',
    color:'pink'
  },
  virus:{
    padding:'0 4px'
  },
  covid:{
    fontSize:'1.6rem',
    padding:'0 4px',
    color:'red'
  },
  codid19:{
    fontSize:'0.9rem',
    paddingRight:'6px'
  },
  wiki:{
    color:'#ffffff',
    fontSize:'0.8rem'
  }

}));

export default function ButtonAppBar() {
  // STATE
  const [mediaSm, setMediaSm] = React.useState(false);
  // Styles
  const classes = useStyles();
  // Check window size event listener media query
  const queries = {
    xs: '(max-width: 320px)', //query for xs devices
    sm: '(max-width: 720px)',
    md: '(max-width: 1024px)'
    }
  
  window.addEventListener('resize', ()=>{
   // Media query sizes
    // let mqxs = window.matchMedia(queries.xs);
    let mqsm = window.matchMedia(queries.sm);
    // let mqmd = window.matchMedia(queries.md);
    // If true set state
    if(mqsm.matches){
      setMediaSm(mqsm.matches);
    }else{
      setMediaSm(false);
    }
  });

  let mqFunction = ()=>{
    let mqsm = window.matchMedia(queries.sm);
    if(mqsm.matches){
      setMediaSm(mqsm.matches);
    }else{
      setMediaSm(false);
    }
  }

  React.useEffect(()=>{
    mqFunction();
  },[]);

  // Month
  const today = new Date();
  let showMonth = today.toLocaleString('default', {month: 'long'});

//
// ─── RETURN ─────────────────────────────────────────────────────────────────────

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={mediaSm ? classes.flexCenter : classes.title }>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <a className={classes.wiki} href="https://it.wikipedia.org/wiki/COVID-19" target='blank'>
              <span role='img' aria-label='wiki link'>
                wiki
                </span>
                </a>
          </IconButton>
          <Typography variant="h6">
          <span role='img' className={classes.virus} aria-label='covid19'> 🦠 </span> 
          <span className={classes.covid}> COVID-19 </span>
         {mediaSm ? '': <small> month </small> }  <span className={classes.month}> { showMonth.toUpperCase() } <span role='img' aria-label='worl'> 🌎 </span></span>
    
          </Typography>
          {/* <Button color="inherit">Login</Button> */}
        </Toolbar>
      </AppBar>
    </div>
  );
}
