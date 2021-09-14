import { Store } from 'vuex'
import { State } from '@/store/index'

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $store: Store<State>
  }
}
