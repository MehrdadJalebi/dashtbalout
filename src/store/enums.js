import APP_CONFIG from '@/config'
export default {
  namespaced: true,
  state: {
    userRoles: {
      admin: 'Admin',
      user: 'User'
    },
    genders: {
      male: 'Male',
      female: 'Female'
    },
    maritalStatuses: {
      single: 'Single',
      married: 'Married'
    },
    employeeStatuses: {
      normal: 'Normal',
      devoted: 'Devoted',
      martyrChild: 'MartyrChild',
      captive: 'Captive',
      armedForces: 'ArmedForces',
      otherClause14: 'OtherClause14',
      taxExemptCitizens: 'TaxExemptCitizens'
    },
    monthlyWorkTimeTypes: {
      hourly: 'Hourly',
      daily: 'Daily'
    }
  },
  getters: {
    userRoles (state) {
      return state.userRoles
    },
    genderArray (state) {
      const array = Object.entries(state.genders).map(([key, value]) => {
        const translate = APP_CONFIG.locales[APP_CONFIG.locale].enums.genders[key]
        return {
          value: value,
          text: translate
        }
      })
      return array
    },
    userRolesArray (state) {
      const array = Object.entries(state.userRoles).map(([key, value]) => {
        const translate = APP_CONFIG.locales[APP_CONFIG.locale].enums.userRoles[key]
        return {
          value: value,
          text: translate
        }
      })
      return array
    },
    maritalStatusesArray (state) {
      const array = Object.entries(state.maritalStatuses).map(([key, value]) => {
        const translate = APP_CONFIG.locales[APP_CONFIG.locale].enums.maritalStatuses[key]
        return {
          value: value,
          text: translate
        }
      })
      return array
    },
    employeeStatusesArray (state) {
      const array = Object.entries(state.employeeStatuses).map(([key, value]) => {
        const translate = APP_CONFIG.locales[APP_CONFIG.locale].enums.employeeStatuses[key]
        return {
          value: value,
          text: translate
        }
      })
      return array
    },
    monthlyWorkTimeTypesArray (state) {
      const array = Object.entries(state.monthlyWorkTimeTypes).map(([key, value]) => {
        const translate = APP_CONFIG.locales[APP_CONFIG.locale].enums.monthlyWorkTimeTypes[key]
        return {
          value: value,
          text: translate
        }
      })
      return array
    },
  }
}
