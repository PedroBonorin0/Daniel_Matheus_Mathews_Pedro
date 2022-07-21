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

  created() {
    this.iniciaProjeto();
  },

  methods: {
    ...mapActions(['autoLogin', 'loginFinished']),

    async iniciaProjeto() {
      await this.autoLogin();
    },
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
  min-height: 100vh;
}

</style>
