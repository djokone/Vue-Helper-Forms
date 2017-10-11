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
        this.$set(this.localData, key, value)
        // this.localData[key] = value
        if (this.root) { // if is the last parent
          // this.$off('input')
          this.$emit('input', key, value, childs)
          this.$emit('updated', this.localData, false, false)
        } else {
          childs = this.mergeParents(childs)
          // this.$off('input')
          this.$emit('upInput', key, value, this.index, childs)
          this.$emit('upForm', key, value, this.index, childs)
        }
      },
      /**
       * Merge new parents into an array
       *
       * @param      {Array}  parents  The parents to merge
       * @param      {Boolean}  wantRoot  To put root at the begining of the array
       *
       * return     {Array} An array of parents with the new parents
       */
      mergeParents (parents, wantRoot = false) {
        let newParents = []
        let name = this.name
        if (!name && wantRoot) {
          name = 'root'
        }
        if (name) {
          newParents.push(name)
        }
        if (this.index !== false) {
          newParents.push(this.index)
        } else if (this.new) {
          newParents.push('new')
        }
        if (isEmpty(parents) && !isEmpty(newParents)) {
          parents = newParents
        } else {
          parents = [...newParents, ...parents]
        }
        return parents
      },

      /**
       * Back up the form event to the root when updates happen
       *
       * @param      {String}  key      The name of this input how changed
       * @param      {String}  value    New value of this input
       * @param      {Number}  index    Index of the instance
       * @param      {Array}  parents   List of all the parents of the form
       *
       * @emits {update} emit update when it's root.
       * @emits {upForm} emit upForm in all the parents inside the component.
       */
      upForm (key, value, index, parents) {
        if (this.root) {
          let newVal = {}
          newVal = {
            key,
            value
          }
          this.$emit('update', this.localData, newVal, parents)
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
      beforeUpButton (event, behavior, change, parents = [], success = false, error = false) {
        if (this.validate) {
          if (success === false && error === false) {
            this.upButton(event, behavior, this.localData, parents, this.btnSuccessCallback, this.btnErrorCallback)
          } else {
            this.$emit('upButton', event, behavior, change, parents, success, error)
          }
        } else {
          //  send error
        }
      },
      upButton (event, behavior, change = this.localData, parents = [], success, error, deepPropagation = -1) {
        let successCallback
        deepPropagation++
        let that = this
        parents = this.mergeParents(parents)
        if (deepPropagation === 1) {
          if (behavior === 'add') {
            successCallback = function (callback) {
              that.addLocalForm(change, parents)
              if (typeof callback === 'function') {
                callback()
              }
              success()
            }
          }
          if (behavior === 'del') {
            successCallback = function (callback) {
            }
          }
        }
        let finalSuccess = success
        if (typeof successCallback === 'function') {
          finalSuccess = successCallback
        }
        if (this.root) { // When the event is propagate until the root
          if (Array.isArray(behavior)) {
            behavior = behavior[0]
          }
          if (this.hasToSendCallbackInside(behavior)) {
            if (this.validate) {
              finalSuccess()
            } else {
              error()
            }
          } else {
            this.$emit(behavior, finalSuccess, error, event, change, parents, this.localData)
          }
        } else {
          this.$emit('upButton', event, behavior, change, parents, finalSuccess, error, deepPropagation)
        }
      },
      resetForm () {
        let inputDefaultValue = fetchInputs(this.inputs)
        this.$set(this, 'localData', inputDefaultValue)
      },
      addLocalForm (data, parents) {
        let self = this
        let parent = parents[2] // Take the last parent
        if (parents.length <= 2) { parent = parents[0] }
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
