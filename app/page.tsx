import { HeroSection } from "@/components/hero-section"
import { ProjectsOverview } from "@/components/projects-overview"
import { ActivityFeed } from "@/components/activity-feed"
import { Header } from "@/components/header"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <HeroSection />
        <ProjectsOverview />
        <ActivityFeed />
      </main>
    </div>
  )
}
