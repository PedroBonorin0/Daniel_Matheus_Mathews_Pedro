<template>
	<div class="conteudo">
		<div class="questao">
			Questao: {{id}}
		</div>
		<div class="pergunta">
			Pergunta:<br> {{pergunta}}
		</div>
		<div class="container-botoes">
			<button class="opcoes" v-for="i in opcoesResposta" @click="handleResposta(i)">{{i.resposta}}</button>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from "vuex";

	export default {
		name: "Desafio",
		// Referece ao modulo onde o desafio está provavelmente necessitaria de alterar o store
		modulo:undefined, 
		components: {
		},
		methods: {
			/**
			 * Verifica a resposta de acordo com o que o usuario aperta o botão
			 * @param {object} Opcao Recebe como parametro as informações do botão preciondo, ID e conteudo
			 */
			handleResposta(opcao) {
				if(opcao.id == this.respostaCorreta){
					//Dano no enimigo
					this.calcDano(true);
					// console.log("Acertou");
				}else{
					// Sofre dano
					this.calcDano(false);
					// console.log("Errou");
				}
			},
			/**
			 * Randomiza as opções de respostas
			 * @param {object} Opcoes Recebe como parametro as opções de respostas da questão	
			 */
			shortRespostas(opcoes){
				for(var i=0;i<opcoes.length/2 + 1;){
					var aux = Math.floor(Math.random()*(opcoes.length))
					if( aux != i){
						var i_aux = this.opcoesResposta[i]
						this.opcoesResposta[i] = this.opcoesResposta[aux]
						this.opcoesResposta[aux] = i_aux
						i++;
					}
				}
			},
			/**
			 * Calcula o dano sofrido de acordo com a dificuldade da questão.
			 * 
			 * ◦ Se for mais facil a questão caso o usuario erre ele toma mais dano caso acerte da menos dano.
			 * 
			 * ◦ Se for normal a questão caso o usuario erre ele toma dano caso acerte da dano.
			 * 
			 * ◦ Se for dificil a questão caso o usuario erre ele toma pouco dano caso acerte da menos dano.
			 * 
			 * @param {boolean} Verificador se o usuario acertou a pergunta
			 */
			calcDano(verificador){
				const dano_base = 10;// dano
				const incremento = 0.2;// Incremento no dano (dificuldade)
				if(this.dificuldade <= 3){//Facil
					if(verificador){
						//dano_base*(1-incremento) //Dano dado caso acerte
					}else{
						//dano_base*(1+incremento) //Dano sofrido caso erre
					}
				}else if(this.dificuldade <= 7){//Medio
					//dano_base*(1) //Dano sofrido ou dado
				}else{//Dificil
					if(verificador){
						//dano_base*(1+incremento) //Dano dado
					}else{
						//dano_base*(1-incremento) //Dano sofrido 
					}
				}
			}	
		},
		computed: {
			...mapGetters(["desafios"]),
		},
		mounted(){
			this.shortRespostas(this.opcoesResposta);
		},
		created(){
			this.id = this.desafios[0].id;
			this.pergunta = this.desafios[0].pergunta;
			this.opcoesResposta = this.desafios[0].opcoesResposta;
			this.respostaCorreta = this.desafios[0].respostaCorreta;
			this.dica = this.desafios[0].dica;
			this.dificuldade = this.desafios[0].dificuldade;
		},
		data() {
			return {
				id: -0,
				pergunta: "",
				opcoesResposta: "",
				respostaCorreta: "",
				dica: ""
			};
		},
	};
</script>
<style>
.conteudo{
	width: 100% auto;
	height: 100% auto;
	background: #ce9d9d;
}
.questao {
	width: 100%;
	margin: 0%;
	height: auto;
	color: black;
	font-size: 50px;
}
.pergunta {
	background: #bedadf;
}
.container-botoes {
  width: 100% auto;
  margin: 0% auto;
  height: 100% auto;
  display: grid;
  align-items: center;
  justify-items: center;
  grid-template-rows: repeat(3);
  grid-template-columns: 1fr 1fr;
}
.opcoes {
  /* text-align: center; */
  height: auto;
  font-size: 20px;
  margin: 16px;
  text-decoration: none;
  color: #ffffff;
  padding: 20px;
  background-color: #4531b8;
  width: auto;
  transition: 0.3s;
  cursor: pointer;
}
.opcoes:hover {
  background-color: #281e5f;
}
</style>