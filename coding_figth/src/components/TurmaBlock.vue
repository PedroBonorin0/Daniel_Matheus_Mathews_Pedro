<template>
  <div class="block-turma">
      <h2>{{ turma.nome }}</h2>
      <button @click="removeTurma" class="btn-remove">&#x2718;</button>
  </div>
</template>

<script>
export default {
  props: {
    turma: { type: Object, required: true },
  },
  methods: {
    removeTurma() {
      this.$emit('delete-turma', this.turma);
    },
  },
};
</script>

<style scoped>
  .block-turma {
    width: 200px;
    height: 40px;
    border: 1px solid #555;
    margin: 2px;
    border-radius: 4px;
    box-shadow: 1px 1px 2px #555;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .block-turma h2 {
    width: 80%;
  }

  .btn-remove {
    background: #b44646;
    color: white;
    border: none;
    width: 10%;
    height: 20px;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  .btn-remove:hover {
    background: #9a3b3b;
  }
</style>
