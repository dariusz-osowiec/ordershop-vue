<template>
  <nav
    class="navbar navbar-expand-sm navbar-light bg-white border-bottom box-shadow mb-3 sticky-top top-row"
    style="min-height: 80px"
  >
    <div class="container">
      <router-link class="navbar-brand" style="font-size: 30px" to="/"
        >Tyks.pl</router-link
      >
      <div>
        <router-link class="nav-link text-dark" to="/basket"
          ><span class="material-symbols-outlined font-color" style="font-size: 60px"
            >shopping_basket</span
          ></router-link
        >
      </div>
    </div>
  </nav>
  <div>
    <div class="container page-wrap">
      <router-view :serverAddress="server" />
    </div>
    <footer class="footer-pos">
      <div class="container" style="padding: auto">
        <router-link class="nav-link text-dark" to="/privacy"
          ><span class="font-color" style="font-size: 25px"
            >Polityka prywatności</span
          ></router-link
        >
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showModal: false,
      server: "http://21.11.19.2:5214",
    };
  },
  components: {},
  methods: {},
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
