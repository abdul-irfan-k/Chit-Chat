import React from "react"
import ContactUserProfile from "./contact-user-profile/contact-user-profile"
import ContactSocialMedia from "./contact-social-media/contact-social-media"
import ContactDetail from "./contact-detail/contact-detail"

const ContactContainer = () => {
  return (
    <div className="relative mt-10  gap-8 flex  w-[60%]">
      <div className="gap-5 flex flex-col w-[40%]">
        <ContactUserProfile name="irfan" profileImageSrc="/Asset/avatar.jpg" />
        <ContactSocialMedia
          socialMediaData={[
            { label: "Facebook", link: "https://facebook.com", profileImageSrc: "/Asset/avatar.jpg" },
            { label: "Google", link: "https://google.com", profileImageSrc: "/Asset/avatar.jpg" },
            { label: "Twitter", link: "https://twitter.com", profileImageSrc: "/Asset/avatar.jpg" },
          ]}
        />
      </div>
      <div className="relative flex-1 ">
        <ContactDetail
          birthday={new Date("10-12-2003")}
          email="irfan@gmail.com"
          gender="male"
          mobileNumber="123 456 789"
          name="irfan"
          city="Mangalore"
          favoriteBook="Discipline Equals To Freedom"
          interest="coding"
          website="www.random.com"
        />
      </div>
    </div>
  )
}

export default ContactContainer
