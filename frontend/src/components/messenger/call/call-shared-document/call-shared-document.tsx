"use client"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, File } from "lucide-react"
import { FC, useState } from "react"

interface SharedDocument {
  name: string
}
interface CallSharedDocumentProps {
  sharedDocuments: Array<SharedDocument>
}
const CallSharedDocument: FC<CallSharedDocumentProps> = ({ sharedDocuments }) => {
  const [isSharedDocumentsVisible, setIsSharedDocumentsVisible] = useState(true)

  const handleExpandIconClick = () => {
    setIsSharedDocumentsVisible(!isSharedDocumentsVisible)
  }
  return (
    <div className="rounded-sm p-5 bg-slate-200 fill-slate-950 dark:bg-background-primary">
      <div className="flex  justify-between items-center">
        <div className="text-lg font-medium text-slate-950  dark:text-slate-50">Shared Document</div>
        <Button className=" relative w-10 aspect-square bg-[#303237]" rounded size={"icon"}>
          {isSharedDocumentsVisible ? (
            <ChevronUp className="w-5 aspect-square" />
          ) : (
            <ChevronDown className="w-5 aspect-square" />
          )}
        </Button>
      </div>

      {isSharedDocumentsVisible && (
        <div className="gap-2 flex flex-col">
          {sharedDocuments.map((document, index) => {
            return (
              <div key={index} className="flex gap-2 items-center">
                <div>
                  <File className="w-5 aspect-square" />
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
