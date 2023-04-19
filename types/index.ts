export { }

declare global {

  interface Asset {
    name: string
    url: string
  }

  interface Release {
    tag_name: string,
    prerelease: boolean,
    assets: Asset[]
  }

}
