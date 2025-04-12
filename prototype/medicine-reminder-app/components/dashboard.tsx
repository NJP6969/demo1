"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Pill, Calendar, Camera, Search } from "lucide-react"

interface DashboardProps {
  navigateTo: (screen: string) => void
}

// Hardcoded appointments data by date
const appointmentsByDate: Record<string, Array<{ time: string; type: string; title: string }>> = {
  // September 2023
  "2023-09-03": [
    { time: "10:00-11:00", type: "medicine", title: "Medicine - 1" },
    { time: "19:00-20:00", type: "medicine", title: "Medicine - 2" },
  ],
  "2023-09-10": [
    { time: "13:00-14:00", type: "appointment", title: "Appointment with Dr. Smith" },
    { time: "19:00-20:00", type: "medicine", title: "Medicine - 2" },
  ],
  "2023-09-17": [
    { time: "10:00-11:00", type: "medicine", title: "Medicine - 1" },
    { time: "15:00-16:00", type: "therapy", title: "Physical Therapy" },
  ],
  "2023-09-24": [
    { time: "09:00-10:00", type: "checkup", title: "Annual Checkup" },
    { time: "19:00-20:00", type: "medicine", title: "Medicine - 2" },
  ],
  // October 2023
  "2023-10-05": [
    { time: "11:00-12:00", type: "medicine", title: "Medicine - 3" },
    { time: "14:00-15:00", type: "lab", title: "Lab Test Results" },
  ],
  "2023-10-12": [{ time: "13:00-14:00", type: "appointment", title: "Dentist Appointment" }],
  "2023-10-19": [
    { time: "10:00-11:00", type: "medicine", title: "Medicine - 1" },
    { time: "16:00-17:00", type: "therapy", title: "Counseling Session" },
  ],
  // August 2023
  "2023-08-28": [{ time: "09:30-10:30", type: "medicine", title: "Medicine - 4" }],
}

// Default appointments for when no date is selected
const defaultAppointments = [
  { time: "10:00-11:00", type: "medicine", title: "Medicine - 1" },
  { time: "13:00-14:00", type: "appointment", title: "Appointment" },
  { time: "19:00-20:00", type: "medicine", title: "Medicine - 2" },
]

