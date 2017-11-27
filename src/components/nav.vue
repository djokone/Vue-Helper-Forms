<style lang="sass">

</style>

<template>
  <div class="nav">
    <ul class="menu">
      <li v-for="(value, key) in menu"><router-link :to="value" class="item">{{key}}</router-link></li>
    </ul>
  </div>
</template>

<script>
  export default ({
    name: 'navigation',
    data () {
      return {
        menu: {
          'Complexe form': {
            name: 'complexeForm'
          },
          'Form Generator': {
            name: 'formsGenerator'
          }
        }
      }
    }
  })
</script>
