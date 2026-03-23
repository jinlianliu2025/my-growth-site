"use client"

import { Folder, Clock, Target } from "lucide-react"
import { useHomeStore } from "@/lib/home-store"

export function DailySummary() {
  const dailySummary = useHomeStore((state) => state.dailySummary)

  const stats = [
    {
      icon: Folder,
      label: "今日已推进",
      value: dailySummary.projectsAdvanced,
      unit: "个项目",
      color: "text-emerald-600",
      bgColor: "bg-emerald-100/80",
    },
    {
      icon: Clock,
      label: "今日专注",
      value: dailySummary.focusHours.toFixed(1),
      unit: "小时",
      color: "text-blue-600",
      bgColor: "bg-blue-100/80",
    },
    {
      icon: Target,
      label: "本周目标完成",
      value: dailySummary.weeklyGoalProgress,
      unit: "%",
      color: "text-amber-600",
      bgColor: "bg-amber-100/80",
    },
  ]

  return (
    <div className="flex flex-wrap gap-3 mt-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <div
            key={stat.label}
            className="flex items-center gap-2 px-3 py-2 rounded-xl glass-card"
          >
            <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${stat.bgColor}`}>
              <Icon className={`h-4 w-4 ${stat.color}`} />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-semibold text-foreground">{stat.value}</span>
              <span className="text-sm text-muted-foreground">{stat.unit}</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
