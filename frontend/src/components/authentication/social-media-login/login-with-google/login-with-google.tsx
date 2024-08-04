import { Button } from "@/components/ui/button"
import { GoogleIcon } from "@/constants/icon-constant"
import { loginWithGoogleWithAcessToken } from "@/redux/actions/user-action/user-action"
import { useAppDispatch } from "@/store"
import { useRouter } from "next/navigation"
// @ts-ignore
import { LoginSocialGoogle } from "reactjs-social-login"

const LoginWithGoogle = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const loginWithGoogleSuccessHandler = (response: Object) => {
    // @ts-ignore
    dispatch(loginWithGoogleWithAcessToken({ acessToken: response.data.access_token }, router))
  }

  return (
    <div>
      <LoginSocialGoogle
        client_id="1032047586980-djcvj4ahkk01echih4icsc778an0tpa6.apps.googleusercontent.com"
        onResolve={loginWithGoogleSuccessHandler}
        onReject={(err: Object) => console.log("rejct ", err)}
      >
        <Button size={"icon"} rounded className="bg-[#ff4e2b] fill-white">
          <GoogleIcon className="w-6 h-6" />
        </Button>
      </LoginSocialGoogle>
    </div>
  )
}

export default LoginWithGoogle
