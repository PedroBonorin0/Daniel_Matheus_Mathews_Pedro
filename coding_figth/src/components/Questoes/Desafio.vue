<template>
	<div>
		<h1>Questao: {{id}}</h1>
		<h2>Pergunta:<br> {{pergunta}}</h2>
		<!-- <h2>Respostas {{opcoesResposta}}</h2> -->
		<button id='{{i.id}}' v-for="i in opcoesResposta" @click="handleResposta(i)">{{i.resposta}}</button>
	</div>
</template>

<script>
	import { mapGetters } from "vuex";

	export default {
		name: "Desafio",
		components: {
		},
		methods: {
			handleResposta(args) {
				console.log(args.id == this.respostaCorreta);
			},
		},
		computed: {
			...mapGetters(["desafios"]),
		},
		mounted(){
			this.id = this.desafios[0].id;
			this.pergunta = this.desafios[0].pergunta;
			this.opcoesResposta = this.desafios[0].opcoesResposta;
			this.respostaCorreta = this.desafios[0].respostaCorreta;
		},
		data() {
			return {
				id: -0,
				pergunta: "",
				opcoesResposta: "",
				respostaCorreta: ""
			};
		},
	};
</script>
