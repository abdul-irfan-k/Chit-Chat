"use client"
import React, { FC } from "react"

interface ButtonProps {
  onClickHandler: () => {}
}

const Button: FC<ButtonProps> = (props) => {
  console.log("props", props)
  return <div></div>
}

export default Button
