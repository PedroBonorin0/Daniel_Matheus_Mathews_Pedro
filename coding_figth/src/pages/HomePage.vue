<template>
  <div class="principal">
    <h1>Coding Fight</h1>
    <div class="container-botoes">
      <router-link to="/game" class="item centralizado">Jogar</router-link>
      <router-link to="/instruction" class="item centralizado">Instruções</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  components: {
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  height: 100vh;
}
.container-botoes {
  width: 40%;
  margin: 10% auto;
  height: 100%;
  display: grid;
  align-items: center;
  justify-items: center;
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: 1fr 1fr;
  border: 1px solid #2b2b2b;
  border-radius: 5px;
}
.item {
  text-align: center;
  height: 20px;
  font-size: 20px;
  margin: 16px;
  text-decoration: none;
  color: #ffffff;
  padding: 20px;
  background-color: #CC5036;
  width: 200px;
  transition: 0.3s;
  cursor: pointer;
}
.item:hover {
  background-color: #b84831;
}
.centralizado {
  grid-column-start: 1;
  grid-column-end: 3;
}
</style>
