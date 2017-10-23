<template>
  <div id="app">
    <navigate>
    </navigate>
    <router-view></router-view>
  </div>
</template>

<script>
import navigate from './components/nav'
import './styles/app.sass'
export default {
  name: 'app',
  components: {
    navigate
  }
}
</script>
