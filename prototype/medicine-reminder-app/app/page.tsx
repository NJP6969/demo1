"use client"

import { useState } from "react"
import Welcome from "@/components/welcome"
import SignUp from "@/components/sign-up"
import SignIn from "@/components/sign-in"
import Reminder from "@/components/reminder"
import Dashboard from "@/components/dashboard"

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState("welcome")

  const navigateTo = (screen: string) => {
    setCurrentScreen(screen)
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      {/* Remove phone frame and status bar simulation */}
      <div className="w-full h-full">
        {currentScreen === "welcome" && <Welcome navigateTo={navigateTo} />}
        {currentScreen === "signup" && <SignUp navigateTo={navigateTo} />}
        {currentScreen === "signin" && <SignIn navigateTo={navigateTo} />}
        {currentScreen === "reminder" && <Reminder navigateTo={navigateTo} />}
        {currentScreen === "dashboard" && <Dashboard navigateTo={navigateTo} />}
      </div>
    </div>
  )
}
