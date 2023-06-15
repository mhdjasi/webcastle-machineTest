import React, { useState } from "react";
import { firebase, auth } from "./firebase";

const Login = () => {
  const [mynumber, setnumber] = useState("");
  const [otp, setotp] = useState("");
  const [show, setshow] = useState(false);
  const [final, setfinal] = useState("");

  // Sent OTP
  const signin = () => {
    if (mynumber === "" || mynumber.length < 10) {
      alert("Please enter a valid phone number.");
      return;
    }

    let verify = new firebase.auth.RecaptchaVerifier("recaptcha-container");
    auth
      .signInWithPhoneNumber("+91 " + mynumber, verify)
      .then((result) => {
        setfinal(result);
        alert("code sent successfully please check your phone");
        setshow(true);
      })
      .catch((err) => {
        alert(err);
        console.log(err);
        window.location.reload();
      });
  };

  // Validate OTP
  const ValidateOtp = () => {
    if (otp === null || final === null) {
      alert("Please enter a Correct OTP");
      return;
    }

    final
      .confirm(otp)
      .then((result) => {
        alert("successfully logged In");
      })
      .catch((err) => {
        alert("Wrong code");
      });
  };

  return (
    <div className="p-5 container-fluid loginPage">
      <div className="row">
        <div className="col-lg-4"></div>
        <div className="col-lg-4">
          <center>
            <div
              className="w-lg-50 mt-5 pt-5"
              style={{ display: !show ? "block" : "none" }}
            >
              {/* first input box */}
              <div className="firstForm">
                <div className="phone-input">
                  <span className="prefix form-control w-25">+91</span>
                  <input
                    type="tel"
                    className="form-control numberInput"
                    value={mynumber}
                    required={true}
                    onChange={(e) => {
                      setnumber(e.target.value);
                    }}
                    placeholder="Enter  phone number"
                  />
                </div>
                <br />
                {/* recaptcha box */}
                <div className="m-1" id="recaptcha-container"></div>
                <button
                  onClick={signin}
                  className="btn btn-primary mb-3 sendButton"
                >
                  Send OTP
                </button>
              </div>
            </div>

            <div style={{ display: show ? "block" : "none" }}>
              {/* second input box */}
              <div className="firstForm">
                <input
                  type="text"
                  className="form-control"
                  required={true}
                  placeholder={"Enter your OTP"}
                  onChange={(e) => {
                    setotp(e.target.value);
                  }}
                ></input>
                <br />
                <br />
                <button onClick={ValidateOtp} className="btn btn-primary">
                  Verify
                </button>
              </div>
            </div>
          </center>
        </div>
        <div className="col-lg-4"></div>
      </div>
    </div>
  );
};

export default Login;
