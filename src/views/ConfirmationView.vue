<template>
  <div class="text-center mt-5">
    <div v-if="!orderSent">
      <div
        class="spinner-border"
        style="width: 20rem; height: 20rem; font-size: 100px; animation-duration: 2s"
        role="status"
      >
        <span class="sr-only"></span>
      </div>
      <div>
        <h1 class="mb-5 mt-5">Oczekiwanie na potwierdzenie zamówienia...</h1>
      </div>
    </div>
    <div v-if="orderSent">
      <span class="material-symbols-outlined main-color" style="font-size: 300px">
        check_circle
      </span>
      <h1 class="mb-2" style="font-size: 50px"><b>Dziękujemy za zakup!</b></h1>
      <h2 class="mb-4">O zmianie statusu zamówienia poinformujemy e-mailem</h2>
      <div class="div-line"></div>
      <button
        class="mb-3 mt-4 button-style button-ok"
        style="width: 100%; height: 5rem"
        @click="goToMainPage"
      >
        Przejdź do strony głównej
      </button>
    </div>
  </div>
</template>

<script>
import router from "@/router";

export default {
  name: "ConfirmationView",
  data() {
    return {
      order: {},
      orderSent: false,
    };
  },
  props: {
    serverAddress: String,
  },
  async created() {
    document.title = "Potwierdzenie zamówienia";
    await this.sendOrder();
  },
  methods: {
    async sendOrder() {
      try {
        this.order = this.readOrder();
        if (this.order === undefined) {
          alert(
            "Wystąpił problem z odczytaniem zamówienia. Jeżeli problem będzie się ponawiał, proszę skontaktować się z nami przy użyciu formularza kontaktowego"
          );
        }
        const res = await fetch(this.serverAddress + "/orders/place", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.order),
        });
        if (res.status === 200) {
          this.orderSent = !this.orderSent;
          this.clearLocalStorage();
        }
      } catch (error) {
        console.log(error);
      }
    },
    readOrder() {
      const order = JSON.parse(localStorage.getItem("order"));
      return order;
    },
    clearLocalStorage() {
      localStorage.setItem("basket", "[]");
      localStorage.removeItem("order");
    },
    goToMainPage() {
      router.push("/");
    },
  },
};
</script>
