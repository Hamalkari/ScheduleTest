import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import schedule from './schedule';

export default new Vuex.Store({
  modules: {
    schedule,
  },
});
