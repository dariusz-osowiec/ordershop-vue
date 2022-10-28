<template>
    <!--
      Popup logowania/rejestracji, który wyświetlany zostanie wyświetlany za pomocą teleportu.
    -->
    <div style="min-width: 60vw;">
        <LoginDataComponent @register="register" @login="login"></LoginDataComponent>
        <footer>
            <div class="div-line widen-lines" style="width: 100%"></div>
            <div class="small-divider"></div>
            <button class="button-cancel" @click="this.$emit('close')" style="height: 40px; width: 100px">
                ZAMKNIJ
            </button>
        </footer>
    </div>
</template>

<script>
import LoginDataComponent from './LoginDataComponent.vue';

export default {
    name: 'LoginModalComponent',
    components: {
        LoginDataComponent
    },
    data() {
        return {
            loginObject: {},
            registerObject: {}
        }
    }, 
    methods: {
        register(registerObject) {
            this.registerObject = registerObject;
            this.$emit('register', this.registerObject);
        },
        login(loginObject) {
            this.loginObject = loginObject;
            this.$emit('login', loginObject);
        }
    }
}
</script>