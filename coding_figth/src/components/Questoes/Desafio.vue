<template>
	<div>
		<h1>Questao: {{id}}</h1>
		<h2>Pergunta:<br> {{pergunta}}</h2>
		<button v-for="i in opcoesResposta" @click="handleResposta(i)">{{i.resposta}}</button>
	</div>
</template>

<script>
	import { mapGetters } from "vuex";

	export default {
		name: "Desafio",
		components: {
		},
		methods: {
			handleResposta(opcao) {
				console.log(opcao.id == this.respostaCorreta);
			},
			shortRespostas(args){
				for(var i=0;i<args.length/2 + 1;i++){
					var aux = Math.floor(Math.random()*(args.length))
					var i_aux = this.opcoesResposta[i]
					this.opcoesResposta[i] = this.opcoesResposta[aux]
					this.opcoesResposta[aux] = i_aux
				}
				for(var i=0;i<args.length;i++){
					console.log(this.opcoesResposta[i])
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
