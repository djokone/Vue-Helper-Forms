import HelpersForm from './HelpersForm'
import HelpersInput from './helpersInput'
// import HelpersTinymce from './HelpersTinymce'

const vueHelperFormPlugin = {
  install (Vue, options) {
    Vue.component('helperForm', HelpersForm)
    Vue.component('helperInput', HelpersInput)
    // Vue.component('HelperTinymce', HelpersTinymce)
  }
}

export default vueHelperFormPlugin
