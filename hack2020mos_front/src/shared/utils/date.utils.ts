import moment from 'moment'

export const dateFormatting = (date: string) => moment(date).format('L')