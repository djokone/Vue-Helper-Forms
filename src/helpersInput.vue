<script>
  import { isEmpty } from 'lodash'
  import inputDispatcher from '@/lib/InputUtils'
  // import tinymce from 'tinymce'

  export default({
    render (h) {
      return inputDispatcher(this, h)
    },
    props: {
      name: {
        type: [String]
      },
      label: {
        default: this.name
      },
      type: {
        default: 'text'
      },
      placeholder: {
        default: 'Put your' + this.type + 'here !'
      }
    },
    computed: {
      getValue () {
        return this.value
      },
      isPassword () {
        return this.type === 'password'
      },
      isInput () {
        return this.type === 'text'
      },
      isTextarea () {
        return this.type === 'textarea'
      },
      isTinymce () {
        return this.type === 'tinymce'
      },
      classError () {
        if (this.getError) {
          return 'hasError'
        }
      },
      mylabel () {
        if (this.label) {
          return this.label
        } else {
          return this.name
        }
      },
      getError () {
        if (!isEmpty(this.localErrors)) {
          return this.localErrors
        } else {
          return false
        }
      }
    },
    components: {
      // tinymce
    }
  })
</script>
