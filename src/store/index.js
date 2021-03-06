import Vue from 'vue'
import Vuex from 'vuex'

import gEducationModule from './modules/genderEducation/index'
import gHdiModule from './modules/genderHdi/index'
import gHealthModule from './modules/genderHealth/index'
import gIncomeModule from './modules/genderIncome/index'
import gLaboutModule from './modules/genderLabour/index'
import gRatioModule from './modules/genderRatio/index'

import hdiModule from './modules/hdi/index'
import inequalityModule from './modules/inequality/index'
import mainHdiModule from './modules/mainHdi/index'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    hdiModule,
    mainHdiModule,
    gEducationModule,
    gHdiModule,
    gHealthModule,
    gIncomeModule,
    gLaboutModule,
    gRatioModule,
    inequalityModule
  },

  state: {
    selectedCountry: 'global',
    count: 4
  },
  mutations: {
    increment(state) {
      state.count++
    },

    updateCountry(state, payload) {
      state.selectedCountry = payload
    },
  }
})