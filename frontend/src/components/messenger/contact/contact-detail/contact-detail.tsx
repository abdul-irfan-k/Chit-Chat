import React, { FC } from "react"

interface ContactDetailProps {
  name: string
  gender: "male" | "female"
  birthday: Date
  favoriteBook?: string
  city?: string
  mobileNumber: string
  email: string
  website?: string
  interest?: string
}
const ContactDetail: FC<ContactDetailProps> = ({name,gender,birthday,favoriteBook,city,mobileNumber,email,interest,website}) => {
  return (
    <div className="p-10 rounded-md bg-slate-200  dark:bg-neutral-950">
      <div className="font-medium text-lg">Contact Info</div>
      <div className="mt-2 border-t-[0.2px] border-slate-700 dark:border-neutral-600">
        <CardDetailRow rowLabel={"Name"} rowData={name} />
        <CardDetailRow rowLabel={"Gender"} rowData={`${gender}`} />
        <CardDetailRow rowLabel={"Birthday"} rowData={birthday.toLocaleDateString()} />
        <CardDetailRow rowLabel={"Favorite Book"} rowData={favoriteBook} />
        <CardDetailRow rowLabel={"City"} rowData={city} />
        <CardDetailRow rowLabel={"Mobile No"} rowData={mobileNumber} />
        <CardDetailRow rowLabel={"Email"} rowData={email} />
        <CardDetailRow rowLabel={"Website"} rowData={website} />
        <CardDetailRow rowLabel={"Interest"} rowData={interest} />
      </div>
    </div>
  )
}

export default ContactDetail

interface CardDetailRowProps {
  rowLabel: string
  rowData?: string
}
const CardDetailRow: FC<CardDetailRowProps> = ({rowLabel,rowData}) => {
  return (
    <div className="flex justify-between items-center py-2  border-b-[0.1px] border-slate-700 dark:border-neutral-600">
      <div className="font-medium text-base">{rowLabel}</div>
      <div className="text-sm text-slate-800 dark:text-slate-200">{typeof rowData == "string"?rowData:"" }</div>
    </div>
  )
}
