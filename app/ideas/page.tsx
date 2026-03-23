"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Lightbulb, Plus, PenTool, Palette, Code, MoreHorizontal, Clock } from "lucide-react"
import { useIdeaStore, type IdeaTag, type IdeaStatus } from "@/lib/idea-store"
import { IdeaFormModal } from "@/components/idea-form-modal"

const tagConfig = {
  writing: { label: "写作", icon: PenTool, color: "text-blue-600", bgColor: "bg-blue-100/80" },
  painting: { label: "画画", icon: Palette, color: "text-pink-600", bgColor: "bg-pink-100/80" },
  coding: { label: "项目", icon: Code, color: "text-emerald-600", bgColor: "bg-emerald-100/80" },
  other: { label: "其他", icon: MoreHorizontal, color: "text-gray-600", bgColor: "bg-gray-100/80" },
}

const statusConfig = {
  pending: { label: "待实现", color: "text-amber-600", bgColor: "bg-amber-100/80", borderColor: "border-amber-200" },
  "in-progress": { label: "进行中", color: "text-blue-600", bgColor: "bg-blue-100/80", borderColor: "border-blue-200" },
  "on-hold": { label: "已搁置", color: "text-gray-600", bgColor: "bg-gray-100/80", borderColor: "border-gray-200" },
}

function formatDate(date: Date): string {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return "今天"
  if (diffDays === 1) return "昨天"
  if (diffDays < 7) return `${diffDays} 天前`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} 周前`
  return date.toLocaleDateString("zh-CN", { month: "long", day: "numeric" })
}

export default function IdeasPage() {
  const [activeTab, setActiveTab] = useState<IdeaTag | "all">("all")
  const [modalOpen, setModalOpen] = useState(false)
  const { ideas, addIdea } = useIdeaStore()

  const filteredIdeas = activeTab === "all"
    ? ideas
    : ideas.filter((idea) => idea.tag === activeTab)

  const handleAddIdea = (data: {
    title: string
    description: string
    tag: IdeaTag
    status: IdeaStatus
  }) => {
    addIdea(data)
  }

  const statusCounts = {
    pending: ideas.filter((i) => i.status === "pending").length,
    "in-progress": ideas.filter((i) => i.status === "in-progress").length,
    "on-hold": ideas.filter((i) => i.status === "on-hold").length,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-background to-orange-50">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-100/50 via-yellow-50/50 to-orange-100/50 p-8 md:p-12 mb-8">
          <div className="absolute right-0 top-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-amber-300/20 blur-3xl" />
          <div className="absolute bottom-0 left-0 -mb-16 -ml-16 h-48 w-48 rounded-full bg-yellow-300/20 blur-3xl" />

          <div className="relative glass rounded-xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100/80 backdrop-blur-sm">
                <Lightbulb className="h-6 w-6 text-amber-600" />
              </div>
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">我的想法库</h1>
                <p className="text-muted-foreground mt-1">记录每一个灵光一现的时刻</p>
              </div>
              <Button
                onClick={() => setModalOpen(true)}
                className="bg-amber-600 hover:bg-amber-700 text-white shadow-lg hover:shadow-xl transition-all"
              >
                <Plus className="h-5 w-5 mr-2" />
                新增想法
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-6">
              {Object.entries(statusCounts).map(([status, count]) => {
                const config = statusConfig[status as IdeaStatus]
                return (
                  <div
                    key={status}
                    className="flex items-center gap-3 p-4 rounded-xl glass-card"
                  >
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${config.bgColor}`}>
                      <span className={`text-lg font-bold ${config.color}`}>{count}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{config.label}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div className="mb-6">
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as IdeaTag | "all")}>
            <TabsList className="glass border-0">
              <TabsTrigger value="all">
                全部 ({ideas.length})
              </TabsTrigger>
              {Object.entries(tagConfig).map(([key, config]) => {
                const Icon = config.icon
                const count = ideas.filter((i) => i.tag === key).length
                return (
                  <TabsTrigger key={key} value={key}>
                    <Icon className={`h-4 w-4 mr-1.5 ${config.color}`} />
                    {config.label} ({count})
                  </TabsTrigger>
                )
              })}
            </TabsList>
          </Tabs>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredIdeas.map((idea) => {
            const tagCfg = tagConfig[idea.tag]
            const statusCfg = statusConfig[idea.status]
            const TagIcon = tagCfg.icon

            return (
              <Card
                key={idea.id}
                className="glass-card group border-0 hover:shadow-lg transition-all duration-300"
              >
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${tagCfg.bgColor} backdrop-blur-sm`}>
                      <TagIcon className={`h-5 w-5 ${tagCfg.color}`} />
                    </div>
                    <Badge
                      variant="outline"
                      className={`${statusCfg.bgColor} ${statusCfg.color} ${statusCfg.borderColor} backdrop-blur-sm`}
                    >
                      {statusCfg.label}
                    </Badge>
                  </div>

                  <h3 className="font-semibold text-foreground text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {idea.title}
                  </h3>

                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
                    {idea.description}
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t border-border/30">
                    <span className={`text-xs px-2.5 py-1 rounded-full ${tagCfg.bgColor} ${tagCfg.color} font-medium backdrop-blur-sm`}>
                      {tagCfg.label}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{formatDate(idea.createdAt)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {filteredIdeas.length === 0 && (
          <div className="text-center py-16">
            <div className="glass-card inline-block p-8 rounded-2xl">
              <Lightbulb className="h-16 w-16 mx-auto mb-4 text-muted-foreground/30" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {activeTab === "all" ? "还没有想法" : "该分类下暂无想法"}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                点击上方按钮，记录你的第一个灵感吧
              </p>
              <Button
                onClick={() => setModalOpen(true)}
                variant="outline"
                className="glass border-amber-200 text-amber-600 hover:bg-amber-50"
              >
                <Plus className="h-4 w-4 mr-2" />
                新增想法
              </Button>
            </div>
          </div>
        )}
      </main>

      <IdeaFormModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        onSubmit={handleAddIdea}
      />
    </div>
  )
}
