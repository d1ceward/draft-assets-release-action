import * as core from '@actions/core'
import * as github from '@actions/github'
import { basename } from 'path'
import { readFile } from 'fs/promises'

// Local imports
import getReleaseTag from './release'

async function run(): Promise<void> {
  try {
    const files = core.getMultilineInput('files', { required: true })

    const token = core.getInput('token', { required: true })
    const octokit = github.getOctokit(token)

    const releaseTag = getReleaseTag()
    core.debug(`Resolved release tag to ${releaseTag}`)

    const releases = await octokit.rest.repos.listReleases({
      owner: github.context.repo.owner,
      repo: github.context.repo.repo
    })

    if (releases.data.some(release => release.tag_name === releaseTag)) {
      core.warning(`Release with tag ${releaseTag} already exists`)
      return
    }

    const release = await octokit.rest.repos.createRelease({
      owner: github.context.repo.owner,
      repo: github.context.repo.repo,
      tag_name: releaseTag, // eslint-disable-line camelcase
      draft: true,
      target_commitish: github.context.sha // eslint-disable-line camelcase
    })

    await Promise.all(
      files.map(async file => {
        core.debug(`Reading file ${file}`)

        const fileName = basename(file)
        const data = await readFile(file)

        core.debug(`Uploading file ${fileName} (${data.length} bytes)`)
        const upload = await octokit.rest.repos.uploadReleaseAsset({
          owner: github.context.repo.owner,
          repo: github.context.repo.repo,
          release_id: release.data.id, // eslint-disable-line camelcase
          name: fileName,
          data: data as unknown as string
        })

        core.info(`Uploaded file ${fileName}, permalink is: ${upload.data.browser_download_url}`)
      })
    )
  } catch (error: any) {
    core.setFailed(error.message)
  }
}

run()
