<style>
</style>
<template>
  <div>
    <h1>Complexe formulaire</h1>
    <helperForm
      :inputs="inputs"
      class="test"
      :data="data"
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
    components: {
      helperForm
    }
  })
</script>
