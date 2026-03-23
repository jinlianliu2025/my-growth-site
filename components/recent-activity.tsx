import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Clock, Edit3, ImagePlus, Lightbulb } from "lucide-react"

interface Activity {
  id: string
  type: "progress" | "idea" | "image" | "time" | "complete"
  content: string
  project?: string
  time: string
}

const activities: Activity[] = [
  {
    id: "1",
    type: "progress",
    content: "完成了第 4 章的初稿",
    project: "我的第一本小说",
    time: "2 小时前",
  },
  {
    id: "2",
    type: "image",
    content: "上传了 3 张新的练习作品",
    project: "水彩风景练习",
    time: "5 小时前",
  },
  {
    id: "3",
    type: "idea",
    content: "记录了一个新灵感：关于星空下的城市",
    time: "昨天",
  },
  {
    id: "4",
    type: "time",
    content: "学习了 2 小时 React Hooks",
    project: "React 进阶学习",
    time: "昨天",
  },
  {
    id: "5",
    type: "complete",
    content: "完成了一个小项目里程碑",
    project: "React 进阶学习",
    time: "3 天前",
  },
]

const activityIcons = {
  progress: { icon: Edit3, color: "text-blue-600", bgColor: "bg-blue-100" },
  idea: { icon: Lightbulb, color: "text-yellow-600", bgColor: "bg-yellow-100" },
  image: { icon: ImagePlus, color: "text-pink-600", bgColor: "bg-pink-100" },
  time: { icon: Clock, color: "text-emerald-600", bgColor: "bg-emerald-100" },
  complete: { icon: CheckCircle2, color: "text-primary", bgColor: "bg-primary/10" },
}

export function RecentActivity() {
  return (
    <section className="mb-10">
      <Card className="border-border/50">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-semibold">最近动态</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-1">
            {activities.map((activity, index) => {
              const config = activityIcons[activity.type]
              const Icon = config.icon
              
              return (
                <div key={activity.id}>
                  <div className="flex gap-4 py-3">
                    <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${config.bgColor}`}>
                      <Icon className={`h-4 w-4 ${config.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground leading-relaxed">
                        {activity.content}
                      </p>
                      {activity.project && (
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {activity.project}
                        </p>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground shrink-0">
                      {activity.time}
                    </span>
                  </div>
                  {index < activities.length - 1 && (
                    <div className="ml-[18px] h-4 w-px bg-border/60" />
                  )}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
