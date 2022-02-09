import * as React from 'react'
import { Button } from '~/components/button'
import { Grid, GridLines } from '~/components/grid'
import { HeroSection } from '~/components/hero-section'
import { H1, H2 } from '~/components/typography'
import imgDummy from '../../public/dummy.webp'

export default function Index() {
  return (
    <Grid
      as={'header'}
      className="lg: mb-24 h-auto pt-24 lg:min-h-[40rem] lg:pb-12"
    >
      <HeroSection />
      <div className="col-span-full mb-12 flex items-center justify-center lg:col-span-7 lg:col-start-6 lg:mb-0 lg:-mt-24 lg:-mr-5vw lg:px-0">
        <img
          src={'/dummy.webp'}
          className="h-auto max-h-[75vh] w-[80%] object-contain"
        />
      </div>
    </Grid>
  )
}
