<template>
    <div id="login">
        <h1>Login</h1>
        <input type="text" name="username" v-model="input.username" placeholder="Username" />
        <input type="password" name="password" v-model="input.password" placeholder="Password" />
        <button type="button" v-on:click="login()">Login</button>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    //import alert from '../components/alert.vue'

    export default {
        name: 'Login',
        data() {
            return {
                authenticated: false,
                input: {
                    username: "",
                    password: ""
                }
            }
        },
         mounted() {
            if(!this.authenticated) {
                this.$router.replace({ name: "login" });
            }
        },
        methods: {
            login() {
                console.log(this.jogadores)
                if(this.input.username != "" && this.input.password != "") {
                    console.log(this.input.username.cpf)
                    if(this.input.username == this.$parent.mockAccount.username && this.input.password == this.$parent.mockAccount.password) {
                        this.$emit("authenticated", true);
                        this.$router.replace({ name: "secure" });
                    } else {
                        console.log("O nome de usuário e / ou senha está incorreto.");
                    }
                } else {
                    console.log("Um nome de usuário e / ou senha não foi informado.");
                }
            }
        },
        computed: {
            ...mapGetters(['jogadores'])
        }
    }
</script>

<style scoped>
    #login {
        width: 500px;
        border: 1px solid #CCCCCC;
        background-color: #FFFFFF;
        margin: auto;
        margin-top: 200px;
        padding: 20px;
    }
</style>