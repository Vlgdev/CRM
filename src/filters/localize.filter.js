import store from '../store'
import ruLocale from '../localize/ru'
import enLocale from '../localize/en'

export default function localizeFilter(value) {

  const en = enLocale

  const ru = ruLocale

  const locale = store.getters.info.locale || 'en-US'

  return locale === 'ru-RU' ? ru[value] : en[value]
}