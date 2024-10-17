# Draft Assets Release Action

Simple Github action to create a draft release with assets on tags push.

## Example workflow

```yml
name: Draft Assets Release Action
on:
  push:
    tags:
      - 'v*'
jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      # ...
      - uses: d1ceward/release-upload-action@v2
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          files: |
            bin/my-first-binary
            bin/my-second-binary
```

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/d1ceward/release-upload-action. By contributing you agree to abide by the Code of Merit.

1. Fork it (<https://github.com/d1ceward/release-upload-action/fork>)
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request

## Development

1. Install corresponding version of Node.js (cf: `.node-version` file)
2. Install pnpm package manager with `corepack enable pnpm`
2. Install dependencies with `pnpm install`

## Contributors

- [d1ceward](https://github.com/d1ceward) - creator and maintainer
