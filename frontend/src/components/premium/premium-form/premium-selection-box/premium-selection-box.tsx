import React, { FC } from "react"

interface PremiumSelectionBoxProps {
  premiumDurationSelectHandler(premium: "anual" | "month"): void
}
const PremiumSelectionBox:FC<PremiumSelectionBoxProps> = ({premiumDurationSelectHandler}) => {
  return <div className="gap-1 flex flex-col">

  </div>
}

export default PremiumSelectionBox
