"use client"

import { Sparkles } from "lucide-react"
import { useState, useEffect } from "react"
import { DailySummary } from "./daily-summary"

export function HeroSection() {
  const [greeting, setGreeting] = useState("你好")

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 6) setGreeting("夜深了")
    else if (hour < 12) setGreeting("早上好")
    else if (hour < 14) setGreeting("中午好")
    else if (hour < 18) setGreeting("下午好")
    else setGreeting("晚上好")
  }, [])

  return (
    <section className="mb-10">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/50 p-8 md:p-12">
        {/* 装饰性元素 */}
        <div className="absolute right-0 top-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 -mb-16 -ml-16 h-48 w-48 rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute right-1/4 bottom-1/4 h-32 w-32 rounded-full bg-secondary/30 blur-2xl" />
        
        {/* Glass card overlay */}
        <div className="relative glass rounded-xl p-6 md:p-8">
          <div className="flex items-center gap-2 text-primary mb-3">
            <Sparkles className="h-5 w-5" />
            <span className="text-sm font-medium">{greeting}</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3 text-balance">
            欢迎回来，不正常人类
          </h1>
          
          <p className="text-muted-foreground text-lg max-w-xl leading-relaxed">
            正在同时推进 <span className="text-primary font-semibold">3 个项目</span>，
            你已经坚持学习了 <span className="text-primary font-semibold">15 天</span>。
            继续加油！
          </p>
          
          {/* 今日总览 */}
          <DailySummary />
        </div>
      </div>
    </section>
  )
}
