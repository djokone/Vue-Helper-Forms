<script>
  // createForm
  // createInput = function (obj, create, children) {
  //   obj()
  // }
  import dispatchRoot from './lib/FormUtils'

  export default({
    render (h) {
      return dispatchRoot(this, h)
    },
    props: {
      tag: {
        default: 'div',
        type: [String]
      },
      inputs: {
        type: [Array, Object]
      },
      root: {
        default: true,
        type: [Boolean]
      }
    },
    computed: {
    },
    methods: {
      hasForms (input) {
        return typeof input.forms !== 'undefined'
      },
      hasInputs (input) {
        return typeof input.inputs !== 'undefined'
      },
      hasToBeGroup (input) {
        if (input.type === 'groupe') {
          return false
        } else if (this.hasForms(input)) {
          return true
        }
      },
      getInputs (input) {
        if (this.hasForms) {
          return this.forms
        } else {
          return this.inputs
        }
      },
      getPlaceholder (input) {
        if (typeof input.placeholder === 'undefined') {
          return input.name
        } else {
          return input.placeholder
        }
      },
      getName (input) {
        return input.name
      },
      getLabel (input) {
        if (typeof input.label === 'undefined') {
          return input.name
        } else {
          return input.label
        }
      },
      getType (input) {
        if (typeof input.forms !== 'undefined') {
          return 'form'
        } else if (typeof input.type !== 'undefined') {
          return input.type
        } else {
          return 'text'
        }
      }
    }
  })
</script>
