import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
// import Button from mui
import Button from "@material-ui/core/Button";
// Import Paper
import Paper from "@material-ui/core/Paper";
// fucntional compoent

const styles = (theme) => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

const Main = (props) => {
  const { classes } = props;
  return (
    <main className={classes.main}>
      <Paper className={classes.paper}>
        Hi NAME!
        {/* button with scan Qr */}
        <Button variant="contained" color="primary" className={classes.button} onClick={() => {}}>
          {/* scan QR code */}
          Scan QR code
        </Button>
        {console.log(props)}
      </Paper>
    </main>
  );
};
export default withStyles(styles)(Main);
// end of file
