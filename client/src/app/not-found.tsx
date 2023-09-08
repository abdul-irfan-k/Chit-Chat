import Link from "next/link"

export default function NotFound() {
  return (
    <div className="gap-5 flex flex-col justify-center items-center h-screen ">
      <div className="font-extrabold text-9xl text-blue-500 ">404</div>
      <div className="font-semibold text-slate-950 text-2xl dark:text-slate-50">
        Page Not Found
      </div>

      <Link href="/">
        <div className="px-10 py-3 rounded-3xl bg-blue-500 text-slate-50">Return Home</div>
      </Link>
    </div>
  )
}
