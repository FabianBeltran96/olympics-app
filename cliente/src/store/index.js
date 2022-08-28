import { createStore } from 'vuex'

export default createStore({
  state: {
    estaLogeado: !!localStorage.getItem("token"),


  },
  getters: {
    getEstaLogeado(state) {
      return state.estaLogeado

    }
  },
  mutations: {
    estaAutenticado(state) {
      state.estaLogeado = !!localStorage.getItem("token");
    },




  },
  actions: {
  },
  modules: {
  }
})
