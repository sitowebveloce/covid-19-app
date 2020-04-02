import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
// import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
// import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {getCode} from 'country-list';
import moment from 'moment';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';


const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    marginTop: '20px'
  },
  media: {
    margin: '0 auto',
    height: 100,
    width: 80
  },
  deathNumb:{
    fontWeight:'800',
    color:'red'
  },
  map:{
      width:'100%',
      height:120
  }
});

export default function MediaCard(props) {
    // Deconstruct
    const {
        country, 
        lastUpdate, 
        confirmed,
        recovered,
        deaths,
        lat,
        long} = props;
 
const classes = useStyles();
// Create URL
let url = `https://www.google.com/maps/search/?api=1&query=${lat},${long}`
  //
  // ─── RETURN ─────────────────────────────────────────────────────────────────────
        
  return (
    <Card className={classes.root}>
        <CardMedia
          className={classes.media}
          image={`https://www.countryflags.io/${getCode(country)}/shiny/64.png`}
          title={country}
        />
        <div className="map">
        <div className="confirmed"><b>Country Region Map: </b> <a className='covid-map-link' href={url} target='blank'>Link</a></div>
        </div>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {country}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="span">
  <div className="update"><b>Last Update: </b> {moment(lastUpdate).format('MMMM Do YYYY, h:mm:ss a')}</div>
  <div className="confirmed"><b>Confirmed: </b> {confirmed}</div>
  <div className={classes.recovered}><b> Recovered :</b> {recovered}</div>
  <div className="deaths"><b>Deaths: </b> <span className={classes.deathNumb}> {deaths} </span></div>
          </Typography>
        </CardContent>
     
      <CardActions>
      <FavoriteBorderIcon />
      </CardActions>
    </Card>
  );
}
