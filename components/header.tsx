"use client"

import Link from "next/link"
import { Leaf, Menu, Plus, X, Lightbulb } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { IdeaModal } from "./idea-modal"
import { useHomeStore } from "@/lib/home-store"

const navItems = [
  { name: "首页", href: "/" },
  { name: "项目", href: "/projects" },
  { name: "灵感库", href: "/ideas" },
  { name: "计划", href: "/plans" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [ideaModalOpen, setIdeaModalOpen] = useState(false)
  const addIdea = useHomeStore((state) => state.addIdea)

  const handleAddIdea = (title: string, tag: string) => {
    addIdea(title, tag)
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Leaf className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold text-foreground">进度小窝</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => setIdeaModalOpen(true)}
              className="hidden sm:flex gap-1.5 bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100 hover:text-amber-800 hover:border-amber-300 transition-all"
            >
              <Lightbulb className="h-4 w-4" />
              新想法
            </Button>
            <Button size="sm" className="hidden sm:flex gap-1.5">
              <Plus className="h-4 w-4" />
              新建项目
            </Button>
            
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border/40 bg-background">
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-3">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex gap-2 mt-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => {
                    setIdeaModalOpen(true)
                    setMobileMenuOpen(false)
                  }}
                  className="flex-1 gap-1.5 bg-amber-50 border-amber-200 text-amber-700"
                >
                  <Lightbulb className="h-4 w-4" />
                  新想法
                </Button>
                <Button size="sm" className="flex-1 gap-1.5">
                  <Plus className="h-4 w-4" />
                  新建项目
                </Button>
              </div>
            </nav>
          </div>
        )}
      </header>

      <IdeaModal
        open={ideaModalOpen}
        onOpenChange={setIdeaModalOpen}
        onSubmit={handleAddIdea}
      />
    </>
  )
}
