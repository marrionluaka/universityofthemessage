import useComponentState from './useComponentState'

export default function useToggle() {
  const [open, setOpen] = useComponentState(false)
  const toggle = () => setOpen(!open.value)

  return [open, toggle]
}
