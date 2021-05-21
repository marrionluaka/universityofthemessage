// @ts-ignore
import { DateTime } from 'luxon'
import { ref, Ref } from '@vue/composition-api'

import { useContext } from '~/hooks/useContext'

const _defaultDate = {
  start: '2021-05-14 14:30',
  end: '2021-05-14 15:30',
  location: '12345 Fake Street'
}

export const useEventSchedule = () => {
  const { i18n } = useContext()
  const eventData: Ref<any> = ref(_defaultDate)

  const setEventData = (list: any) => {
    eventData.value = list?.find((x: any) => x.component === 'EventSchedule') || _defaultDate
  }

  const formateTime = (start: any, end: any) => `${_getTime(start)} - ${_getTime(end)}`

  const formateDate = (date: any) => _getDate(date).toFormat('LLL dd, yyyy')

  const _getTime = (time: any) => _getDate(time).toLocaleString(DateTime.TIME_SIMPLE)

  const _getDate = (date: any) => DateTime.fromJSDate(new Date(date), { locale: i18n.locale })

  return { eventData, setEventData, formateTime, formateDate }
}
