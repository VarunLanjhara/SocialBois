import React, { useEffect } from "react";
import "./Login.css";

const Login = () => {
  useEffect(() => {
    document.title = "Login - SocialBois";
    const signInBtn = document.querySelector("#sign-in-btn");
    const signUpBtn = document.querySelector("#sign-up-btn");
    const container = document.querySelector(".container");

    signUpBtn.addEventListener("click", () => {
      container.classList.add("sign-up-mode");
      document.title = "Register - SocialBois";
    });

    signInBtn.addEventListener("click", () => {
      container.classList.remove("sign-up-mode");
      document.title = "Login - SocialBois";
    });
  }, []);

  return (
    <div className="container">
      <div className="container__forms">
        <div className="form">
          <form action="" className="form__sign-in">
            <h2 className="form__title">Sign In</h2>
            <div className="form__input-field">
              <i className="fas fa-user"></i>
              <input type="text" placeholder="Username" required />
            </div>
            <div className="form__input-field">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Password" required />
            </div>
            <input className="form__submit" type="submit" value="Login" />
            <p className="form__social-text">
              Or Sign in with social platforms
            </p>
            <div className="form__social-media">
              <a href="#" className="form__social-icons">
                <i className="fab fa-google"></i>
              </a>
            </div>
          </form>

          <form action="" className="form__sign-up">
            <h2 className="form__title">Sign Up</h2>
            <div className="form__input-field">
              <i className="fas fa-user"></i>
              <input type="text" placeholder="Username" required />
            </div>
            <div className="form__input-field">
              <i className="fas fa-envelope"></i>
              <input type="text" placeholder="Email" required />
            </div>
            <div className="form__input-field">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Password" required />
            </div>

            <input className="form__submit" type="submit" value="Sign Up" />

            <p className="form__social-text">
              Or Sign up with social platforms
            </p>
            <div className="form__social-media">
              <a href="#" className="form__social-icons">
                <i className="fab fa-google"></i>
              </a>
            </div>
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
              Sign Up
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
    </div>
  );
};

export default Login;
