import { ref, Ref } from "@vue/composition-api"
import { useContext } from '~/hooks/useContext'

export default function useYTPlaylist() {
  const { context } = useContext()

  const ytData: Ref<any> = ref(null)
  const videos: Ref<any> = ref(null)

  const YOUTUBE_PLAYLIST_ID = 'PL9OTQHKCFx7bOGIC3ZI4Z7jPnoqtYgNJF'
  const YOUTUBE_PLAYLIST_ITEMS_API = 'https://www.googleapis.com/youtube/v3/playlistItems'
  let playlistURL = `${YOUTUBE_PLAYLIST_ITEMS_API}?part=snippet&playlistId=${YOUTUBE_PLAYLIST_ID}&maxResults=12&key=${process.env.YOUTUBE_API_KEY}`

  const populatePlaylist = async () => {
    try {
      const data = await context.$axios.$get(playlistURL)

      ytData.value = data
      videos.value = data.items
    } catch (e) {
      console.log(e)
    }
  }

  const getPagedUrl = (str: string) => {
    const url = playlistURL.slice(0, playlistURL.indexOf('&key='))
    return url.concat(str).concat(playlistURL.slice(playlistURL.indexOf('&key=')))
  }

  const setNewPlaylist = async (dir: string) => {
    if (dir === 'nextPage') {
      playlistURL = getPagedUrl(`&pageToken=${ytData.value.nextPageToken}`)
    } else {
      playlistURL = getPagedUrl(`&pageToken=${ytData.value.prevPageToken}`)
    }

    await populatePlaylist()
  }

  return {
    videos,
    ytData,
    setNewPlaylist,
    populatePlaylist
  }
}
