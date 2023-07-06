import moment from 'moment-timezone'

export const formatTimeByMoment = time =>
  moment.utc(time).local().format('MM/DD/YY, h:mma')

export const isValueEmpty = value => Boolean(value.trim().length)
