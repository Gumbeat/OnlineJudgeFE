import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

const languages = [
  {value: 'en-US', label: 'English'},
  {value: 'ru-RU', label: 'Русский'}
]
const messages = {}

// combine admin and oj
for (let lang of languages) {
  let locale = lang.value
  let m = require(`./oj/${locale}`).m
  Object.assign(m, require(`./admin/${locale}`).m)
  messages[locale] = {m: m}
}
// load language packages
export default new VueI18n({
  locale: 'ru-RU',
  messages: messages,
  datepicker: {
    now: 'Сейчас',
    today: 'Сегодня',
    cancel: 'Отмена',
    clear: 'Очистить',
    confirm: 'Подтвердить',
    selectDate: 'Выбрать дату',
    selectTime: 'Выбрать время',
    startTime: 'Время начала',
    endTime: 'Время окончания',
    year: 'Год',
    month: 'Месяц',
    week: 'Неделя',
    weeks: {
      sun: 'вс',
      mon: 'пн',
      tue: 'вт',
      wed: 'ср',
      thu: 'чт',
      fri: 'пт',
      sat: 'сб'
    },
    months: {
      jan: 'янв',
      feb: 'фев',
      mar: 'март',
      apr: 'апр',
      may: 'май',
      jun: 'июнь',
      jul: 'июль',
      aug: 'авг',
      sep: 'сент',
      oct: 'окт',
      nov: 'нояб',
      dec: 'дек'
    }
  }
})

export {languages}
