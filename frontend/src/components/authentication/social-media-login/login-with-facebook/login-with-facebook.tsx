import React from "react"
// import FacebookLogin, { ReactFacebookFailureResponse, ReactFacebookLoginInfo } from "react-facebook-login"
// @ts-ignore
import { LoginSocialFacebook } from "reactjs-social-login"
import { FacebookLoginButton } from "react-social-login-buttons"
import { Button } from "@/components/ui/button"
import { FacebookIcon } from "@/constants/icon-constant"

const LoginWithFacebook = () => {
  return (
    <div>
      <LoginSocialFacebook
        appId="786067386078785"
        onResolve={(response) => console.log("res", response)}
        onReject={(err) => console.log("rej", err)}
      >
        <Button size={"icon"} rounded className="bg-[#2c67ce] fill-white">
          <FacebookIcon className="w-6 h-6" />
        </Button>
      </LoginSocialFacebook>
    </div>
  )
}

export default LoginWithFacebook
