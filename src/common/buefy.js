import Vue from 'vue'
import Buefy from 'buefy'
//Vue.use(Buefy)
import Icon from '@/components/lib/Icon/Icon'

Vue.component(Buefy.Autocomplete.name, Buefy.Autocomplete)
Vue.component(Buefy.Modal.name, Buefy.Modal)
Vue.component(Buefy.Field.name, Buefy.Field)
Vue.component(Buefy.Input.name, Buefy.Input)
Vue.component(Buefy.Tag.name, Buefy.Tag)
Vue.component(Buefy.Select.name, Buefy.Select)
// Use vue-material-design svg icons
Buefy.Pagination.components = {
  [Buefy.Icon.name]: Icon
}
Vue.component(Buefy.Pagination.name, Buefy.Pagination)
