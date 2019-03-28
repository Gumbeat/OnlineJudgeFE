export const JUDGE_STATUS = {
  '-2': {
    name: 'Ошибка компиляции',
    short: 'CE',
    color: 'yellow',
    type: 'warning'
  },
  '-1': {
    name: 'Неправильный ответ',
    short: 'WA',
    color: 'red',
    type: 'error'
  },
  '0': {
    name: 'Принято',
    short: 'AC',
    color: 'green',
    type: 'success'
  },
  '1': {
    name: 'Превышение лимита времени',
    short: 'TLE',
    color: 'red',
    type: 'error'
  },
  '2': {
    name: 'Превышение лимита времени',
    short: 'TLE',
    color: 'red',
    type: 'error'
  },
  '3': {
    name: 'Превышение лимита памяти',
    short: 'MLE',
    color: 'red',
    type: 'error'
  },
  '4': {
    name: 'Ошибка исполнения',
    short: 'RE',
    color: 'red',
    type: 'error'
  },
  '5': {
    name: 'Системная ошибка',
    short: 'SE',
    color: 'red',
    type: 'error'
  },
  '6': {
    name: 'В ожидании',
    color: 'yellow',
    type: 'warning'
  },
  '7': {
    name: 'Оценивается',
    color: 'blue',
    type: 'info'
  },
  '8': {
    name: 'Частично принята',
    short: 'PAC',
    color: 'blue',
    type: 'info'
  },
  '9': {
    name: 'Отправляется',
    color: 'yellow',
    type: 'warning'
  }
}

export const CONTEST_STATUS = {
  'NOT_START': '1',
  'UNDERWAY': '0',
  'ENDED': '-1'
}

export const CONTEST_STATUS_REVERSE = {
  '1': {
    name: 'Ещё не началось',
    color: 'yellow'
  },
  '0': {
    name: 'Сейчас идёт',
    color: 'green'
  },
  '-1': {
    name: 'Завершено',
    color: 'red'
  }
}

export const RULE_TYPE = {
  ACM: 'ACM'
}

export const CONTEST_TYPE = {
  PUBLIC: 'Public',
  PRIVATE: 'Password Protected'
}

export const USER_TYPE = {
  REGULAR_USER: 'Обычный пользователь',
  ADMIN: 'Admin',
  SUPER_ADMIN: 'Super Admin'
}

export const PROBLEM_PERMISSION = {
  NONE: 'None',
  OWN: 'Own',
  ALL: 'All'
}

export const STORAGE_KEY = {
  AUTHED: 'authed',
  PROBLEM_CODE: 'problemCode',
  languages: 'languages'
}

export function buildProblemCodeKey (problemID, contestID = null) {
  if (contestID) {
    return `${STORAGE_KEY.PROBLEM_CODE}_${contestID}_${problemID}`
  }
  return `${STORAGE_KEY.PROBLEM_CODE}_NaN_${problemID}`
}

export const GOOGLE_ANALYTICS_ID = 'UA-111499601-1'
