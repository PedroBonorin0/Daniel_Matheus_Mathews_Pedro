<template>
  <div class="geral" v-if="!loading">
    <NavBar/>
    <router-view/>
  </div>
  <BaseLoading v-else />
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      loading: false,
    };
  },
  components: {
    NavBar,
  },

  created() {
    this.iniciaProjeto();
  },

  methods: {
    ...mapActions(['autoLogin', 'loginFinished']),

    async iniciaProjeto() {
      this.loading = true;
      await this.autoLogin();
      this.loading = false;
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
