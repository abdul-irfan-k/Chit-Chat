"use client"
import { useRouter } from "next/navigation"


const Homepage = () => {
  const navigate = useRouter()
  navigate.push('/messenger')
  return <div>Homepage</div>
}

export default Homepage
