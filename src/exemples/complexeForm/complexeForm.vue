<style>
</style>
<template>
  <div>
    <img src="../../assets/logo-vue-helper-forms2.png" alt="">
    <h1>Complexe formulaire</h1>
    <helperForm
      :inputs="inputs"
      class="test"
      :data="data"
      @add="add"
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
      add (success, error, event, change, parents) {
        // console.log(parents)
        success()
      },
      // input (key, value, da) {
      // },
      update (data, newVal, childs) {
        // console.log(childs)
      }
    },
    components: {
      helperForm
    }
  })
</script>
