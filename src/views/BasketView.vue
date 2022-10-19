<template>
  <h1>Twój koszyk</h1>

  <div class="row">
    <!--

    Panel z zawartością koszyka.

    -->
    <section class="col-8 mt-4 normal-pos" style="padding-right: 5%; contain: content">
      <div v-if="productsInBasket.length === 0">
        <h2>Twój koszyk jest pusty!</h2>
      </div>
      <div v-else-if="productsInBasket.length > 0">
        <div :key="product.id" v-for="product in productsInBasket">
          <div class="row mb-3">
            <div
              class="col-sm-3"
              style="
                border-style: groove;
                border-color: lightgreen;
                border-width: 1px;
                contain: content;
              "
            >
              <img :src="product.imageUrl" width="100" height="100" />
            </div>
            <div
              class="col-sm-9 grid-basket-low grid-basket-high"
              style="margin-top: auto; margin-bottom: auto"
            >
              <div
                class="grid-name-low"
                style="margin-left: auto; margin-right: auto; max-width: 50%"
              >
                <h2>
                  <b>{{ product.name }}</b>
                </h2>
              </div>
              <div
                class="grid-qty-high grid-qty-low input-group justify-content-center grid-qty-wider"
                style=""
              >
                <div class="input-group-prepend">
                  <button
                    class="button-style button-qty"
                    style="font-size: 30px"
                    @click="lowerQty(product)"
                  >
                    <b>-</b>
                  </button>
                </div>
                <input
                  class="form-control text-center"
                  style="background-color: white; color: black"
                  type="number"
                  min="1"
                  @keyup.enter="onEnterPressed(product)"
                  :value="product.qty"
                />
                <div class="input-group-append">
                  <button
                    class="button-style button-qty"
                    style="font-size: 30px"
                    @click="raiseQty(product)"
                  >
                    <b>+</b>
                  </button>
                </div>
              </div>
              <div class="grid-sum-low" style="margin-left: auto; margin-right: auto">
                <h2>
                  <b>{{ product.sum }} zł</b>
                </h2>
              </div>
              <div class="material-symbols-outlined grid-delete-low grid-delete-high">
                <button
                  @click="removeFromBasket(product)"
                  class="button-cancel"
                  style="width: 100%; height: 100%"
                >
                  <span>delete</span>
                </button>
              </div>
            </div>
            <div class="div-thin-line mt-3"></div>
          </div>
        </div>
      </div>
    </section>
    <!--

    Panel z podsumowaniem produktów.

    -->
    <div class="divider"></div>
    <div class="col-4 fixed-pos normal-pos">
      <div class="sum">
        <h1 style="font-size: 60px">
          <b>Suma: {{ productSum }} zł</b>
        </h1>
        <h5>+ koszty dostawy</h5>
      </div>
      <div class="div-line"></div>
      <div class="small-divider"></div>
      <div class="flex-row arrange-buttons-low arrange-buttons-high">
        <button
          class="button-style button-cancel button-cancel-pos-low button-cancel-pos-high"
          style="margin-right: 5px; height: 75px"
          @click="clearBasket"
        >
          Wyczyść koszyk
        </button>
        <div class="small-divider"></div>
        <button
          class="button-style button-ok button-ok-pos-low button-ok-pos-high"
          style="margin-left: 5px; height: 75px"
          @click="goToSummaryPage"
        >
          Przejdź do podsumowania
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/router";

export default {
  name: "BasketView",
  data() {
    return {
      productsInBasket: [],
      productSum: 0.0,
    };
  },
  props: {
    serverAddress: String,
  },
  //Inicjalizacja strony.
  async created() {
    document.title = "Twój koszyk";
    const products = await this.getProducts();
    products.forEach((product) => {
      product = this.createProperty(product, "qty");
      product = this.createProperty(product, "sum");
      product.qty = 1;
      product.sum = product.qty * product.price;
    });
    const basket = this.readBasket();
    basket.forEach((item) => {
      var product = products.find((p) => p.id === item.id);
      product.qty = item.qty;
      product.sum = product.qty * product.price;
      this.productsInBasket.push(product);
    });
    this.productsInBasket.forEach((item) => {
      this.productSum += item.sum;
    });
  },
  methods: {
    //Podniesienie ilości kupowanego produktu.
    raiseQty(product) {
      product.qty += 1;
      product.sum = product.qty * product.price;
      this.updateBasket();
    },
    //Zmniejszenie ilości kupowanego produktu.
    lowerQty(product) {
      product.qty = product.qty > 1 ? product.qty - 1 : product.qty;
      product.sum = product.qty * product.price;
      this.updateBasket();
    },
    //Zaktualizowanie koszyka.
    updateBasket() {
      this.productSum = 0.0;
      let basket = this.readBasket();
      this.productsInBasket.forEach((item) => {
        this.productSum += item.sum;
        var basketItem = basket.find((bI) => bI.id === item.id);
        var i = basket.indexOf(basketItem);
        basketItem.qty = item.qty;
        basket[i] = basketItem;
      });
      localStorage.setItem("basket", JSON.stringify(basket));
    },
    //Aktualizacja kupowanej ilości produktu poprzez naciśnięcie Enter.
    onEnterPressed(product) {
      product.sum = product.qty * product.price;
      this.updateBasket();
    },
    //Usunięcie produktu z koszyka.
    removeFromBasket(product) {
      this.productSum = 0.0;
      this.productsInBasket = this.productsInBasket.filter(
        (item) => item.id !== product.id
      );
      let basket = this.readBasket();
      basket = basket.filter((item) => item.id !== product.id);
      this.productsInBasket.forEach((item) => {
        this.productSum += item.sum;
        var basketItem = basket.find((bI) => bI.id === item.id);
        var i = basket.indexOf(basketItem);
        basketItem.qty = item.qty;
        basket[i] = basketItem;
      });
      localStorage.setItem("basket", JSON.stringify(basket));
    },
    //Wyczyszczenie koszyka.
    clearBasket() {
      this.productsInBasket = [];
      localStorage.setItem("basket", "[]");
    },
    //Przejście na stronę podsumowania.
    goToSummaryPage() {
      router.push("/summary");
    },
    //Tworzenie właściwości.
    createProperty(product, propertyName) {
      Object.defineProperty(product, propertyName, {
        value: 0,
        writable: true,
      });
      return product;
    },
    //Odczytanie koszyka z localStorage.
    readBasket() {
      const basket =
        localStorage.getItem("basket") === null ||
        localStorage.getItem("basket") === undefined
          ? []
          : localStorage.getItem("basket");
      return JSON.parse(basket);
    },
    //Pozyskanie produktów z bazy danych.
    async getProducts() {
      try {
        const res = await fetch(this.serverAddress + "/db/readall");
        const data = await res.json();
        return data;
      } catch (e) {
        console.error(e);
        return [];
      }
    },
  },
};
</script>
