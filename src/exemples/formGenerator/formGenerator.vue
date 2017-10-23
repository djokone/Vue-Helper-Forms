<template>
  <div>
    <h1>Complexe formulaire</h1>
    <helperForm
      :inputs="inputs"
      class="test"
      @add="add"
    >
    </helperForm>
  </div>
</template>

<script>
  import formEdit from './formEdit'
  // import addNewModel from './addNewModel'
  import helperForm from '@/HelpersForm'
  // import data from './data'
  import _ from 'lodash'

  export default({
    name: 'formEdit',
    data () {
      return {
        isEmpty: _.isEmpty,
        newModel: {
        },
        // data,
        localProduit: {},
        btns: [
          {
            name: 'Enregistrer'
          },
          {
            name: 'Reset'
          }
        ],
        inputs: formEdit
      }
    },
    created () {
    },
    methods: {
      add (success, error, event, change, parents) {
        console.log(parents)
        success()
      },
      // input (key, value, da) {
      // },
      update (data, newVal, childs) {
        console.log(childs)
      }
    },
    components: {
      helperForm
    }
  })
</script>
