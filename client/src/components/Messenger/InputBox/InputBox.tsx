import {
  faMicrophone,
  faFaceSmile,
  faPlus,
  faPaperPlane,
  faStickyNote,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const InputBox = () => {
  return (
    <div className="flex gap-3 justify-between items-center">
      <div className="w-10 flex justify-center items-center aspect-square bg-slate-300 rounded-full dark:bg-slate-800">
        <FontAwesomeIcon icon={faStickyNote} />
      </div>
      <div className="w-10 flex justify-center items-center aspect-square bg-slate-300 rounded-full dark:bg-slate-800">
        <FontAwesomeIcon icon={faFaceSmile} />
      </div>
      <div className="w-10 flex justify-center items-center aspect-square bg-slate-300 rounded-full dark:bg-slate-800">
        <FontAwesomeIcon icon={faPlus} />
      </div>

      <div className="flex-1 px-5">
        <input
          type="text"
          className="px-4 py-2 w-full rounded-full text-slate-950  bg-slate-300 outline-none dark:text-slate-50 dark:bg-slate-800"
        />
      </div>
      <div className="w-10 flex justify-center items-center aspect-square bg-slate-300 rounded-full dark:bg-slate-800">
        <FontAwesomeIcon icon={faMicrophone} />
      </div>
      <div className="w-10 flex justify-center items-center aspect-square bg-slate-300 rounded-full dark:bg-slate-800">
        <FontAwesomeIcon icon={faPaperPlane} />
      </div>
    </div>
  )
}

export default InputBox
