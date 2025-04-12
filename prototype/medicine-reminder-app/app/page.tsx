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
    <div className="flex justify-center items-center min-h-screen bg-background">
      <div className="w-full max-w-[390px] h-[844px] overflow-hidden relative bg-white shadow-lg rounded-[32px] border-4 border-gray-200">
        {/* Status Bar */}
        <div className="h-11 px-5 flex justify-between items-center">
          <div className="text-xs font-medium">9:41</div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4">
              <svg viewBox="0 0 24 24" className="w-full h-full">
                <path
                  fill="currentColor"
                  d="M17.5,12A1.5,1.5 0 0,1 16,10.5A1.5,1.5 0 0,1 17.5,9A1.5,1.5 0 0,1 19,10.5A1.5,1.5 0 0,1 17.5,12M14.5,8A1.5,1.5 0 0,1 13,6.5A1.5,1.5 0 0,1 14.5,5A1.5,1.5 0 0,1 16,6.5A1.5,1.5 0 0,1 14.5,8M9.5,8A1.5,1.5 0 0,1 8,6.5A1.5,1.5 0 0,1 9.5,5A1.5,1.5 0 0,1 11,6.5A1.5,1.5 0 0,1 9.5,8M6.5,12A1.5,1.5 0 0,1 5,10.5A1.5,1.5 0 0,1 6.5,9A1.5,1.5 0 0,1 8,10.5A1.5,1.5 0 0,1 6.5,12M12,3A9,9 0 0,0 3,12A9,9 0 0,0 12,21A9,9 0 0,0 21,12A9,9 0 0,0 12,3Z"
                />
              </svg>
            </div>
            <div className="w-4 h-4">
              <svg viewBox="0 0 24 24" className="w-full h-full">
                <path
                  fill="currentColor"
                  d="M4,4H20A2,2 0 0,1 22,6V18A2,2 0 0,1 20,20H4C2.89,20 2,19.1 2,18V6C2,4.89 2.89,4 4,4M12,11L20,6H4L12,11M4,18H20V8.37L12,13.36L4,8.37V18Z"
                />
              </svg>
            </div>
            <div className="w-6 h-3 bg-black rounded-sm"></div>
          </div>
        </div>

        {currentScreen === "welcome" && <Welcome navigateTo={navigateTo} />}
        {currentScreen === "signup" && <SignUp navigateTo={navigateTo} />}
        {currentScreen === "signin" && <SignIn navigateTo={navigateTo} />}
        {currentScreen === "reminder" && <Reminder navigateTo={navigateTo} />}
        {currentScreen === "dashboard" && <Dashboard navigateTo={navigateTo} />}
      </div>
    </div>
  )
}
