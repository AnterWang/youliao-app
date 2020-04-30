import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import user from './user'
import launch from './launch'
import system from './system'
import location from './location'
import news from './news'

const store = new Vuex.Store({
	modules: {
		launch,
		system,
		location,
		user,
		news
	}
})

export default store
