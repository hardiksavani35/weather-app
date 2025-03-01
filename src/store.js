import { createStore } from 'vuex';

const store = createStore({
    state() {
        return {
            loader: false
        };
    },
    mutations: {
        setLoader(state, status) { 
            state.loader = status;
        }
    },
    actions: {
        setLoader({ commit }, status) {
            commit("setLoader", status);
        }
    }
});

export default store;