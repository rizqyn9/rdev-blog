import * as React from 'react'
import { Button } from '~/components/button'
import { Grid, GridLines } from '~/components/grid'
import { HeroSection } from '~/components/hero-section'
import { BlogSection } from '~/components/sections/blog-section'
import { H1, H2 } from '~/components/typography'
import imgDummy from '../../public/dummy.webp'

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
