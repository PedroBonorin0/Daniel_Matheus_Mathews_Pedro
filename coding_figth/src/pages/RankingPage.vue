<template>
  <div class="ranking">
    <Ranking></Ranking>
  </div>
</template>

<script>
import Ranking from '@/components/Ranking.vue';

import { mapGetters } from 'vuex';
import axios from 'axios';

export default {
  name: 'RankingPage',
  data() {
    return {
    };
  },
  components: {
    Ranking,
  },
  created() {
  },
  methods: {
  },
  mounted() {
  },
  computed: {
  },
};
</script>

<style>
</style>
