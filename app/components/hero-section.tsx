import { Button } from './RButton'
import { Grid } from './grid'
import { H2 } from './typography'

function HeroSection() {
  return (
    <Grid
      as={'header'}
      className="lg: mb-24 h-auto pt-24 lg:mb-64 lg:min-h-[40rem] lg:pb-12"
    >
      {/* has Image */}
      <div className="col-span-full mb-12 flex items-center justify-center lg:col-span-7 lg:col-start-6 lg:mb-0 lg:-mt-24 lg:-mr-5vw lg:px-0">
        <img
          src={'/dum.png'}
          className="h-auto max-h-[75vh] w-[80%] object-contain"
        />
      </div>
      <div className="col-span-full pt-6 lg:col-span-5 lg:col-start-1 lg:row-start-1 lg:flex lg:h-full lg:flex-col">
        <div className="flex flex-auto flex-col">
          <H2 as={'h2'}>
            Helping people make the world a better place through quality
            software.
          </H2>
          {/* Button */}
          <div className="mt-14 flex flex-col space-y-4">
            <div className="mr-auto flex flex-col gap-4 text-white">
              {/* <Button variant="primary" className="rounded-full bg-pink">
                Read the blog
              </Button> */}
              <Button variant="primary" className="font-rowdies">
                Read the blog
              </Button>
              <Button variant="secondary" className="font-rowdies">
                Take a course
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Grid>
  )
}

export { HeroSection }
