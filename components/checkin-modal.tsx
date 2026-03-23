"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Clock } from "lucide-react"

interface CheckInModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  projectName: string
  onSubmit: (content: string, duration: number) => void
}

export function CheckInModal({ open, onOpenChange, projectName, onSubmit }: CheckInModalProps) {
  const [content, setContent] = useState("")
  const [duration, setDuration] = useState([30])

  const handleSubmit = () => {
    if (content.trim()) {
      onSubmit(content, duration[0])
      setContent("")
      setDuration([30])
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-card border-0 sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-foreground">
            今日打卡 - {projectName}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="content" className="text-foreground">今天做了什么？</Label>
            <Textarea
              id="content"
              placeholder="记录一下今天的进展..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[100px] bg-background/50 border-border/50 focus:border-primary/50"
            />
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-foreground flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                专注时长
              </Label>
              <span className="text-sm font-medium text-primary">{duration[0]} 分钟</span>
            </div>
            <Slider
              value={duration}
              onValueChange={setDuration}
              max={180}
              min={5}
              step={5}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>5分钟</span>
              <span>3小时</span>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} className="glass border-border/50">
            取消
          </Button>
          <Button onClick={handleSubmit} disabled={!content.trim()} className="bg-primary hover:bg-primary/90">
            完成打卡
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
