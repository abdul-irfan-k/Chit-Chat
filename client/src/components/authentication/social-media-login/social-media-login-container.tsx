import React from 'react'
import LoginWithGoogle from './login-with-google/login-with-google';
import LoginWithFacebook from './login-with-facebook/login-with-facebook';
import LoginWithLinkedIn from './login-with-linkedin/login-with-linkedin';
import LoginWithGithub from './login-with-github/login-with-github';

const SocialMediaLoginContainer = () => {
  
  return (
    <div className='mt-auto flex flex-col '>
        <LoginWithGoogle />
        <LoginWithFacebook />
        {/* <LoginWithLinkedIn /> */}
        <LoginWithGithub />
    </div>
  )
}

export default SocialMediaLoginContainer