import { Button } from './button'
import { H2 } from './typography'

function HeroSection() {
  return (
    <div className="col-span-full lg:col-span-5 lg:col-start-1 lg:row-start-1 lg:flex lg:h-full lg:flex-col">
      <div className="flex flex-auto flex-col">
        <H2 className="text-white" as={'h2'}>
          Helping people make the world a better place through quality software.
        </H2>
        {/* Button */}
        <div className="mt-14 flex flex-col space-y-4">
          <div className="mr-auto flex flex-col gap-4 text-white">
            <Button variant="primary" className="rounded-full bg-pink">
              Read the blog
            </Button>
            <Button variant="secondary">Take a course</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export { HeroSection }
