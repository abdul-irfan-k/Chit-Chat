import React from "react"
// @ts-ignore
import { LoginSocialLinkedin } from "reactjs-social-login"
import { LinkedInLoginButton } from "react-social-login-buttons"
import OAuth2Login from "react-simple-oauth2-login"

const LoginWithLinkedIn = () => {
  const loginWithLinkedInRejectHandler = (err) => {
    console.log("error",err)
  }

  const loginWithLInkedInSucessHandler = (data) => {
    console.log("data", data)
  }

  return (
    <div>
      <LoginSocialLinkedin
        client_id="86v08901xpwgyv"
        client_secret="yAi7UcR7j5OAka5B"
        onReject={loginWithLInkedInSucessHandler}
        onResolve={loginWithLinkedInRejectHandler}
        // isOnlyGetCode={true}
        redirect_uri={`http://localhost:3000/linkedin`}
        // scope="r_emailaddress,r_liteprofile"
        onLoginStart={() => console.log("on login start")}

      >
        <LinkedInLoginButton />
      </LoginSocialLinkedin>
    </div>
  )
}

export default LoginWithLinkedIn
