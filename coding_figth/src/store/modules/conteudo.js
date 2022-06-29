export default {
  state() {
    return {
      conteudos: [
        {
          id: 1,
          nome: 'Condicionais',
          contexto: 'Contexto aqui 1!',
        },
        {
          id: 2,
          nome: 'Loop',
          contexto: 'Contexto aqui 2!',
        },
        {
          id: 3,
          nome: 'String',
          contexto: 'Contexto aqui 3!',
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
    conteudos(state) {
      return state.conteudos;
    },
  },
};
