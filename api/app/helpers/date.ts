export const formatMonth = (month: string) => {
  let months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']

  return `${months[parseInt(month) - 1]}`
}

export const reverseDate = (date: string) => {
  let [day, month, year] = date.split('-')

  return `${year}-${month}-${day}`
}

export const strToDate = (strDate: string) => {
  let [year, month, day] = strDate.split('-')

  return new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
}

export const dateToStr = (date: Date) => {
  return `${date.getFullYear()}-${addZeroToDate(date.getUTCMonth()+1)}-${addZeroToDate(date.getDate())} ${addZeroToDate(date.getHours())}:${addZeroToDate(date.getMinutes())}:${addZeroToDate(date.getSeconds())}`
}

export const formatDate = (date: Date) => {
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()

  return `${addZeroToDate(day)}-${addZeroToDate(month)}-${year}`
}

export const dateToTime = (date: Date) => `${addZeroToDate(date.getHours()-1)}:${addZeroToDate(date.getMinutes())}`

const addZeroToDate = (n: number) => n < 10 ? `0${n}` : `${n}`
