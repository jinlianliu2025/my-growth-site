// 简单的状态管理，用于首页功能
import { create } from 'zustand'

export type ProjectCategory = "painting" | "writing" | "coding" | "other"

export interface Project {
  id: string
  name: string
  category: ProjectCategory
  progress: number
  target: string
  lastUpdated: string
  checkedInToday: boolean
}

export interface Activity {
  id: string
  type: "checkin" | "idea" | "milestone"
  projectId?: string
  projectName?: string
  content: string
  time: Date
  duration?: number
}

export interface DailySummary {
  projectsAdvanced: number
  focusHours: number
  weeklyGoalProgress: number
}

interface HomeState {
  projects: Project[]
  activities: Activity[]
  dailySummary: DailySummary
  checkIn: (projectId: string, content: string, duration: number) => void
  addIdea: (title: string, tag: string) => void
}

const initialProjects: Project[] = [
  {
    id: "1",
    name: "写小说",
    category: "writing",
    progress: 45,
    target: "完成第一章",
    lastUpdated: "2 小时前",
    checkedInToday: false,
  },
  {
    id: "2",
    name: "学画画",
    category: "painting",
    progress: 30,
    target: "掌握水彩基础",
    lastUpdated: "昨天",
    checkedInToday: false,
  },
  {
    id: "3",
    name: "美食宇宙",
    category: "other",
    progress: 15,
    target: "收集 100 道菜谱",
    lastUpdated: "3 天前",
    checkedInToday: false,
  },
]

const initialActivities: Activity[] = [
  {
    id: "a1",
    type: "checkin",
    projectId: "1",
    projectName: "写小说",
    content: "写了1200字",
    time: new Date(Date.now() - 1000 * 60 * 30),
    duration: 45,
  },
  {
    id: "a2",
    type: "checkin",
    projectId: "2",
    projectName: "学画画",
    content: "完成了今天的练习",
    time: new Date(Date.now() - 1000 * 60 * 60 * 2),
    duration: 60,
  },
  {
    id: "a3",
    type: "idea",
    content: "美食网站加购物功能",
    time: new Date(Date.now() - 1000 * 60 * 60 * 5),
  },
]

export const useHomeStore = create<HomeState>((set) => ({
  projects: initialProjects,
  activities: initialActivities,
  dailySummary: {
    projectsAdvanced: 2,
    focusHours: 3.5,
    weeklyGoalProgress: 65,
  },
  
  checkIn: (projectId, content, duration) => {
    set((state) => {
      const progressIncrease = Math.min(5, Math.max(1, Math.floor(duration / 15)))
      
      const updatedProjects = state.projects.map((p) =>
        p.id === projectId
          ? {
              ...p,
              progress: Math.min(100, p.progress + progressIncrease),
              lastUpdated: "刚刚",
              checkedInToday: true,
            }
          : p
      )
      
      const project = state.projects.find((p) => p.id === projectId)
      
      const newActivity: Activity = {
        id: `a${Date.now()}`,
        type: "checkin",
        projectId,
        projectName: project?.name,
        content,
        time: new Date(),
        duration,
      }
      
      const projectsAdvancedToday = updatedProjects.filter((p) => p.checkedInToday).length
      
      return {
        projects: updatedProjects,
        activities: [newActivity, ...state.activities],
        dailySummary: {
          ...state.dailySummary,
          projectsAdvanced: projectsAdvancedToday,
          focusHours: state.dailySummary.focusHours + duration / 60,
        },
      }
    })
  },
  
  addIdea: (title, tag) => {
    set((state) => {
      const newActivity: Activity = {
        id: `a${Date.now()}`,
        type: "idea",
        content: title,
        time: new Date(),
      }
      
      return {
        activities: [newActivity, ...state.activities],
      }
    })
  },
}))
