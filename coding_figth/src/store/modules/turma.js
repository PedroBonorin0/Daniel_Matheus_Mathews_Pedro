export default {
  state() {
    return {
      turmas: [
        {
          id: 1,
          nome: 'Turma 1',
          professor: 1,
          alunos: [1, 2, 3, 4],
          conteudos: [1, 2],
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
    turmas(state) {
      return state.turmas;
    },
  },
};
