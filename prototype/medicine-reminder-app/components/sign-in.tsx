"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface SignInProps {
  navigateTo: (screen: string) => void
}

export default function SignIn({ navigateTo }: SignInProps) {
  return (
    <div className="relative h-full bg-primary overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-[url('/pattern.svg')] bg-no-repeat bg-cover opacity-20"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full pt-32 pb-16 px-8">
        <div className="space-y-8">
          <h1 className="text-3xl font-bold text-gray-800">Sign in</h1>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-gray-800 font-medium">Phone no</label>
              <Input
                type="tel"
                placeholder="| +00 000-0000-000"
                className="border-b border-gray-300 rounded-none px-0 py-2 focus-visible:ring-0 focus-visible:border-gray-800"
              />
            </div>
          </div>

          <Button className="w-full bg-primary/90 hover:bg-primary text-white" onClick={() => navigateTo("dashboard")}>
            Login
          </Button>

          <div className="text-center text-xs text-gray-700">
            Don't have an Account?{" "}
            <span className="font-medium underline cursor-pointer" onClick={() => navigateTo("signup")}>
              Sign up
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
