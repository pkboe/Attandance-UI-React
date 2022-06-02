import React, { useEffect, useRef, useState } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper";
import { Grid } from "@material-ui/core";
import { useUser } from "../Hooks/UseUser";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";
import QRCode from "qrcode";
import { QrReader } from "react-qr-reader";

const styles = (theme) => ({
  qr: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "100vw",
  },
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
    marginTop: theme.spacing.unit * 16,
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
  const { user } = useUser();
  const [IsTodaysAttendanceMarked, setIsTodaysAttendanceMarked] = useState(false);
  const [IsTodaysAttendanceMarkedLoading, setIsTodaysAttendanceMarkedLoading] = useState(true);
  // const [text, setText] = useState("");
  // const [imageUrl, setImageUrl] = useState("");
  // const [scanResultFile, setScanResultFile] = useState("");
  const [scanResultWebCam, setScanResultWebCam] = useState("");
  // const qrRef = useRef(null);

  // const generateQrCode = async () => {
  //   try {
  //     const response = await QRCode.toDataURL(text);
  //     setImageUrl(response);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // const handleErrorFile = (error) => {
  //   console.log(error);
  // };
  // const handleScanFile = (result) => {
  //   if (result) {
  //     setScanResultFile(result);
  //   }
  // };
  // const onScanFile = () => {
  //   qrRef.current.openImageDialog();
  // };
  const handleErrorWebCam = (error) => {
    console.log(error);
  };
  const handleScanWebCam = (result) => {
    if (result) {
      setScanResultWebCam(result);
    }
  };

  useEffect(() => {
    // const response = await axios.get(
    //   `https://nciqrapi.herokuapp.com/status?userId=${user.userId}&date=${new Date().toISOString().slice(0, 10)}`

    //   );
    const getAttandanceStatus = async () => {
      await axios({
        method: "get",
        url: `https://nciqrapi.herokuapp.com/status?userId=${user.name}&date=${new Date()
          .toISOString()
          .slice(0, 10)}`,
        withCredentials: true,
      }).then((res) => {
        console.log(res.data.status);
        if (res.data.status === "P") {
          setIsTodaysAttendanceMarked(true);
        }
        setIsTodaysAttendanceMarkedLoading(false);
      });
    };
    getAttandanceStatus();
  }, []);

  return (
    <main className={classes.main}>
      {/*  */}
      <Paper
        classes={classes.paper}
        style={{
          marginTop: "10%",
        }}
      >
        {/* <h2> Hi {user.name} !</h2> */}
        {IsTodaysAttendanceMarkedLoading ? (
          <div
            style={{
              //  center it
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <CircularProgress />
          </div>
        ) : IsTodaysAttendanceMarked ? (
          <h2>
            Hi {user.name} ! <br /> Your today's attendance is marked.
          </h2>
        ) : (
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <h3
              style={{
                textAlign: "center",
                marginTop: "40px",
                marginBottom: "10px",
                backgroundColor: "#f5f5f5",
                padding: "10px",
              }}
            >
              {" "}
              Please scan the QR Code
            </h3>
            <QrReader
              delay={300}
              style={{ width: "80%", height: "50%" }}
              onError={handleErrorWebCam}
              onScan={handleScanWebCam}
            />
            <h3></h3>
          </Grid>
        )}
      </Paper>
    </main>
  );
};
export default withStyles(styles)(Main);
// end of file
