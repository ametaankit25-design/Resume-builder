import React, { useState } from "react"
import { useLocation } from "react-router-dom"
import Templates from "../pages/templates"

const FinalC = () => {
  const location = useLocation()
  const formData = location.state?.formData
  const skills = location.state?.skills
  const [selectedTemplate, setSelectedTemplate] = useState(0)

  return (
    <div className="min-h-screen bg-white">
      <Templates
        formData={formData}
        skills={skills}
        selectedTemplate={selectedTemplate}
        setSelectedTemplate={setSelectedTemplate}
      />
    </div>
  )
}

export default FinalC