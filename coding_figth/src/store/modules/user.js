export default {
  state() {
    return {
      users: [
        {
          id: 1,
          nome: 'Pedro',
          senha: '123123',
          cpf: '12345678901',
          turma: 1,
          isProfessor: false,
          pontosDesafios: [],
          totalPontos: 0,
        },
        {
          id: 2,
          nome: 'Daniel',
          senha: '321321',
          cpf: '09876543210',
          turma: 1,
          isProfessor: false,
          pontosDesafios: [],
          totalPontos: 0,
        },
        {
          id: 3,
          nome: 'Matheus',
          senha: '123123',
          cpf: '12332112332',
          turma: 1,
          isProfessor: false,
          pontosDesafios: [],
          totalPontos: 0,
        },
        {
          id: 4,
          nome: 'Mathews',
          senha: '321321',
          cpf: '12345612312',
          turma: 1,
          isProfessor: false,
          pontosDesafios: [],
          totalPontos: 0,
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
    users(state) {
      return state.jogadores;
    },
  },
};
