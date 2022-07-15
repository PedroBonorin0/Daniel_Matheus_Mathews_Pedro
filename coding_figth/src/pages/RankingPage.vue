<template>
  <BaseLoading v-if="loading" />
  <div class="ranking" v-else>
    <Ranking />
  </div>
</template>

<script>
import Ranking from '@/components/Ranking.vue';

import { mapActions } from 'vuex';

export default {
  name: 'RankingPage',
  data() {
    return {
      loading: false,
    };
  },
  components: {
    Ranking,
  },

  async created() {
    this.loading = true;
    await this.setUsers();
    this.loading = false;
  },

  methods: {
    ...mapActions(['setUsers']),
  },
};
</script>

<style>
</style>
