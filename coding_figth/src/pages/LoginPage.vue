<template>
  <div id="geral-login">
    <div id="botao-switch-tipo">
      <span class="label-switch">Login</span>
      <label class="switch" for="checkbox">
        <input type="checkbox" id="checkbox" @click.stop="loginMode = !loginMode">
        <span class="slider round"></span>
      </label>
      <span class="label-switch">Cadastro</span>
    </div>
    <BaseCard id="card-form">
      <form @submit.prevent="submitLogin" v-if="loginMode">
        <div class="linha-input">
          <label for="email">
            Email <br>
            <input id="email" type="email" placeholder="Digite seu email" v-model="emailLogin">
          </label>
        </div>

        <div class="linha-input">
          <label for="pass">
            Senha <br>
            <input id="pass" type="password" placeholder="Digite sua senha" v-model="senhaLogin">
          </label>
        </div>

        <BaseButton class="btn-submit">Entrar</BaseButton>
      </form>

      <form @submit.prevent="submitCadastro" v-else>
        <div class="linha-input">
          <label for="user">
            Nome de Exibição <br>
            <input
              type="text" id="user" placeholder="Digite o nome de exibição"
              v-model="nomeExibicao.value">
              <p class="msg-erro" v-if="!nomeExibicao.isValid">Nome não pode ser vazio</p>
          </label>
        </div>
        <div class="linha-input">
          <label for="email">
            Email <br>
            <input type="email" id="email" placeholder="Digite seu email"
            v-model="emailCadastro.value">
            <p class="msg-erro" v-if="!emailCadastro.isValid">Email deve ser válido</p>
          </label>
        </div>
        <div class="linha-input">
          <label for="pass">
            Senha <br>
            <input type="password" id="pass" placeholder="Digite sua senha"
            v-model="senhaCadastro.value">
            <p
              class="msg-erro"
              v-if="!senhaCadastro.isValid">Senha deve conter pelo menos 6 caracteres</p>
          </label>
        </div>
        <div class="linha-input">
          <label for="confirm">
            Confirme sua Senha <br>
            <input
              type="password" id="confirm" placeholder="Confirme sua senha"
              v-model="confirmaSenha.value">
              <p class="msg-erro" v-if="!confirmaSenha.isValid">As senhas devem ser iguais</p>
          </label>
        </div>

        <div id="botao-switch-user">
          <label class="switch-user" for="checkbox-user">
            <input type="checkbox" id="checkbox-user" @click.stop="isProfessor = !isProfessor">
            <span class="slider round"></span>
          </label>
          <span class="label-switch" v-if="isProfessor">Professor</span>
          <span class="label-switch" v-else>Aluno</span>
        </div>
        <BaseButton class="btn-submit">Cadastrar</BaseButton>
      </form>
    </BaseCard>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      emailLogin: '',
      senhaLogin: '',

      emailCadastro: {
        value: '',
        isValid: true,
      },
      senhaCadastro: {
        value: '',
        isValid: true,
      },
      confirmaSenha: {
        value: '',
        isValid: true,
      },
      nomeExibicao: {
        value: '',
        isValid: true,
      },
      isProfessor: false,

      loginMode: true,
      cadastroValido: true,
    };
  },

  methods: {
    ...mapActions(['signup']),
    submitLogin() {

    },

    submitCadastro() {
      this.verificaCadastro();
      if (this.cadastroValido) {
        const userData = {
          email: this.emailCadastro.value,
          senha: this.senhaCadastro.value,
          nomeUsuario: this.nomeExibicao.value,
          isProfessor: this.isProfessor,
        };

        // console.log(userData);
        this.signup(userData);
      }
    },

    verificaCadastro() {
      if (this.emailCadastro.value === '' || !this.emailCadastro.value.includes('@'))
        this.emailCadastro.isValid = false;

      if (this.nomeExibicao.value === '')
        this.nomeExibicao.isValid = false;

      if (this.senhaCadastro.value.length < 6)
        this.senhaCadastro.isValid = false;

      if (this.confirmaSenha.value === '' || this.confirmaSenha.value !== this.senhaCadastro.value)
        this.confirmaSenha.isValid = false;

      if (!this.emailCadastro.isValid || !this.nomeExibicao.isValid
         || !this.senhaCadastro.isValid || !this.confirmaSenha.isValid) {
        this.cadastroValido = false;

        setTimeout(() => {
          this.emailCadastro.isValid = true;
          this.senhaCadastro.isValid = true;
          this.confirmaSenha.isValid = true;
          this.nomeExibicao.isValid = true;
          this.cadastroValido = true;
        }, 3000);
      }
    },
  },
};
</script>

<style scoped>

#geral-login {
  text-align: center;
  margin: 0 auto;
  max-width: 25%;
}

#botao-switch-tipo {
  margin: 20px auto;
  width: 250px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

#botao-switch-user {
  margin: 10px 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
#botao-switch-user .label-switch {
  margin-left: 6px;
}

.linha-input {
  line-height: 24px;
  display: flex;
  flex-direction: column;
  text-align: left;
  margin: 8px 0;
}

.linha-input .msg-erro {
  font-size: 12px;
  color: #bc2020;
}

.linha-input input {
  width: 95%;
  height: 24px;
  background: #eee;
  border: 0;
  border-radius: 4px;
  margin-top: 2px;
  padding: 2px 5px;
}

.btn-submit {
  margin-top: 15px;
}

/* Switch Button */
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #e87d7d;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

/* Switch Button USER*/
.switch-user {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

/* Hide default HTML checkbox */
.switch-user input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slide {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgb(232, 125, 125);
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

</style>
