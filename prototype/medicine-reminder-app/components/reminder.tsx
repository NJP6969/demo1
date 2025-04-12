"use client"

import { Button } from "@/components/ui/button"

interface ReminderProps {
  navigateTo: (screen: string) => void
}

export default function Reminder({ navigateTo }: ReminderProps) {
  return (
    <div className="h-full bg-[#f22338] text-white flex flex-col items-center justify-center px-6">
      <div className="text-center space-y-6">
        <div className="space-y-1">
          <div className="text-8xl font-light">
            5:30<span className="text-sm align-top ml-1">AM</span>
          </div>
        </div>

        <div className="space-y-1">
          <div className="text-xl font-medium">Reminder!</div>
          <div className="text-lg">Medicine A 250mg</div>
          <div className="text-lg">Medicine B 200 mg</div>
        </div>

        <Button
          className="bg-white text-[#f22338] hover:bg-white/90 rounded-full px-8"
          onClick={() => navigateTo("dashboard")}
        >
          Click To Stop
        </Button>
      </div>
    </div>
  )
}