export default function Dashboard({ navigateTo }: DashboardProps) {
  const [currentMonth, setCurrentMonth] = useState(8) // 0-indexed, so 8 is September
  const [currentYear, setCurrentYear] = useState(2023)
  const [selectedDate, setSelectedDate] = useState<string | null>("2023-09-03") // Default selected date

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

  // Get appointments for the selected date or default
  const currentAppointments =
    selectedDate && appointmentsByDate[selectedDate] ? appointmentsByDate[selectedDate] : defaultAppointments

  // Generate calendar dates for current month
  const generateCalendarDates = () => {
    const firstDay = new Date(currentYear, currentMonth, 1)
    const lastDay = new Date(currentYear, currentMonth + 1, 0)

    // Get the day of the week for the first day (0 = Sunday, 1 = Monday, etc.)
    // Convert to Monday-based index (0 = Monday, 6 = Sunday)
    let firstDayIndex = firstDay.getDay() - 1
    if (firstDayIndex < 0) firstDayIndex = 6 // Sunday becomes 6

    const daysInMonth = lastDay.getDate()
    const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate()

    const calendarDates = []
    let week = []

    // Add days from previous month
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const day = daysInPrevMonth - i
      const prevMonth = currentMonth - 1 < 0 ? 11 : currentMonth - 1
      const year = prevMonth === 11 ? currentYear - 1 : currentYear
      week.push({
        date: day,
        fullDate: `${year}-${String(prevMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`,
        isCurrentMonth: false,
      })
    }

    // Add days from current month
    for (let i = 1; i <= daysInMonth; i++) {
      const fullDate = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`
      week.push({
        date: i,
        fullDate,
        isCurrentMonth: true,
        hasEvent: Object.keys(appointmentsByDate).includes(fullDate),
      })

      if (week.length === 7) {
        calendarDates.push(week)
        week = []
      }
    }

    // Add days from next month
    if (week.length > 0) {
      const nextMonth = currentMonth + 1 > 11 ? 0 : currentMonth + 1
      const year = nextMonth === 0 ? currentYear + 1 : currentYear
      for (let i = 1; week.length < 7; i++) {
        week.push({
          date: i,
          fullDate: `${year}-${String(nextMonth + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`,
          isCurrentMonth: false,
        })
      }
      calendarDates.push(week)
    }

    // Ensure we have 5 weeks (for consistent UI)
    while (calendarDates.length < 5) {
      const nextMonth = currentMonth + 1 > 11 ? 0 : currentMonth + 1
      const year = nextMonth === 0 ? currentYear + 1 : currentYear
      const week = []
      
      // Add explicit type annotation for startDay
      const startDay: number = calendarDates.length === 0 ? 1 : calendarDates[calendarDates.length - 1][6].date + 1

      for (let i = 0; i < 7; i++) {
        // Add explicit type annotation for day
        const day: number = startDay + i
        const fullDate = `${year}-${String(nextMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
        week.push({
          date: day,
          fullDate,
          isCurrentMonth: false,
          hasEvent: Object.keys(appointmentsByDate).includes(fullDate),
        })
      }
      calendarDates.push(week)
    }

    return calendarDates
  }

  const calendarDates = generateCalendarDates()

  // Navigate to previous month
  const goToPrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }

  // Navigate to next month
  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }

  // Get month name
  const getMonthName = (month: number) => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ]
    return monthNames[month]
  }

  return (
    <div className="h-full bg-white overflow-y-auto">
      {/* Reminders Section */}
      <section className="px-4 pt-4 pb-2">
        <h2 className="text-sm font-bold mb-3">REMINDERS</h2>

        <div className="space-y-3">
          <div className="bg-[#ffe2e5] rounded-lg p-4 flex items-start gap-3">
            <Pill className="text-gray-800 mt-1" size={20} />
            <div>
              <h3 className="font-medium text-sm">Medicine Reminder</h3>
              <p className="text-xs text-gray-700 mt-1">Pill A 250 mg, Pill B 200 mg at 9:00 PM, after food, today</p>
            </div>
          </div>

          <div className="bg-[#ffe2e5] rounded-lg p-4 flex items-start gap-3">
            <Calendar className="text-gray-800 mt-1" size={20} />
            <div>
              <h3 className="font-medium text-sm">Appointment Reminder</h3>
              <p className="text-xs text-gray-700 mt-1">
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
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-bold">CALENDAR</h2>
            <div className="flex items-center gap-2">
              <button className="p-1" onClick={goToPrevMonth}>
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
              <div className="text-center">
                <div className="text-sm font-medium">{getMonthName(currentMonth)}</div>
                <div className="text-xs text-gray-500">{currentYear}</div>
              </div>
              <button className="p-1" onClick={goToNextMonth}>
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

          <div className="grid grid-cols-7 text-center">
            {days.map((day, i) => (
              <div key={`day-${i}`} className="text-xs font-medium py-1">
                {day}
              </div>
            ))}

            {calendarDates.map((week, weekIndex) =>
              week.map((day, dayIndex) => {
                const isSelected = day.fullDate === selectedDate
                const textColor = !day.isCurrentMonth ? "text-gray-400" : ""

                return (
                  <div
                    key={`date-${weekIndex}-${dayIndex}`}
                    className="py-1 relative"
                    onClick={() => setSelectedDate(day.fullDate)}
                  >
                    <div
                      className={`text-xs mx-auto w-6 h-6 flex items-center justify-center ${textColor} 
                        ${isSelected ? "bg-primary/20 rounded-full" : ""} 
                        cursor-pointer hover:bg-gray-100 rounded-full`}
                    >
                      {day.date}
                    </div>
                    {day.hasEvent && (
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full"></div>
                    )}
                  </div>
                )
              }),
            )}
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section className="px-4 py-2">
        <div className="space-y-4">
          {currentAppointments.map((appointment, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <div className="text-xs text-gray-500">{appointment.time}</div>
              <div className="text-sm font-medium">{appointment.title}</div>
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
          ))}

          {currentAppointments.length === 0 && (
            <div className="text-center py-4 text-gray-500 text-sm">No appointments for this date</div>
          )}
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
          <h2 className="text-sm font-bold mb-3">ALTERNATIVE MEDICINES</h2>

          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={16} />
            <input
              type="text"
              placeholder="Medicine Name"
              className="w-full bg-[#ffe2e5] rounded-lg py-2.5 pl-10 pr-10 text-sm"
            />
            <Camera className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-800" size={16} />
          </div>

          <div className="space-y-3">
            {[1, 2, 3].map((num) => (
              <div key={num} className="bg-gray-100 rounded-lg p-3 flex items-center gap-3">
                <div className="w-6 h-6 flex items-center justify-center text-xs font-medium">{num}</div>
                <div className="text-sm font-medium">Alternative 1</div>
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
