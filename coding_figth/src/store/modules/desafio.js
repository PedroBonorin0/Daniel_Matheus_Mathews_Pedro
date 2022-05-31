export default {
  state() {
    return {
      desafios: [
        {
          id: 1,
          dificuldade: 1,
          pergunta: 'Questionario',
          opcoesResposta: [{id:1, resposta:'A'}, {id:2, resposta:'B'}, {id:3, resposta:'C'}, {id:4, resposta:'D'}],
          respostaCorreta: 1,
          dica: 'Resposta com id 1 : A',
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
