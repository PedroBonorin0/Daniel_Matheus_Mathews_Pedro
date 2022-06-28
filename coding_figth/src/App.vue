<template>
  <div class="geral">
    <NavBar/>
    <router-view/>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import { mapActions } from 'vuex';

export default {
  components: {
    NavBar,
  },

  mounted() {
    this.autoLogin();
  },

  methods: {
    ...mapActions(['autoLogin']),
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
