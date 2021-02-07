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
    months: {
      farvardin: 1,
      ordibehesht: 2,
      khordad: 3,
      tir: 4,
      mordad: 5,
      shahrivar: 6,
      mehr: 7,
      aban: 8,
      azar: 9,
      dey: 10,
      bahman: 11,
      esfand: 12
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
    },
    payrollTypes: {
      excel: 'Excel',
      pdf: 'Pdf',
      image: 'Image'
    },
    contractTypes: {
      excel: 'Excel',
      pdf: 'Pdf',
      image: 'Image'
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
    monthsArray (state) {
      const array = Object.entries(state.months).map(([key, value]) => {
        const translate = APP_CONFIG.locales[APP_CONFIG.locale].enums.months[key]
        return {
          value: value,
          text: translate
        }
      })
      return array
    },
    payrollTypesArray (state) {
      const array = Object.entries(state.payrollTypes).map(([key, value]) => {
        const translate = APP_CONFIG.locales[APP_CONFIG.locale].enums.payrollsTypes[key]
        return {
          value: value,
          text: translate
        }
      })
      return array
    },
    contractTypesArray (state) {
      const array = Object.entries(state.contractTypes).map(([key, value]) => {
        const translate = APP_CONFIG.locales[APP_CONFIG.locale].enums.contractsTypes[key]
        return {
          value: value,
          text: translate
        }
      })
      return array
    }
  }
}
