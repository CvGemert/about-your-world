import Vue from 'vue'
import Vuex from 'vuex'

import hdiModule from './modules/hdi/index'
import mainHdiModule from './modules/mainHdi/index'

Vue.use(Vuex)

export default new Vuex.Store({
  namespaced: true,
  modules: {
    hdiModule,
    mainHdiModule
  },
})