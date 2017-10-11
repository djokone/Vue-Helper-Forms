<script>
  // createForm
  // createInput = function (obj, create, children) {
  //   obj()
  // }
  import dispatchRoot from './lib/FormUtils'
  import { initData, fetchInputs, grouped, getName, getType } from './lib/initHelper'
  import { isEmpty, cloneDeep, find } from 'lodash'

  export default({
    name: 'helperForm',
    render (h) {
      return dispatchRoot(this, h)
    },
    data () {
      return {
        localData: {},
        success: true,
        response: {}
      }
    },
    props: {
      deep: {
        default: 0
      },
      reset: {
        default: false
      },
      tag: {
        default: 'div',
        type: [String]
      },
      root: {
        default: true,
        type: [Boolean]
      },
      index: {
        default: false
      },
      parent: {
        default: false
      },
      name: {
        default: false
      },
      multiple: {
        default: false
      },
      new: {
        default: false
      },
      inputs: {
        type: [Array, Object]
      },
      data: {
        default: function () {
          // return {}
          return initData(this)
        }
      }
    },
    created () {
      this.downData()
    },
    computed: {
      validate () {
        if (this.error && !this.success) {
          return false
        } else {
          return true
        }
      }
    },
    methods: {
      downData (data) {
        data = data || cloneDeep(this.data)
        this.$set(this, 'localData', data)
        // this.localData = cloneDeep(this.data)
        // this.localData = cloneDeep(this.data)
      },
      upInput (key, value, childs = []) {
        let newChild = []
        this.$set(this.localData, key, value)
        // this.localData[key] = value
        if (this.root) { // if is the last parent
          // this.$off('input')
          this.$emit('input', key, value, childs)
          this.$emit('updated', this.localData, false, false)
        } else {
          newChild.push(this.name)
          if (this.index !== false) {
            newChild.push(this.index)
          } else {
            newChild.push('new')
          }
          if (isEmpty(childs)) {
            childs = newChild
          } else {
            childs = [...newChild, ...childs]
          }
          // this.$off('input')
          this.$emit('upInput', key, value, this.index, childs)
          this.$emit('upForm', key, value, this.index, childs)
        }
      },
      mergeParents (parents) {
        if (this.index !== false) {
          parents = [this.name, this.index, ...parents]
        } else {
          parents = [this.name, ...parents]
        }
        return parents
      },
      upForm (key, value, index, parents) {
        if (this.root) {
          let newVal = {}
          newVal = {
            key,
            value
          }
          this.$emit('updated', this.localData, newVal, parents)
        } else {
          parents = this.mergeParents(parents)
          this.$emit('upForm', key, value, this.index, parents)
        }
      },
      btnSuccessCallback (behavior, change, parents, callback) {
        if (this.new) {
          this.resetForm()
        }
        if (typeof callback === 'function') {
          callback()
        }
      },
      btnErrorCallback (behavior, change, parents, callback) {
        if (typeof callback === 'function') {
          console.log('error btn')
          callback()
        }
      },
      beforeUpButton (event, behavior, change, parents, success = false, error = false) {
        if (this.validate) {
          if (success === false && error === false) {
            this.upButton(event, behavior, change, parents, this.btnSuccessCallback, this.btnErrorCallback)
          } else {
            this.$emit('upButton', event, behavior, change, parents, success, error)
          }
        } else {
        }
      },
      upButton (event, behavior, change = this.localData, parents = this.name, success, error, deepPropagation = -1) {
        let successCallback
        deepPropagation++
        let that = this
        console.log(this.root)
        console.log(deepPropagation)
        if (deepPropagation === 0) {
          if (behavior === 'add') {
            console.log(parents)
            console.log(this.name)
            console.log(change)
            successCallback = function (callback) {
              that.addLocalData(change, parents)
              if (typeof callback === 'function') {
                callback()
              }
              success()
            }
          }
          if (behavior === 'del') {
            successCallback = function (callback) {
              console.log(parents)
              // that.delLocalData()
            }
          }
        }
        if (this.root) { // When the event is propagate until the root
          console.log('is on rooot')
          if (Array.isArray(behavior)) {
            behavior = behavior[0]
          }
          if (this.hasToSendCallbackInside(behavior)) {
            if (this.validate) {
              success()
            } else {
              error()
            }
          } else {
            this.$emit(behavior, success, error, event, change, this.localData, parents)
          }
        } else {
          if (typeof successCallback === 'function') {
            this.$emit('upButton', event, behavior, change, parents, successCallback, error, deepPropagation)
          }

          this.$emit('upButton', event, behavior, change, parents, success, error, deepPropagation)
        }
      },
      resetForm () {
        let inputDefaultValue = fetchInputs(this.inputs)
        this.$set(this, 'localData', inputDefaultValue)
      },
      addLocalData (data, parent) {
        let self = this
        let localData = cloneDeep(data)
        if (!Array.isArray(self.localData[parent])) {
          self.$set(self.localData, parent, [localData])
        } else {
          self.localData[parent].push(localData)
        }
      },
      haveNew (input) {
        if (input.new) {
          return input.new
        } else {
          return true
        }
      },
      hasToSendCallbackInside (behavior) {
        if (Array.isArray(behavior)) {
          behavior = behavior[0]
        }
        return isEmpty(find(this.$listeners, (v, k) => {
          return k === behavior
        }))
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
        let value = this.localData
        return value[this.getName(input)]
      },
      getNew (input) {
        if (typeof input.new === 'boolean') {
          return input.new
        } else {
          return true
        }
      },
      getBehaviors (input) {
        if (this.getType(input) === 'btn' && !isEmpty(input.behavior)) {
          if (typeof input.behavior === 'string') {
            return [input.behavior]
          } else {
            return input.behavior
          }
        } else { return false }
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
      deep: true,
      data (newVal) {
        this.downData(newVal)
      }
    }
  })
</script>
