import React from "react"
import { GithubLoginButton } from "react-social-login-buttons"
import OAuth2Login from "react-simple-oauth2-login"
import { useRouter } from "next/navigation"
import { useAppDispatch } from "@/store"
import { loginWithGithubHandler } from "@/redux/actions/user-action/user-action"
import { Button } from "@/components/ui/button"
import { GithubIcon } from "@/constants/icon-constant"
import { LoginSocialGithub } from "reactjs-social-login"

const LoginWithGithub = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  // @ts-ignore
  const LoginWithGithubResolveHandler = (data) => {
    console.log("data", data)
    dispatch(loginWithGithubHandler({ code: data.code }, router))
  }

  return (
    <div>
      <LoginSocialGithub
        authorizationUrl="https://github.com/login/oauth/authorize"
        responseType="code"
        clientId="757b22c1a3bd75d21e10"
        redirectUri="http://localhost:3000/authentication"
        scope="user"
        onSuccess={LoginWithGithubResolveHandler}
        onFailure={(err) => console.log("error s", err)}
        render={(props) => {
          return <GithubLoginButton onClick={props.onClick} />
        }}
      >
        <Button size={"icon"} rounded className="">
          <GithubIcon className="w-6 h-6" />
        </Button>
      </LoginSocialGithub>
    </div>
  )
}

export default LoginWithGithub
