"use client"

import { ExpandLessIcon, FolderIcon } from "@/constants/icon-contant"
import { FC, useState } from "react"

interface SharedDocument {
  name: string
}
interface CallSharedDocumentProps {
  sharedDocument: Array<SharedDocument>
}
const CallSharedDocument: FC<CallSharedDocumentProps> = ({ sharedDocument }) => {
  const [isShowsSharedDocument, setIsShowsSharedDocument] = useState(true)

  const expandIconClickHandler = () => {
    setIsShowsSharedDocument(!isShowsSharedDocument)
  }
  return (
    <div className="rounded-sm p-10 bg-slate-200 fill-slate-950 dark:bg-neutral-950 dark:fill-slate-50">
      <div className="flex items-center justify-between">
        <div className="text-lg font-medium text-slate-950 dark:text-slate-50">Shared Document</div>
        <div>
          <ExpandLessIcon className="w-5 aspect-square" onClick={expandIconClickHandler} />
        </div>
      </div>

      {isShowsSharedDocument && (
        <div className="gap-2 flex flex-col">
          {sharedDocument.map((document, index) => {
            return (
              <div key={index} className="flex gap-2 items-center">
                <div>
                  <FolderIcon className="w-5 aspect-square" />
                </div>
                <div className="text-slate-800 dark:text-slate-200">{document.name}</div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default CallSharedDocument
