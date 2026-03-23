"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, CheckCircle2, Lightbulb, Trophy } from "lucide-react"
import { useHomeStore, type Activity as ActivityType } from "@/lib/home-store"
import { useState, useEffect } from "react"

function useTimeAgo(date: Date): string {
  const [timeAgo, setTimeAgo] = useState("")

  useEffect(() => {
    const calculateTimeAgo = () => {
      const now = new Date()
      const diffMs = now.getTime() - date.getTime()
      const diffMins = Math.floor(diffMs / (1000 * 60))
      
      if (diffMins < 1) return "刚刚"
      if (diffMins < 60) return `${diffMins} 分钟前`
      
      const diffHours = Math.floor(diffMins / 60)
      if (diffHours < 24) return `${diffHours} 小时前`
      
      const diffDays = Math.floor(diffHours / 24)
      if (diffDays === 1) return "昨天"
      if (diffDays < 7) return `${diffDays} 天前`
      
      return date.toLocaleDateString("zh-CN")
    }
    
    setTimeAgo(calculateTimeAgo())
  }, [date])

  return timeAgo || "刚刚"
}

function TimeAgo({ date }: { date: Date }) {
  const timeAgo = useTimeAgo(date)
  return <>{timeAgo}</>
}

function getActivityIcon(type: ActivityType["type"]) {
  switch (type) {
    case "checkin":
      return { icon: CheckCircle2, color: "text-emerald-600", bgColor: "bg-emerald-100/80" }
    case "idea":
      return { icon: Lightbulb, color: "text-amber-600", bgColor: "bg-amber-100/80" }
    case "milestone":
      return { icon: Trophy, color: "text-purple-600", bgColor: "bg-purple-100/80" }
    default:
      return { icon: Activity, color: "text-gray-600", bgColor: "bg-gray-100/80" }
  }
}

function getActivityText(activity: ActivityType): string {
  switch (activity.type) {
    case "checkin":
      return `在【${activity.projectName}】${activity.content}`
    case "idea":
      return `新增想法：${activity.content}`
    case "milestone":
      return activity.content
    default:
      return activity.content
  }
}

export function ActivityFeed() {
  const activities = useHomeStore((state) => state.activities)
  const recentActivities = activities.slice(0, 5)

  return (
    <section className="mt-10">
      <Card className="glass-card border-0">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            最近动态
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity) => {
              const { icon: Icon, color, bgColor } = getActivityIcon(activity.type)
              return (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 p-3 rounded-xl bg-background/50 hover:bg-background/80 transition-colors"
                >
                  <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${bgColor} flex-shrink-0`}>
                    <Icon className={`h-4 w-4 ${color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground leading-relaxed">
                      {getActivityText(activity)}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground" suppressHydrationWarning>
                        <TimeAgo date={activity.time} />
                      </span>
                      {activity.duration && (
                        <span className="text-xs text-primary">
                          专注 {activity.duration} 分钟
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
            
            {recentActivities.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Activity className="h-12 w-12 mx-auto mb-3 opacity-30" />
                <p>还没有动态，开始你的第一次打卡吧！</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
