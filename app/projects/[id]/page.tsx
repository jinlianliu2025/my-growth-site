"use client"

import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Clock, Calendar, Image as ImageIcon, Lightbulb, Plus, Save, Send } from "lucide-react"
import Link from "next/link"
import { useState, use } from "react"

interface HistoryRecord {
  id: string
  date: string
  content: string
  duration: number
}

interface Note {
  id: string
  content: string
  createdAt: string
}

const projectData: Record<string, {
  name: string
  target: string
  currentStatus: string
  progress: number
  history: HistoryRecord[]
  works: { id: string; placeholder: string }[]
  notes: Note[]
}> = {
  "1": {
    name: "写小说",
    target: "完成12章，当前第5章",
    currentStatus: "进行中",
    progress: 45,
    history: [
      { id: "h1", date: "今天", content: "写了第5章1200字", duration: 45 },
      { id: "h2", date: "昨天", content: "写了800字，完善人物设定", duration: 30 },
      { id: "h3", date: "前天", content: "构思大纲，整理思路", duration: 60 },
    ],
    works: [
      { id: "w1", placeholder: "小说封面设计稿" },
      { id: "w2", placeholder: "人物关系图" },
    ],
    notes: [
      { id: "n1", content: "主角应该有个秘密身份", createdAt: "3天前" },
      { id: "n2", content: "第三章需要增加一个转折点", createdAt: "5天前" },
    ],
  },
  "2": {
    name: "学画画",
    target: "掌握水彩基础技法",
    currentStatus: "进行中",
    progress: 30,
    history: [
      { id: "h1", date: "今天", content: "练习渐变色技巧", duration: 60 },
      { id: "h2", date: "昨天", content: "临摹一幅风景画", duration: 45 },
      { id: "h3", date: "3天前", content: "学习调色基础", duration: 30 },
    ],
    works: [
      { id: "w1", placeholder: "风景画练习" },
      { id: "w2", placeholder: "静物素描" },
    ],
    notes: [
      { id: "n1", content: "水彩要从浅色画到深色", createdAt: "2天前" },
    ],
  },
  "3": {
    name: "美食宇宙",
    target: "收集100道菜谱",
    currentStatus: "进行中",
    progress: 15,
    history: [
      { id: "h1", date: "今天", content: "添加了3道川菜", duration: 20 },
      { id: "h2", date: "2天前", content: "整理粤菜分类", duration: 15 },
      { id: "h3", date: "4天前", content: "拍摄美食照片", duration: 40 },
    ],
    works: [
      { id: "w1", placeholder: "麻婆豆腐成品图" },
      { id: "w2", placeholder: "红烧肉成品图" },
    ],
    notes: [
      { id: "n1", content: "可以加入营养成分计算功能", createdAt: "1天前" },
    ],
  },
}

