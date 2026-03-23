"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PenTool, Palette, Code, Lightbulb } from "lucide-react"

interface IdeaModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (title: string, tag: string) => void
}

const tags = [
  { id: "writing", label: "写作", icon: PenTool, color: "text-blue-600", bgColor: "bg-blue-100/80" },
  { id: "painting", label: "画画", icon: Palette, color: "text-pink-600", bgColor: "bg-pink-100/80" },
  { id: "coding", label: "项目", icon: Code, color: "text-emerald-600", bgColor: "bg-emerald-100/80" },
]

export function IdeaModal({ open, onOpenChange, onSubmit }: IdeaModalProps) {
  const [title, setTitle] = useState("")
  const [selectedTag, setSelectedTag] = useState("writing")

  const handleSubmit = () => {
    if (title.trim()) {
      onSubmit(title, selectedTag)
      setTitle("")
      setSelectedTag("writing")
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-card border-0 sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-foreground flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-amber-500" />
            记录新想法
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="idea-title" className="text-foreground">想法标题</Label>
            <Input
              id="idea-title"
              placeholder="输入你的灵感..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-background/50 border-border/50 focus:border-primary/50"
            />
          </div>
          
          <div className="space-y-3">
            <Label className="text-foreground">选择标签</Label>
            <div className="flex gap-2">
              {tags.map((tag) => {
                const Icon = tag.icon
                const isSelected = selectedTag === tag.id
                return (
                  <button
                    key={tag.id}
                    type="button"
                    onClick={() => setSelectedTag(tag.id)}
                    className={`
                      flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200
                      ${isSelected 
                        ? `${tag.bgColor} ${tag.color} ring-2 ring-offset-2 ring-current` 
                        : "bg-muted/50 text-muted-foreground hover:bg-muted"
                      }
                    `}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="text-sm font-medium">{tag.label}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} className="glass border-border/50">
            取消
          </Button>
          <Button onClick={handleSubmit} disabled={!title.trim()} className="bg-primary hover:bg-primary/90">
            保存想法
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
