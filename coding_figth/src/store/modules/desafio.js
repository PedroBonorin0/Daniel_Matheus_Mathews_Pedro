export default {
  state() {
    return {
      desafios: [
        {
          id: 1,
          dificuldade: 1,
          pergunta: 'Pergunta1',
          opcoesResposta: [{id:1, resposta:'AAAAAA'}, {id:2, resposta:'B'}, {id:3, resposta:'C'}, {id:4, resposta:'D'}],
          respostaCorreta: 1,
          dica: 'Resposta com id 1 : A',
        },
        {
          id: 2,
          dificuldade: 1,
          pergunta: 'Pergunta2',
          opcoesResposta: [{id:1, resposta:'A'}, {id:2, resposta:'BBBBBBBBBBB'}, {id:3, resposta:'C'}, {id:4, resposta:'D'}],
          respostaCorreta: 2,
          dica: 'Resposta com id 2 : B',
        },
        {
          id: 3,
          dificuldade: 1,
          pergunta: 'Pergunta3',
          opcoesResposta: [{id:1, resposta:'A'}, {id:2, resposta:'B'}, {id:3, resposta:'CCCCCCCCCCCCCC'}, {id:4, resposta:'D'}],
          respostaCorreta: 3,
          dica: 'Resposta com id 3 : C',
        },
        {
          id: 4,
          dificuldade: 2,
          pergunta: 'Pergunta4',
          opcoesResposta: [{id:1, resposta:'A'}, {id:2, resposta:'BBBBBBBBBBB'}, {id:3, resposta:'C'}, {id:4, resposta:'D'}],
          respostaCorreta: 2,
          dica: 'Resposta com id 2 : BBBBBBBBBBB',
        },
        {
          id: 5,
          dificuldade: 2,
          pergunta: 'Pergunta5',
          opcoesResposta: [{id:1, resposta:'A'}, {id:2, resposta:'BBBBBBBBBBB'}, {id:3, resposta:'C'}, {id:4, resposta:'D'}],
          respostaCorreta: 2,
          dica: 'Resposta com id 2 : BBBBBBBBBBB',
        },
        {
          id: 6,
          dificuldade: 2,
          pergunta: 'Pergunta6',
          opcoesResposta: [{id:1, resposta:'A'}, {id:2, resposta:'BBBBBBBBBBB'}, {id:3, resposta:'C'}, {id:4, resposta:'D'}],
          respostaCorreta: 2,
          dica: 'Resposta com id 2 : BBBBBBBBBBB',
        },
        {
          id: 7,
          dificuldade: 3,
          pergunta: 'Pergunta7',
          opcoesResposta: [{id:1, resposta:'A'}, {id:2, resposta:'B'}, {id:3, resposta:'CCCCCCCCCCCCCC'}, {id:4, resposta:'D'}],
          respostaCorreta: 3,
          dica: 'Resposta com id 3 : CCCCCCCCCCCCCC',
        },
        {
          id: 8,
          dificuldade: 3,
          pergunta: 'Pergunta8',
          opcoesResposta: [{id:1, resposta:'A'}, {id:2, resposta:'B'}, {id:3, resposta:'CCCCCCCCCCCCCC'}, {id:4, resposta:'D'}],
          respostaCorreta: 3,
          dica: 'Resposta com id 3 : CCCCCCCCCCCCCC',
        },
        {
          id: 9,
          dificuldade: 3,
          pergunta: 'Pergunta9',
          opcoesResposta: [{id:1, resposta:'A'}, {id:2, resposta:'B'}, {id:3, resposta:'CCCCCCCCCCCCCC'}, {id:4, resposta:'D'}],
          respostaCorreta: 3,
          dica: 'Resposta com id 3 : CCCCCCCCCCCCCC',
        },
      ],
    };
  },
  mutations: {
    // registerCoach(state, payload) {
    //   state.coaches.push(payload);
    // },
  },
  actions: {
    // async registerCoach(context, payload) {
    //   const { userId } = context.rootGetters;

    //   const coachData = {
    //     id: userId,
    //     firstName: payload.first,
    //     lastName: payload.last,
    //     description: payload.desc,
    //     hourlyRate: payload.rate,
    //     areas: payload.areas,
    //   };

    //   const { token } = context.rootGetters;

    //   await axios.put(
    //     `https://vue-course-http-82d72-default-rtdb.firebaseio.com/coaches/${userId}.json?auth=${token}`,
    //     JSON.stringify(coachData),
    //   );

    //   context.commit('registerCoach', coachData);
    // },
  },
  getters: {
    desafios(state) {
      return state.desafios;
    },
  },
  shortRespostas:{

  }
};
