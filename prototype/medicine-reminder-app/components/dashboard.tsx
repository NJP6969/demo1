"use client"

import { Button } from "@/components/ui/button"
import { Pill, Calendar, Camera, Search } from "lucide-react"

interface DashboardProps {
  navigateTo: (screen: string) => void
}

export default function Dashboard({ navigateTo }: DashboardProps) {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  const dates = [
    [31, 30, 1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10, 11, 12],
    [13, 14, 15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24, 25, 26],
    [27, 28, 29, 30, 31, 1, 2],
  ]

  return (
    <div className="h-full bg-white overflow-y-auto">
      {/* Reminders Section */}
      <section className="px-4 pt-4 pb-2">
        <h2 className="text-sm font-bold mb-2">REMINDERS</h2>

        <div className="space-y-2">
          <div className="bg-[#ffe2e5] rounded-lg p-3 flex items-start gap-3">
            <Pill className="text-gray-800 mt-1" size={20} />
            <div>
              <h3 className="font-medium text-sm">Medicine Reminder</h3>
              <p className="text-xs text-gray-700">Pill A 250 mg, Pill B 200 mg at 9:00 PM, after food, today</p>
            </div>
          </div>

          <div className="bg-[#ffe2e5] rounded-lg p-3 flex items-start gap-3">
            <Calendar className="text-gray-800 mt-1" size={20} />
            <div>
              <h3 className="font-medium text-sm">Appointment Reminder</h3>
              <p className="text-xs text-gray-700">
                At 3:00 PM, 24 April 2025
                <br />
                With Dr. Wahoo, St Hopkins.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Calendar Section */}
      <section className="px-4 py-2">
        <div className="border-t border-b py-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-sm font-bold">CALENDAR</h2>
            <div className="flex items-center">
              <button className="p-1">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M15 18L9 12L15 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <div className="text-xs">
                September
                <br />
                <span className="text-gray-500">2023</span>
              </div>
              <button className="p-1">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M9 18L15 12L9 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center">
            {days.map((day, i) => (
              <div key={`day-${i}`} className="text-xs py-1">
                {day}
              </div>
            ))}

            {dates.map((week, weekIndex) =>
              week.map((date, dateIndex) => {
                const isToday = date === 5 && weekIndex === 0
                const isPrevMonth = weekIndex === 0 && date > 7
                const isNextMonth = weekIndex === 4 && date < 7
                const textColor = isPrevMonth || isNextMonth ? "text-gray-400" : ""

                return (
                  <div
                    key={`date-${weekIndex}-${dateIndex}`}
                    className={`text-xs py-1 ${textColor} ${isToday ? "bg-primary/20 rounded-full" : ""}`}
                  >
                    {date}
                  </div>
                )
              }),
            )}
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section className="px-4 py-2">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <div className="text-xs text-gray-500">10:00-11:00</div>
            <div className="text-sm">Medicine - 1</div>
            <button className="ml-auto">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 5V19M5 12H19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <div className="text-xs text-gray-500">13:00-14:00</div>
            <div className="text-sm">Appointment</div>
            <button className="ml-auto">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 5V19M5 12H19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <div className="text-xs text-gray-500">19:00-20:00</div>
            <div className="text-sm">Medicine - 2</div>
            <button className="ml-auto">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 5V19M5 12H19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Detect Medicine Section */}
      <section className="px-4 py-2">
        <div className="border-t pt-4">
          <h2 className="text-sm font-bold mb-2">DETECT MEDICINE</h2>

          <div className="bg-[#ffe2e5] rounded-lg p-3 flex items-center gap-3">
            <Camera className="text-gray-800" size={24} />
            <div>
              <h3 className="font-medium text-sm">Detect Medicine</h3>
              <p className="text-xs text-gray-700">Click here to detect medicine using camera</p>
            </div>
          </div>
        </div>
      </section>

      {/* Alternative Medicines Section */}
      <section className="px-4 py-2 pb-6">
        <div className="border-t pt-4">
          <h2 className="text-sm font-bold mb-2">ALTERNATIVE MEDICINES</h2>

          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={16} />
            <input
              type="text"
              placeholder="Medicine Name"
              className="w-full bg-[#ffe2e5] rounded-lg py-2 pl-10 pr-10 text-sm"
            />
            <Camera className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-800" size={16} />
          </div>

          <div className="space-y-2">
            {[1, 2, 3].map((num) => (
              <div key={num} className="bg-gray-100 rounded-lg p-3 flex items-center gap-3">
                <div className="w-6 h-6 flex items-center justify-center text-xs font-medium">{num}</div>
                <div className="text-sm">Alternative 1</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Navigation Button */}
      <div className="fixed bottom-4 right-4">
        <Button
          className="rounded-full w-12 h-12 bg-primary hover:bg-primary/90 p-0"
          onClick={() => navigateTo("reminder")}
        >
          <Pill size={24} />
        </Button>
      </div>
    </div>
  )
}
