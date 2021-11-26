import React, { useEffect, useState } from "react";
import "./Login.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signIn, signUp } from "../../actions/auth";
import { Tooltip } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import slugify from "react-slugify";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
    repeatpassword: "",
  });
  useEffect(() => {
    if (user) {
      navigate("/");
    } else {
    }
    document.title = "SocialBois - Login";
    const signInBtn = document.querySelector("#sign-in-btn");
    const signUpBtn = document.querySelector("#sign-up-btn");
    const container = document.querySelector(".container");

    signUpBtn.addEventListener("click", () => {
      container.classList.add("sign-up-mode");
      document.title = "SocialBois - Register";
    });

    signInBtn.addEventListener("click", () => {
      container.classList.remove("sign-up-mode");
      document.title = "SocialBois - Login";
    });
  }, [user, navigate]);

  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);
  const [openreg, setOpenreg] = React.useState(false);
  const [clickLoader, setclickLoader] = React.useState(false);

  const handleClickreg = () => {
    setOpenreg(true);
  };

  const handleClosereg = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenreg(false);
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const loginStuff = (e) => {
    setclickLoader(true);
    e.preventDefault();
    dispatch(signIn(loginData, navigate));
    setTimeout(() => {
      handleClick();
      setclickLoader(false);
    }, [3000]);
  };

  const registerStuff = (e) => {
    setclickLoader(true);
    e.preventDefault();
    dispatch(signUp(registerData, navigate));
    setTimeout(() => {
      handleClickreg();
      setclickLoader(false);
    }, [3000]);
  };

  return (
    <div className="container">
      <div className="container__forms">
        <div className="form">
          <form action="" className="form__sign-in" onSubmit={loginStuff}>
            <h2 className="form__title">Sign In</h2>
            <div className="form__input-field">
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                placeholder="Email"
                required
                onChange={(e) =>
                  setLoginData({ ...loginData, email: e.target.value })
                }
              />
            </div>
            <div className="form__input-field">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                placeholder="Password"
                required
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
              />
            </div>
            {clickLoader === true ? (
              <CircularProgress />
            ) : (
              <input className="form__submit" type="submit" value="Login" />
            )}
          </form>

          <form action="" className="form__sign-up" onSubmit={registerStuff}>
            <h2 className="form__title">Sign Up</h2>
            <div className="form__input-field">
              <i className="fas fa-user"></i>
              <input
                type="text"
                placeholder="Username"
                required
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    username: e.target.value,
                  })
                }
              />
            </div>
            <div className="form__input-field">
              <i className="fas fa-envelope"></i>
              <input
                type="text"
                placeholder="Email"
                required
                onChange={(e) =>
                  setRegisterData({ ...registerData, email: e.target.value })
                }
              />
            </div>
            <div className="form__input-field">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                placeholder="Password"
                required
                onChange={(e) =>
                  setRegisterData({ ...registerData, password: e.target.value })
                }
              />
            </div>
            <div className="form__input-field">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                placeholder="Confirm Password"
                required
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    repeatpassword: e.target.value,
                  })
                }
              />
            </div>

            {registerData.username.length >= 3 &&
            registerData.username.length <= 16 &&
            registerData.password.length >= 8 &&
            registerData.password === registerData.repeatpassword ? (
              clickLoader === true ? (
                <CircularProgress />
              ) : (
                <input
                  className="form__submit"
                  type="submit"
                  value="Register"
                />
              )
            ) : (
              <div>
                <input
                  className="form__submit_disabled"
                  type="submit"
                  value="Register"
                  disabled
                />
                <Tooltip
                  title="NOTE: username length must be greater than 3 letters and smoler than 16 letters,email should be valid and both password should match and must be greater than 8 letters"
                  arrow
                >
                  <InfoOutlinedIcon
                    color="action"
                    style={{
                      position: "relative",
                      top: "10px",
                      left: "20px",
                      cursor: "pointer",
                    }}
                  />
                </Tooltip>
              </div>
            )}
          </form>
        </div>
      </div>
      <div className="container__panels">
        <div className="panel panel__left">
          <div className="panel__content">
            <h3 className="panel__title">New here ?</h3>
            <p className="panel__paragraph">
              Are you new here go sign up else (　-_･) ︻デ═一
            </p>
            <button className="btn btn-transparent" id="sign-up-btn">
              Register
            </button>
          </div>
          <img
            className="panel__image"
            src="https://stories.freepiklabs.com/storage/11588/market-launch-amico-2628.png"
            alt=""
          />
        </div>
        <div className="panel panel__right">
          <div className="panel__content">
            <h3 className="panel__title">One of us ?</h3>
            <p className="panel__paragraph">
              Are you one of us go sign in else (　-_･) ︻デ═一
            </p>
            <button className="btn btn-transparent" id="sign-in-btn">
              Sign In
            </button>
          </div>
          <img
            className="panel__image"
            src="https://www.pngkey.com/png/full/444-4444270_ia-press-play-website.png"
            alt=""
          />
        </div>
      </div>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Invalid Credentials
        </Alert>
      </Snackbar>

      <Snackbar open={openreg} autoHideDuration={6000} onClose={handleClosereg}>
        <Alert onClose={handleClosereg} severity="error" sx={{ width: "100%" }}>
          User already exists
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Login;
