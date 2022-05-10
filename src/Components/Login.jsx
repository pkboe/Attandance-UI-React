import {
  Avatar,
  Button,
  CircularProgress,
  FormControl,
  Input,
  InputLabel,
  Paper,
  Typography,
} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import React, { useState } from "react";
import { useUser } from "../Hooks/UseUser";
import axios from "axios";
import Cookies from "js-cookie";

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

function Login(props) {
  const [userId, setuserId] = useState("");
  const [password, setPassword] = useState("");
  const { setAccessToken } = useUser();
  // hook isloading is used to show the loading spinner
  const [isLoading, setIsLoading] = useState(false);
  const { classes } = props;

  function handleuserIdChange(event) {
    setuserId(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    // Fetch the accessToken from the server
    // axios form data
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("password", password);
    axios({
      method: "post",
      url: "http://localhost:8080/lin",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    }).then((res) => {
      console.log("RESPONSE", res);
      setIsLoading(false);
      // localStorage.setItem("access-token", res.data.token);
      // setAccessToken(res.data.token);
      if (res.data.token) {
        setAccessToken(Cookies.get("JWT"));
      } else {
        alert("Invalid Credentials");
      }
    });
  }

  // useEffect for isLoading
  // useEffect(() => {}, [isLoading]);

  return (
    <main className={classes.main}>
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleFormSubmit}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="userId">UserId</InputLabel>
            <Input
              id="userId"
              name="userId"
              autoComplete="userId"
              autoFocus
              onChange={handleuserIdChange}
              value={userId}
            />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              name="password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handlePasswordChange}
              value={password}
            />
          </FormControl>
          {/* is loading is flase, show button else spinner */}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress /> : "Sign In"}
          </Button>
        </form>
      </Paper>
    </main>
  );
}

export default withStyles(styles)(Login);
