import React from 'react'
import CallUserProfile from './call-user-profile/call-user-profile'
import CallSharedDocument from './call-shared-document/call-shared-document'

const CallLogContainer = () => {
  return (
    <div className='relative mt-10  gap-8 flex  w-[60%] '>
      <div className='gap-5 flex flex-col w-[40%]'>
        <CallUserProfile name='irfan' phoneNumber='123 456 789' profileImageSrc='/Asset/avatar.jpg'  />
        <CallSharedDocument sharedDocument={[{name:'Simple_practice_project-zip'},{name:'test.jpg'},{name:'image.jpg'}]} />
      </div>
      <div></div>

    </div>
  )
}

export default CallLogContainer