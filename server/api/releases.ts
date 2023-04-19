import axios from 'axios'

const REQUEST_URL = 'https://api.affine.pro/api/downloads'

export default defineEventHandler(async (event) => {
  try {
    let { data } = await axios.get(REQUEST_URL)

    if (Array.isArray(data)) {
      data = data.map(({ name, prerelease, assets, tag_name }) => {
        return {
          name,
          tag_name,
          prerelease,
          assets
        }
      })
    }

    return data
  } catch(error) {
    console.log('[API] get releases error', error)
    throw error
  }
})
