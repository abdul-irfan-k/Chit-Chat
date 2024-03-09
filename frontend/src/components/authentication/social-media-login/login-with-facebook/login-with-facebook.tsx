import React from "react"
// import FacebookLogin, { ReactFacebookFailureResponse, ReactFacebookLoginInfo } from "react-facebook-login"
// @ts-ignore
import { LoginSocialFacebook } from "reactjs-social-login"
import { FacebookLoginButton } from "react-social-login-buttons";

const LoginWithFacebook = () => {
  return (
    <div>
      <LoginSocialFacebook
        appId="786067386078785"
        onResolve={(response) => console.log("res", response)}
        onReject={(err) => console.log("rej", err)}
      >
        <FacebookLoginButton />
      </LoginSocialFacebook>
    </div>
  )
}

export default LoginWithFacebook
