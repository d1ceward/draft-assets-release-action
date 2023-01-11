import { context } from '@actions/github'

export default function getReleaseTag(): string {
  const ref = context.ref

  let tag = undefined
  if (ref.startsWith('refs/tags/'))
    tag = ref.replace('refs/tags/', '')

  if (!tag)
    throw new Error('No release tag found')

  return tag
}
