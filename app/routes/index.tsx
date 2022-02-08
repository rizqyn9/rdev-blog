import * as React from 'react'
import { Button } from '~/components/button'
import { Grid, GridLines } from '~/components/Grid'
import { H1, H2 } from '~/components/typography'
import imgDummy from '../../public/dummy.webp'

export default function Index() {
  return (
    <Grid
      as={'header'}
      className="lg: mb-24 h-auto pt-24 lg:min-h-[40rem] lg:pb-12"
    >
      <div className="col-span-full lg:col-span-5 lg:col-start-1 lg:row-start-1 lg:flex lg:h-full lg:flex-col">
        <div className="flex flex-auto flex-col">
          <H2 className="text-white" as={'h2'}>
            Helping people make the world a better place through quality
            software.
          </H2>
          {/* Button */}
          <div>
            <div className="mr-auto flex flex-col gap-4">
              <Button variant="primary" className="rounded-full bg-pink">
                Read the blog
              </Button>
              <Button variant="secondary">Take a course</Button>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-full mb-12 flex items-center justify-center lg:col-span-7 lg:col-start-6 lg:mb-0 lg:-mt-24 lg:-mr-5vw lg:px-0">
        <img
          src={'/dummy.webp'}
          className="h-auto max-h-[75vh] w-[80%] object-contain"
        />
      </div>
    </Grid>
  )
}
