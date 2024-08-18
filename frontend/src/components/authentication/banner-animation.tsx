import Image from "next/image"
import React from "react"

const BannerAnimation = () => {
  return (
    <div className="relative hidden h-screen flex bg-[#eff7fe] dark:bg-[#1d2328] md:flex md:w-[50%] xl:w-full">
      <div className="absolute   top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] aspect-[4.2/3.7] md:w-[75%] xl:w-[45%] ">
        <div className="relative w-full aspect-square aspect-square">
          <Image src={"/Asset/login-banner1.png"} fill alt="image" />
        </div>

        <div className="absolute top-[45%] left-[20%] w-[20%] aspect-[1/3.6]  ">
          <Image src={"/Asset/login-banner3.png"} fill alt="image" />
        </div>
        <div className="absolute top-[10%] right-[10%] w-[25%] aspect-[1.7/3.2]  ">
          <Image src={"/Asset/login-banner4.png"} fill alt="image" />
        </div>
        <div className="absolute top-[50%]  w-[55px] aspect-square   ">
          <Image src={"/Asset/login-banner5.png"} fill alt="image" style={{ transform: "rotateY(180deg)" }} />
        </div>

        <div className="gap-5 absolute right-[20%] top-[-15%] flex ">
          <div className="relative  w-[55px] aspect-square  scale-[1.2] ">
            <Image src={"/Asset/login-banner6.png"} fill alt="image" style={{ transform: "rotateY(180deg)" }} />
          </div>
          <div className="relative  w-[55px] translate-y-[5%] aspect-square   ">
            <Image src={"/Asset/login-banner5.png"} fill alt="image" style={{ transform: "rotateY(180deg)" }} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default BannerAnimation
