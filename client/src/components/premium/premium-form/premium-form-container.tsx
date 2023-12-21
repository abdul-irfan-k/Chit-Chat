"use client"
import React, { useState } from "react"
import PremiumFeatureList from "./premium-feature-list/premium-feature-list"

const PremiumFormContainer = () => {
  const [paymentDurationType,setPaymentDurationType] = useState<"month"|"anual">("anual")
  return <div>
    <PremiumFeatureList />
  </div>
}

export default PremiumFormContainer
