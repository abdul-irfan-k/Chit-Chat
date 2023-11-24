import React from "react"
import SearchUserList from "./search-user-list/search-user-list"

const SearchBar = () => {
  return (
    <div
      className="fixed left-0 top-0 w-screen h-screen z-30"
      // style={{ background: "rgba(0,0,0,.4 )", backdropFilter: "blur(0.5px)" }}

      style={{
        background: "rgba(0,0,0,0.97 )",
        // backdropFilter: "blur(1px)",
      }}
    >
      <div className="h-full w-[50%] mx-auto my-10 flex flex-col">
        <div className="px-3 py-3 rounded-full  bg-neutral-950 border-[1px] border-slate-400">
          <div className="flex-1">
            <input
              type="text"
              className="w-full px-3 bg-transparent border-none outline-none text-slate-50"
              placeholder="search"
            />
          </div>
        </div>

        <div className="mt-10 px-6 py-6 rounded-3xl  bg-neutral-950">
          <div className="gap-2 flex items-center">
            <span className="px-4 py-2 bg-neutral-800 rounded-full">User</span>
            <span className="px-4 py-2 bg-neutral-800 rounded-full">Group</span>
          </div>

          <div className="mt-2 h-[1px] block" style={{ background: "rgba(255,255,255,0.1)" }}></div>
          <div className="mt-2">
            <SearchUserList />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchBar
