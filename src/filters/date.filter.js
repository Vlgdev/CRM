import store from '../store'

export default function dateFilter(value, format = 'date') {
  const options = {}

  if (format.includes('date')) {
    options.day = 'numeric'
    options.month = 'numeric'
    options.year = 'numeric'
  }

  if (format.includes('time')) {
    options.hour = '2-digit'
    options.minute = '2-digit'
    options.second = '2-digit'
  }

  const locale = store.getters.info.locale

  return new Intl.DateTimeFormat(locale, options).format(new Date(value))
}
