import axios from 'axios'

const REQUEST_URL = 'https://affine.pro/api/worker/releases'

export default defineEventHandler(async (event) => {
  try {
    let { data } = await axios.get(REQUEST_URL)

    if (Array.isArray(data)) {
      data = data.map(({ name, prerelease, assets, tag_name, published_at }) => {
        return {
          name,
          tag_name,
          published_at,
          prerelease,
          assets
        }
      }).filter(el => el.published_at)
    }

    return data
  } catch(error) {
    console.log('[API] get releases error', error)
    throw error
  }
})
