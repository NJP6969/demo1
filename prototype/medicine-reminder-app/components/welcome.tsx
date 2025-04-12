"use client"
import { Button } from "@/components/ui/button"

interface WelcomeProps {
  navigateTo: (screen: string) => void
}

export default function Welcome({ navigateTo }: WelcomeProps) {
  return (
    <div className="relative h-full bg-primary overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-[url('/pattern.svg')] bg-no-repeat bg-cover opacity-20"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-between h-full pt-32 pb-16 px-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-gray-800">Welcome</h1>
          <p className="text-sm text-gray-600">Your Very Own Health Care Assistant</p>
        </div>

        <div className="space-y-4">
          <Button className="w-full bg-white text-gray-800 hover:bg-gray-100" onClick={() => navigateTo("signup")}>
            Create Account
          </Button>

          <div className="text-center text-xs text-gray-700">
            Already have an Account?{" "}
            <span className="font-medium underline cursor-pointer" onClick={() => navigateTo("signin")}>
              Login
            </span>
          </div>

          <div className="flex justify-center">
            <div className="w-12 h-1 bg-gray-800 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
