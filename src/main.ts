import * as core from '@actions/core'
import * as github from '@actions/github'
import fs from 'fs'

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
    const release = releases.data.find(item => item.tag_name === releaseTag)

    // if (release)
    //   core.debug(`Found release ${release.data.tag_name} with ID ${release.data.id}`)
    // else {
    //   release = await octokit.rest.repos.createRelease({
    //     owner: github.context.repo.owner,
    //     repo: github.context.repo.repo,
    //     tag_name: releaseTag, // eslint-disable-line camelcase
    //     draft: true,
    //     target_commitish: github.context.sha // eslint-disable-line camelcase
    //   })

    //   core.debug(`Created release ${release.data.tag_name} with ID ${release.data.id}`)
    // }

    console.log(release)

    // const file = fs.readFileSync(inputPath) as unknown as string
    // octokit.rest.repos.uploadReleaseAsset({
    //   owner: github.context.repo.owner,
    //   repo: github.context.repo.repo,
    //   release_id: release.data.id, // eslint-disable-line camelcase
    //   name: inputName,
    //   data: file
    // })
  } catch (error: any) {
    core.setFailed(error.message)
  }
}

run()
