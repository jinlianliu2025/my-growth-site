import { create } from 'zustand'

export type IdeaTag = "writing" | "painting" | "coding" | "other"
export type IdeaStatus = "pending" | "in-progress" | "on-hold"

export interface Idea {
  id: string
  title: string
  description: string
  tag: IdeaTag
  status: IdeaStatus
  createdAt: Date
}

interface IdeaState {
  ideas: Idea[]
  addIdea: (idea: Omit<Idea, 'id' | 'createdAt'>) => void
  updateIdea: (id: string, updates: Partial<Omit<Idea, 'id' | 'createdAt'>>) => void
  deleteIdea: (id: string) => void
}

const initialIdeas: Idea[] = [
  {
    id: "1",
    title: "美食宇宙网站",
    description: "创建一个美食分享平台，收集全球各地的美食故事",
    tag: "coding",
    status: "pending",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
  },
  {
    id: "2",
    title: "写一本美食小说",
    description: "以美食为线索，讲述人生百态的温情故事",
    tag: "writing",
    status: "in-progress",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
  },
  {
    id: "3",
    title: "四季美食插画",
    description: "用水彩画出春夏秋冬的代表性美食",
    tag: "painting",
    status: "pending",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
  },
  {
    id: "4",
    title: "学做100道菜",
    description: "掌握100道经典家常菜的做法",
    tag: "other",
    status: "on-hold",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10),
  },
]

export const useIdeaStore = create<IdeaState>((set) => ({
  ideas: initialIdeas,

  addIdea: (idea) => {
    set((state) => ({
      ideas: [
        {
          ...idea,
          id: `idea-${Date.now()}`,
          createdAt: new Date(),
        },
        ...state.ideas,
      ],
    }))
  },

  updateIdea: (id, updates) => {
    set((state) => ({
      ideas: state.ideas.map((idea) =>
        idea.id === id ? { ...idea, ...updates } : idea
      ),
    }))
  },

  deleteIdea: (id) => {
    set((state) => ({
      ideas: state.ideas.filter((idea) => idea.id !== id),
    }))
  },
}))
