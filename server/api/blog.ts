import { getWorkspacePages } from '~/services/blog/getWorkspacePages'

export default defineEventHandler(async (event) => {

  const pages = await getWorkspacePages()

  return {
    pages
  }
})
