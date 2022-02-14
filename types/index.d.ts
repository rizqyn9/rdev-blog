import type { ReadTimeResults } from 'reading-time'

export type BlogFrontmatter = {
  wordCount: number
  readingTime: ReadTimeResults
  slug: string
  englishOnly?: boolean
  title: string
  description: string
  banner: string
  publishedAt: string
  lastUpdated?: string
  tags: string
}

export type BlogType = {
  code: string
  frontmatter: BlogFrontmatter
}