export default function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  
  const initialProject = projectData[id] || {
    name: "未知项目",
    target: "暂无目标",
    currentStatus: "未开始",
    progress: 0,
    history: [],
    works: [],
    notes: [],
  }
  
  const [todayContent, setTodayContent] = useState("")
  const [todayDuration, setTodayDuration] = useState("")
  const [newNote, setNewNote] = useState("")
  const [notes, setNotes] = useState<Note[]>(initialProject.notes)
  const [history, setHistory] = useState<HistoryRecord[]>(initialProject.history)
  const [isSaved, setIsSaved] = useState(false)

  const project = projectData[id] || {
    name: "未知项目",
    target: "暂无目标",
    currentStatus: "未开始",
    progress: 0,
    history: [],
    works: [],
    notes: [],
  }

  const handleSaveToday = () => {
    if (!todayContent.trim()) return
    
    const newRecord: HistoryRecord = {
      id: `h${Date.now()}`,
      date: "刚刚",
      content: todayContent,
      duration: parseInt(todayDuration) || 0,
    }
    setHistory([newRecord, ...history])
    setTodayContent("")
    setTodayDuration("")
    setIsSaved(true)
    setTimeout(() => setIsSaved(false), 2000)
  }

  const handleAddNote = () => {
    if (!newNote.trim()) return
    
    const note: Note = {
      id: `n${Date.now()}`,
      content: newNote,
      createdAt: "刚刚",
    }
    setNotes([note, ...notes])
    setNewNote("")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-background to-blue-50">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* 顶部导航 */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="sm" asChild className="hover:bg-white/50">
            <Link href="/" className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4 mr-2" />
              返回首页
            </Link>
          </Button>
          <h1 className="text-2xl font-bold text-foreground">{project.name}</h1>
        </div>

        <div className="space-y-6">
          {/* 项目目标区域 */}
          <Card className="glass-card border-0 rounded-2xl overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary" />
                项目目标
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">{project.target}</p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">当前进度</span>
                  <span className="font-medium text-primary">{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-3 bg-secondary/50" />
              </div>
            </CardContent>
          </Card>

          {/* 今日记录区 */}
          <Card className="glass-card border-0 rounded-2xl overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                今日记录
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="今天做了什么..."
                value={todayContent}
                onChange={(e) => setTodayContent(e.target.value)}
                className="min-h-[100px] bg-white/50 border-white/50 focus:border-primary/50 resize-none rounded-xl"
              />
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 flex-1">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <Input
                    type="number"
                    placeholder="专注时长（分钟）"
                    value={todayDuration}
                    onChange={(e) => setTodayDuration(e.target.value)}
                    className="bg-white/50 border-white/50 focus:border-primary/50 rounded-xl"
                  />
                </div>
                <Button 
                  onClick={handleSaveToday}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-6"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isSaved ? "已保存" : "保存"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 历史记录区 */}
          <Card className="glass-card border-0 rounded-2xl overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                最近7天记录
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {history.slice(0, 7).map((record) => (
                  <div
                    key={record.id}
                    className="flex items-start gap-4 p-3 rounded-xl bg-white/30 hover:bg-white/50 transition-colors"
                  >
                    <div className="text-sm text-muted-foreground min-w-[60px]">
                      {record.date}
                    </div>
                    <div className="flex-1">
                      <p className="text-foreground text-sm">{record.content}</p>
                    </div>
                    <div className="text-sm text-primary font-medium">
                      {record.duration}分钟
                    </div>
                  </div>
                ))}
                {history.length === 0 && (
                  <p className="text-center text-muted-foreground py-4">暂无记录</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* 作品/素材区 */}
          <Card className="glass-card border-0 rounded-2xl overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
                <ImageIcon className="h-4 w-4 text-primary" />
                作品 / 素材
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {project.works.map((work) => (
                  <div
                    key={work.id}
                    className="aspect-square rounded-xl bg-white/30 border border-white/50 flex items-center justify-center hover:bg-white/50 transition-colors cursor-pointer group"
                  >
                    <div className="text-center p-4">
                      <ImageIcon className="h-8 w-8 text-muted-foreground mx-auto mb-2 group-hover:text-primary transition-colors" />
                      <p className="text-xs text-muted-foreground">{work.placeholder}</p>
                    </div>
                  </div>
                ))}
                <div className="aspect-square rounded-xl border-2 border-dashed border-muted-foreground/30 flex items-center justify-center hover:border-primary/50 transition-colors cursor-pointer group">
                  <div className="text-center">
                    <Plus className="h-8 w-8 text-muted-foreground mx-auto mb-2 group-hover:text-primary transition-colors" />
                    <p className="text-xs text-muted-foreground">添加素材</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 灵感笔记区 */}
          <Card className="glass-card border-0 rounded-2xl overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-amber-500" />
                灵感笔记
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-3">
                <Input
                  placeholder="记录你的灵感..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddNote()}
                  className="flex-1 bg-white/50 border-white/50 focus:border-amber-500/50 rounded-xl"
                />
                <Button
                  onClick={handleAddNote}
                  variant="outline"
                  className="border-amber-500/50 text-amber-600 hover:bg-amber-50 rounded-xl"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-2">
                {notes.map((note) => (
                  <div
                    key={note.id}
                    className="flex items-start gap-3 p-3 rounded-xl bg-amber-50/50 border border-amber-100"
                  >
                    <Lightbulb className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
                    <div className="flex-1">
                      <p className="text-foreground text-sm">{note.content}</p>
                      <p className="text-xs text-muted-foreground mt-1">{note.createdAt}</p>
                    </div>
                  </div>
                ))}
                {notes.length === 0 && (
                  <p className="text-center text-muted-foreground py-4">暂无灵感笔记</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
