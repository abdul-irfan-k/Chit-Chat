import Image from "next/image"
import React, { FC } from "react"

interface ContactSocialMediaProps {
  socialMediaData: Array<SocialMedia>
}
const ContactSocialMedia: FC<ContactSocialMediaProps> = ({ socialMediaData }) => {
  return (
    <div className="p-10 rounded-md bg-slate-200  dark:bg-neutral-950">
      {socialMediaData.map((media, index) => {
        return <ContactSocialMediaRow {...media} key={index} />
      })}
    </div>
  )
}

export default ContactSocialMedia

interface SocialMedia {
  label: "Facebook" | "Twitter" | "Google"
  link: string
  profileImageSrc?: string
}

const ContactSocialMediaRow: FC<SocialMedia> = ({ label, link, profileImageSrc }) => {
  return (
    <div className="py-2 border-b-[0.2px] flex items-center border-slate-800 dark:border-neutral-600">
      <div>{label}</div>
      <div className="ml-auto relative w-6 aspect-square">
        {profileImageSrc != undefined && <Image alt="image" src={profileImageSrc} fill className="rounded-full" />}
      </div>
    </div>
  )
}
