//@ts-ignore
import YTPlayer from 'yt-player'
import { ref, Ref } from '@vue/composition-api'

export default function useYTPlayer(selector = '#player', opts = { width: 1080 }) {
  let player: Ref<any> = ref(null)

  const setCurrentPlaying = (id: string) => {
    player.value.load(id)
    player.value.play()
  }

  const initPlayer = () => {
    player.value = new YTPlayer(selector, opts)
    player.value.setVolume(100)
  }

  return { player, initPlayer, setCurrentPlaying }
}
