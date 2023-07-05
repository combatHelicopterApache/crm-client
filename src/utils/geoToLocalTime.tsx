import moment from 'moment-timezone'
import { timezones } from './timezones'

export const geoToLocalTime = code => {
  if (!code) return moment().format('DD-MM-YYYY HH:mm')

  const timeZones = timezones?.find(t => t?.country_code === code)

  if (!!timeZones?.timezones?.length) {
    return moment.tz(timeZones?.timezones?.[0]).format('DD-MM-YYYY HH:mm')
  } else {
    return moment().format('DD-MM-YYYY HH:mm')
  }
}
