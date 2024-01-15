import i18n, { Resource } from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import { getLanguage } from '~services/storage/language'
import simplifiedChinese from './locales/simplified-chinese.json'
const resources: Resource = {
  'zh-CN': { translation: simplifiedChinese }
}

export const languageCodes = Object.keys(resources)

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    lng: getLanguage(),
    fallbackLng: 'en',
    resources,
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    detection: {
      order: ['navigator'],
      caches: [],
    },
  })

export default i18n
