import React from "react"
import LoginWithGoogle from "./login-with-google/login-with-google"
import LoginWithFacebook from "./login-with-facebook/login-with-facebook"
import LoginWithGithub from "./login-with-github/login-with-github"

const SocialMediaLoginContainer = () => {
  return (
    <div className="gap-5 mt-5 flex  ">
      <LoginWithFacebook />
      <LoginWithGoogle />
      <LoginWithGithub />
    </div>
  )
}

export default SocialMediaLoginContainer
