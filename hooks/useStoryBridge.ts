import { Ref } from '@vue/composition-api'
import { useContext } from '~/hooks/useContext'

export default function useStoryBridge() {
  const { context, storyBridge } = useContext()

  const setStoryBridgeListeners = (story: Ref<any>) => {
    storyBridge.on('input', (event: any) => {
      if (event.story.id === story.value.id) {
        story.value = event.story.content
      }
    })

    storyBridge.on(['published', 'change'], () => {
      context.app.router.go({
        path:context.app.router.currentRoute,
        force: true,
      })
    })
  }

  return { setStoryBridgeListeners }
}
