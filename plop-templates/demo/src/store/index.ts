import { createStore } from 'vuex'

const state = () => {
    return {
        count: 0
    }
}

const store = createStore({
    state
})

export type State = typeof state

export default store
