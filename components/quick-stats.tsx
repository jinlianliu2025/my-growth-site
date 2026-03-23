import { Clock, Flame, FolderOpen, Lightbulb } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const stats = [
  {
    label: "进行中项目",
    value: "3",
    icon: FolderOpen,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    label: "累计学习时长",
    value: "48h",
    icon: Clock,
    color: "text-accent-foreground",
    bgColor: "bg-accent/20",
  },
  {
    label: "连续打卡",
    value: "15天",
    icon: Flame,
    color: "text-orange-600",
    bgColor: "bg-orange-100",
  },
  {
    label: "灵感收集",
    value: "12",
    icon: Lightbulb,
    color: "text-yellow-600",
    bgColor: "bg-yellow-100",
  },
]

export function QuickStats() {
  return (
    <section className="mb-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-border/50 hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
