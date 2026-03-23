"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ArrowRight, Code, Palette, PenTool, MoreHorizontal, ChevronLeft, ChevronRight, CheckCircle2, Calendar } from "lucide-react"
import Link from "next/link"
import { useRef, useState, useEffect } from "react"
import { useHomeStore, type Project, type ProjectCategory } from "@/lib/home-store"
import { CheckInModal } from "./checkin-modal"

const categoryConfig: Record<ProjectCategory, { label: string; icon: typeof Palette; color: string; bgColor: string }> = {
  painting: {
    label: "画画",
    icon: Palette,
    color: "text-pink-600",
    bgColor: "bg-pink-100/80",
  },
  writing: {
    label: "写作",
    icon: PenTool,
    color: "text-blue-600",
    bgColor: "bg-blue-100/80",
  },
  coding: {
    label: "编程",
    icon: Code,
    color: "text-emerald-600",
    bgColor: "bg-emerald-100/80",
  },
  other: {
    label: "其他",
    icon: MoreHorizontal,
    color: "text-gray-600",
    bgColor: "bg-gray-100/80",
  },
}

function ProjectCard({ project, onCheckIn }: { project: Project; onCheckIn: () => void }) {
  const config = categoryConfig[project.category]
  const Icon = config.icon

  return (
    <Card className="glass-card group border-0 min-w-[280px] md:min-w-[320px] flex-shrink-0">
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${config.bgColor} backdrop-blur-sm`}>
            <Icon className={`h-5 w-5 ${config.color}`} />
          </div>
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${config.bgColor} ${config.color} backdrop-blur-sm`}>
            {config.label}
          </span>
        </div>

        <h3 className="font-semibold text-foreground mb-1.5 group-hover:text-primary transition-colors">
          {project.name}
        </h3>
        <p className="text-sm text-muted-foreground mb-4">{project.target}</p>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">进度</span>
            <span className="font-medium text-foreground">{project.progress}%</span>
          </div>
          <Progress value={project.progress} className="h-2" />
        </div>

        <div className="mt-4 pt-4 border-t border-border/30 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">更新于 {project.lastUpdated}</span>
          <Link 
            href={`/projects/${project.id}`}
            className="text-xs text-primary hover:underline flex items-center gap-1"
          >
            详情 <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        {/* 打卡按钮 */}
        <div className="mt-4">
          {project.checkedInToday ? (
            <Button 
              variant="outline" 
              size="sm" 
              disabled 
              className="w-full glass border-emerald-200 text-emerald-600 bg-emerald-50/50"
            >
              <CheckCircle2 className="h-4 w-4 mr-2" />
              今日已打卡
            </Button>
          ) : (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={(e) => {
                e.stopPropagation()
                onCheckIn()
              }}
              className="w-full glass border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50 transition-all"
            >
              <Calendar className="h-4 w-4 mr-2" />
              今日打卡
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export function ProjectsOverview() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [checkInProject, setCheckInProject] = useState<Project | null>(null)
  
  const projects = useHomeStore((state) => state.projects)
  const checkIn = useHomeStore((state) => state.checkIn)

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  useEffect(() => {
    checkScroll()
    const ref = scrollRef.current
    if (ref) {
      ref.addEventListener("scroll", checkScroll)
      return () => ref.removeEventListener("scroll", checkScroll)
    }
  }, [])

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 340
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  const handleCheckIn = (content: string, duration: number) => {
    if (checkInProject) {
      checkIn(checkInProject.id, content, duration)
    }
  }

  return (
    <section className="mb-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground">进行中的项目</h2>
          <p className="text-sm text-muted-foreground mt-0.5">继续你的创作与学习之旅</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-1">
            <Button 
              variant="outline" 
              size="icon" 
              className="h-8 w-8 glass border-0"
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="h-8 w-8 glass border-0"
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/projects" className="text-primary">
              查看全部 <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4 snap-x snap-mandatory"
      >
        {projects.map((project) => (
          <div key={project.id} className="snap-start">
            <ProjectCard 
              project={project} 
              onCheckIn={() => setCheckInProject(project)}
            />
          </div>
        ))}
      </div>

      {/* Mobile scroll indicator */}
      <div className="flex justify-center gap-1.5 mt-4 md:hidden">
        {projects.map((_, index) => (
          <div 
            key={index} 
            className="h-1.5 w-1.5 rounded-full bg-primary/20"
          />
        ))}
      </div>

      {/* 打卡弹窗 */}
      <CheckInModal
        open={!!checkInProject}
        onOpenChange={(open) => !open && setCheckInProject(null)}
        projectName={checkInProject?.name || ""}
        onSubmit={handleCheckIn}
      />
    </section>
  )
}
