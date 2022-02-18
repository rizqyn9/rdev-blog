import * as React from 'react'
import { HeroSection } from '~/components/hero-section'
import { BlogSection } from '~/components/sections/blog-section'

export default function Index() {
  return (
    <div>
      <HeroSection />
      <main>
        <BlogSection />
      </main>
    </div>
  )
}
