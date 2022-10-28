<template>
  <!--

     Popup z logowaniem i rejestracją.

    -->
  <div class="root">
    <teleport to="#loginBox">
      <div class="modal" v-if="isModalVisible">
        <LoginModalComponent @close="closeLoginModal" @register="register" @login="login"></LoginModalComponent>
      </div>
    </teleport>
  </div>
  <!--

    Menu nawigacji.    

  -->
  <nav class="navbar navbar-expand-sm navbar-light bg-white border-bottom box-shadow mb-3 sticky-top top-row"
    style="min-height: 80px">
    <div class="container">
      <router-link class="navbar-brand" style="font-size: 30px" to="/">Ordershop</router-link>
      <div class="row">
        <a type="button" class="nav-link text-dark col" @click="accountButtonClicked">
          <span class="material-symbols-outlined font-color" style="font-size: 60px">
            account_circle
          </span>
        </a>
        <span class="col" style="width: 10px;"></span>
        <router-link class="nav-link text-dark col" to="/basket"><span class="material-symbols-outlined font-color"
            style="font-size: 60px">shopping_basket</span></router-link>
      </div>
    </div>
  </nav>
  <div>
    <!--

      Okno do wyświetlania stron.

    -->
    <div class="container page-wrap">
      <router-view :serverAddress="server" @openLoginPopup="openLoginPopup"/>
    </div>
    <!--

      Stopka.

    -->
    <footer class="footer-pos">
      <div class="container" style="padding: auto">
        <router-link class="nav-link text-dark" to="/privacy"><span class="font-color" style="font-size: 25px">Polityka
            prywatności</span></router-link>
      </div>
    </footer>
  </div>
</template>

<script>
import LoginModalComponent from './components/LoginModalComponent.vue';

export default {
  data() {
    return {
      isModalVisible: false,
      server: "http://localhost:5214",
      isUserLogged: true
    };
  },
  components: { LoginModalComponent },
  methods: {
    //Otwarcie strony użytkownika. Jeżeli użytkownik nie jest zalogowany, otworzy się okienko z logowaniem/rejestracją.
    openLoginPopup() {
      this.isModalVisible = true;
    },
    //Kliknięcie ikony konta.
    accountButtonClicked() {
      if(!this.isUserLogged) {
        this.openLoginPopup();
      } else {
        this.$router.push('/account')
      }
    },
    //Zamknięcie popupu.
    closeLoginModal() {
      this.isModalVisible = false;
    },
    //Rejestracja.
    register() {

    },
    //Logowanie.
    login() {

    }
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.page-wrapp {
  position: relative;
  min-height: 100vh;
}

.footer-pos {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 2.5rem;
}
</style>
