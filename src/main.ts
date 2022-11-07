import * as core from '@actions/core'
import * as github from '@actions/github'

async function run(): Promise<void> {
  try {
    console.log(github.context)
  } catch (error: any) {
    core.setFailed(error.message)
  }
}

run()
