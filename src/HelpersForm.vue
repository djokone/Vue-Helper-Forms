<script>
  // createForm
  // createInput = function (obj, create, children) {
  //   obj()
  // }
  import dispatchRoot from './lib/FormUtils'
  import { initData, grouped, getName, getType } from './lib/initHelper'
  import { cloneDeep } from 'lodash'

  export default({
    render (h) {
      return dispatchRoot(this, h)
    },
    data () {
      return {
        localData: {}
      }
    },
    props: {
      tag: {
        default: 'div',
        type: [String]
      },
      root: {
        default: true,
        type: [Boolean]
      },
      cle: {
        default: false
      },
      parent: {
        default: false
      },
      name: {
        default: false
      },
      inputs: {
        type: [Array, Object]
      },
      data: {
        default: function () {
          return initData(this)
        }
      }
    },
    created () {
      this.upLocalData()
    },
    computed: {
    },
    methods: {
      upLocalData () {
        this.localData = cloneDeep(this.data)
      },
      upInput (key, value) {
        // console.log(this.localData[key])
        this.$emit('childUp')
        console.log(this.name)
        this.localData[key] = value
      },
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
      grouped (input) {
        return grouped(input)
      },
      getValue (input) {
        let value = this.data
        // if (this.name !== false && !this.root) {
        //   console.log(this.name)
        //   console.log(value)
        //   value = value[this.name]
        // }
        // if (this.cle !== false && !this.root) {
        //   console.log(this.getName(input))
        //   console.log(value)
        //   value = value[this.cle]
        // }
        return value[this.getName(input)]
      },
      getNew (input) {
        if (typeof input.new === 'boolean') {
          return input.new
        } else {
          return true
        }
      },
      getName (input, key = false) {
        return getName(input, key)
      },
      getLabel (input) {
        if (typeof input.label === 'undefined') {
          return input.name
        } else {
          return input.label
        }
      },
      getType (input) {
        return getType(input)
      }
    },
    watch: {
      data: {
        deep: true,
        handle: function (newVal, oldVal) {
          console.log(newVal)
        }
      }
    }
  })
</script>
