"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PenTool, Palette, Code, MoreHorizontal } from "lucide-react"
import { type IdeaTag, type IdeaStatus } from "@/lib/idea-store"

interface IdeaFormModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: {
    title: string
    description: string
    tag: IdeaTag
    status: IdeaStatus
  }) => void
}

const tagOptions = [
  { value: "writing" as IdeaTag, label: "写作", icon: PenTool, color: "text-blue-600" },
  { value: "painting" as IdeaTag, label: "画画", icon: Palette, color: "text-pink-600" },
  { value: "coding" as IdeaTag, label: "项目", icon: Code, color: "text-emerald-600" },
  { value: "other" as IdeaTag, label: "其他", icon: MoreHorizontal, color: "text-gray-600" },
]

const statusOptions = [
  { value: "pending" as IdeaStatus, label: "待实现", color: "text-amber-600" },
  { value: "in-progress" as IdeaStatus, label: "进行中", color: "text-blue-600" },
  { value: "on-hold" as IdeaStatus, label: "已搁置", color: "text-gray-600" },
]

export function IdeaFormModal({ open, onOpenChange, onSubmit }: IdeaFormModalProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [tag, setTag] = useState<IdeaTag>("writing")
  const [status, setStatus] = useState<IdeaStatus>("pending")

  const handleSubmit = () => {
    if (title.trim()) {
      onSubmit({ title, description, tag, status })
      setTitle("")
      setDescription("")
      setTag("writing")
      setStatus("pending")
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-card border-0 sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-foreground text-xl">新增想法</DialogTitle>
        </DialogHeader>

        <div className="space-y-5 py-4">
          <div className="space-y-2">
            <Label htmlFor="idea-title" className="text-foreground font-medium">想法标题</Label>
            <Input
              id="idea-title"
              placeholder="给你的想法起个名字..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-background/50 border-border/50 focus:border-primary/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="idea-description" className="text-foreground font-medium">详细描述</Label>
            <Textarea
              id="idea-description"
              placeholder="描述一下你的想法..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[100px] bg-background/50 border-border/50 focus:border-primary/50 resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-foreground font-medium">标签分类</Label>
              <Select value={tag} onValueChange={(value) => setTag(value as IdeaTag)}>
                <SelectTrigger className="bg-background/50 border-border/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {tagOptions.map((option) => {
                    const Icon = option.icon
                    return (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex items-center gap-2">
                          <Icon className={`h-4 w-4 ${option.color}`} />
                          <span>{option.label}</span>
                        </div>
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-foreground font-medium">当前状态</Label>
              <Select value={status} onValueChange={(value) => setStatus(value as IdeaStatus)}>
                <SelectTrigger className="bg-background/50 border-border/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <span className={option.color}>{option.label}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="glass border-border/50"
          >
            取消
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!title.trim()}
            className="bg-primary hover:bg-primary/90"
          >
            保存想法
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
