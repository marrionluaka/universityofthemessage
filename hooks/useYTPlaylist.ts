import { ref, Ref } from "@vue/composition-api"
import useContext from '~/hooks/useContext'

export default function useYTPlaylist() {
  const { context } = useContext()

  const videos: Ref<any> = ref(null)
  const nextPageToken: Ref<string> = ref('')
  const prevPageToken: Ref<string> = ref('')

  const YOUTUBE_PLAYLIST_ID = 'PL9OTQHKCFx7bOGIC3ZI4Z7jPnoqtYgNJF'
  const YOUTUBE_PLAYLIST_ITEMS_API = 'https://www.googleapis.com/youtube/v3/playlistItems'
  let playlistURL = `${YOUTUBE_PLAYLIST_ITEMS_API}?part=snippet&playlistId=${YOUTUBE_PLAYLIST_ID}&maxResults=12&key=${process.env.YOUTUBE_API_KEY}`

  const populatePlaylist = async (fn = (val: any) => {}) => {
    try {
      const data = await context.$axios.$get(playlistURL)

      videos.value = data.items
      nextPageToken.value = data.nextPageToken
      prevPageToken.value = data.prevPageToken

      fn(data)
    } catch (e) {
      console.log(e)
    }
  }

  const setNewPlaylist = async (dir: string) => {
    const getPagedUrl = (str: string) => {
      const u = playlistURL.slice(0, playlistURL.indexOf('&key='))
      return u.concat(str).concat(playlistURL.slice(playlistURL.indexOf('&key=')))
    }

    if (dir === 'nextPage') {
      playlistURL = getPagedUrl(`&pageToken=${nextPageToken.value}`)
    } else {
      playlistURL = getPagedUrl(`&pageToken=${prevPageToken.value}`)
    }

    await populatePlaylist()
  }

  return {
    videos,
    setNewPlaylist,
    populatePlaylist
  }
}
