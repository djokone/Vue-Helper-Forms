<template>
  <div>
    <h1>Complexe formulaire</h1>
    <helperForm
      :inputs="inputs"
      :datas="localProduit"
      class="test"
    >
    </helperForm>
  </div>
</template>

<script>
  import produitEditForm from './produitEdit'
  import addNewModel from './addNewModel'
  import helperForm from '@/HelpersForm'
  import _ from 'lodash'

  export default({
    name: 'produitEdit',
    data () {
      return {
        isEmpty: _.isEmpty,
        newModel: {
        },
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
