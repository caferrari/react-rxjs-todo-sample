import { CircularProgress, Grid, makeStyles } from '@material-ui/core';
import React, { memo } from 'react';

const useStyles = makeStyles(theme => ({
  loader: {
    padding: theme.spacing(5)
  }
}));

const Loader: React.FC = () => {

  const classes = useStyles();

  return (<Grid item xs={12}>
    <Grid className={classes.loader} container justify="center">
      <CircularProgress variant="indeterminate" />
    </Grid>
  </Grid>);
}

export default memo(Loader);