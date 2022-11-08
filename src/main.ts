import * as core from '@actions/core'
import * as github from '@actions/github'
import fs from 'fs'

async function run(): Promise<void> {
  try {
    const ref = github.context.ref

    if (!ref.startsWith('refs/tags/')) {
      core.warning('Missing tag')
      return
    }

    const tagName = ref.replace('refs/tags/', '')
    const targetCommitish = github.context.sha

    const inputToken = core.getInput('token', { required: true })
    const inputName = core.getInput('name', { required: true })
    const inputPath = core.getInput('path', { required: true })

    const octokit = github.getOctokit(inputToken)

    const releases = await octokit.rest.repos.listReleases({
      owner: github.context.repo.owner,
      repo: github.context.repo.repo
    })
    if (releases.data.some(release => release.tag_name === tagName)) {
      core.warning(`Release with tag ${tagName} already exists`)
      return
    }

    const release = await octokit.rest.repos.createRelease({
      owner: github.context.repo.owner,
      repo: github.context.repo.repo,
      tag_name: tagName, // eslint-disable-line camelcase
      draft: true,
      target_commitish: targetCommitish // eslint-disable-line camelcase
    })

    const file = fs.readFileSync(inputPath) as unknown as string
    octokit.rest.repos.uploadReleaseAsset({
      owner: github.context.repo.owner,
      repo: github.context.repo.repo,
      release_id: release.data.id, // eslint-disable-line camelcase
      name: inputName,
      data: file
    })
  } catch (error: any) {
    core.setFailed(error.message)
  }
}

run()
