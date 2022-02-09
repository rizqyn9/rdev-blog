import * as React from 'react'
import { Link } from 'remix'
import clsx from 'clsx'
import { H3 } from './typography'

function ArticleCard() {
  return (
    <div className={clsx('relative w-full')}>
      <Link
        prefetch="intent"
        className="group peer relative block w-full focus:outline-none"
        to={`/blog/`}
      >
        {/* {bannerCloudinaryId ? (
          <BlurrableImage
            key={bannerCloudinaryId}
            blurDataUrl={bannerBlurDataUrl}
            className="aspect-h-4 aspect-w-3 rounded-lg"
            img={
              <img
                title={frontmatter.title ?? getBannerTitleProp(frontmatter)}
                {...getImgProps(
                  getImageBuilder(
                    bannerCloudinaryId,
                    getBannerAltProp(frontmatter),
                  ),
                  {
                    widths: [280, 560, 840, 1100, 1300, 1650],
                    sizes: [
                      '(max-width:639px) 80vw',
                      '(min-width:640px) and (max-width:1023px) 40vw',
                      '(min-width:1024px) and (max-width:1620px) 25vw',
                      '420px',
                    ],
                    transformations: {
                      background: 'rgb:e6e9ee',
                      resize: {
                        type: 'fill',
                        aspectRatio: '3:4',
                      },
                    },
                  },
                )}
                className="focus-ring w-full rounded-lg object-cover object-center transition"
              />
            }
          />
        ) : (
          <div className="aspect-h-4 aspect-w-3">
            <div className="focus-ring w-full rounded-lg transition">
              <MissingSomething aspectRatio="3:4" />
            </div>
          </div>
        )} */}

        <div className="mt-8 text-xl font-medium text-blueGray-500">123123</div>
        <H3 as="div" className="mt-4">
          title
        </H3>
      </Link>

      {/* <ClipboardCopyButton value={''} className="absolute left-6 top-6 z-10" /> */}
    </div>
  )
}

export { ArticleCard }
