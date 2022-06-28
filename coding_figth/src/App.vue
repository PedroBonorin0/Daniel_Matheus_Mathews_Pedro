<template>
  <div class="geral">
    <NavBar/>
    <router-view/>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';

export default {
  components: {
    NavBar,
  },
};
</script>
<style>
* {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
}

.geral {
  background: #bedadf;
  height: 100vh;
}
</style>
