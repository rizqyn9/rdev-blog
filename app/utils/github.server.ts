import { Octokit as createOctokit } from '@octokit/rest'
import { throttling } from '@octokit/plugin-throttling'

const Octokit = createOctokit.plugin(throttling)
