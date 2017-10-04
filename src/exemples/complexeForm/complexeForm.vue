<style>
</style>
<template>
  <div>
    <h1>Complexe formulaire</h1>
    <helperForm
      :inputs="inputs"
      class="test"
      :data="data"
      @add="add"
      @updated="update"
      @input="input"
    >
    </helperForm>
  </div>
</template>

<script>
  import produitEditForm from './produitEdit'
  import addNewModel from './addNewModel'
  import helperForm from '@/HelpersForm'
  import data from './data'
  import _ from 'lodash'

  export default({
    name: 'produitEdit',
    data () {
      return {
        isEmpty: _.isEmpty,
        newModel: {
        },
        data,
        localProduit: {},
        btns: [
          {
            name: 'Enregistrer'
          },
          {
            name: 'Reset'
          }
        ],
        newModelInputs: addNewModel,
        inputs: produitEditForm
      }
    },
    created () {
    },
    methods: {
      add (event, data) {
        console.log(event)
        console.log(data)
      },
      input (key, value, da) {
        console.log(key)
        console.log(value)
        console.log(da)
      },
      update (data, newVal, childs) {
        // console.log(data)
        // console.log(newVal)
        // console.log(childs)
      }
    },
    components: {
      helperForm
    }
  })
</script>
