import * as React from 'react'
import { ArticleCard } from '../article-card'
import { Grid } from '../grid'
import { H2 } from '../typography'
import { HeaderSection } from './header-section'

function BlogSection() {
  return (
    <>
      <HeaderSection title="Blog" subTitle="nothing" />
      <Grid className="gap-y-16">
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
      </Grid>
    </>
  )
}

export { BlogSection }
