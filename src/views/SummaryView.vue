<template>
  <div class="row">
    <!--

    Panel z zawartością koszyka.

    -->
    <div class="col-8 normal-pos">
      <h2>Twój koszyk</h2>
      <div class="div-line widen-lines" style="width: 100%"></div>
      <div class="small-divider"></div>
      <div class="small-divider"></div>
      <section class="div-basket" style="padding-right: 5%">
        <div v-if="productsInBasket.length === 0">
          <h2>Twój koszyk jest pusty!</h2>
        </div>
        <div v-else-if="productsInBasket.length > 0">
          <div :key="product.id" v-for="product in productsInBasket">
            <div class="row mb-3">
              <div class="col-sm-3" style="
                  border-style: groove;
                  border-color: lightgreen;
                  border-width: 1px;
                  contain: content;
                ">
                <img :src="product.imageUrl" width="100" height="100" />
              </div>
              <div class="col-sm-9 grid-basket-low grid-basket-high" style="margin-top: auto; margin-bottom: auto">
                <div class="grid-name-low" style="margin-left: auto; margin-right: auto; max-width: 50%">
                  <h2>
                    <b>{{ product.name }}</b>
                  </h2>
                </div>
                <div class="grid-qty-high grid-qty-low input-group justify-content-center grid-qty-wider" style="">
                  <div class="input-group-prepend">
                    <button class="button-style button-qty" style="font-size: 30px" @click="lowerQty(product)">
                      <b>-</b>
                    </button>
                  </div>
                  <input class="form-control text-center" style="background-color: white; color: black" type="number"
                    min="1" @keyup.enter="onEnterPressed(product)" :value="product.qty" />
                  <div class="input-group-append">
                    <button class="button-style button-qty" style="font-size: 30px" @click="raiseQty(product)">
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
                  <button @click="removeFromBasket(product)" class="button-cancel" style="width: 100%; height: 100%">
                    <span>delete</span>
                  </button>
                </div>
              </div>
              <div class="div-thin-line mt-3"></div>
            </div>
          </div>
        </div>
      </section>
      <div class="medium-divider"></div>
      <!--

        Div z danymi osobowymi.

        -->
      <h2>Konto</h2>
      <div class="div-line widen-lines" style="width: 100%"></div>
      <div class="small-divider"></div>
      <div class="small-divider"></div>
      <div>
        <LoginDataComponent v-if="!isUserLogged"></LoginDataComponent>
        <LoggedAccountComponent v-if="isUserLogged" @openLoginPopup="openLoginPopup"></LoggedAccountComponent>
      </div>
      <div class="medium-divider"></div>
      <!--

        Pole z dodaniem noty do zamówienia.

        -->
      <div>
        <h3 class="mb-3">Chcesz dodać notę do zamówienia?</h3>
        <div class="div-line widen-lines" style="width: 100%"></div>
        <div class="small-divider"></div>
        <div class="small-divider"></div>
        <div class="small-divider"></div>
        <textarea style="width: 80%; min-height: 100px; resize: vertical" placeholder="Dodaj notę do zamówienia..."
          v-model="note"></textarea>
      </div>
    </div>
    <div class="small-divider"></div>
    <!--

    Panel z podsumowaniem zamówienia.

    -->
    <div class="col-4 fixed-pos normal-pos">
      <div class="sum">
        <h4>Produkty: {{ productSum }} zł</h4>
        <h4>Wysyłka (pobranie): {{ postCost }} zł</h4>
        <h1 style="font-size: 60px">
          <b>Suma: {{ sumTotal }} zł</b>
        </h1>
      </div>
      <div class="div-line"></div>
      <div class="small-divider"></div>
      <div class="flex-row" style="text-align: right">
        <button @click="goToConfirmationPage" class="button-style button-ok"
          style="width: 100%; height: 80px; font-size: 35px;">
          <b>ZAMÓW</b>
        </button>
        <h6 style="margin-top: 5px;">Płatności obsługiwane przez PayU</h6>
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/router";
import LoginDataComponent from "@/components/LoginDataComponent.vue";
import LoggedAccountComponent from "@/components/LoggedAccountComponent.vue";

export default {
  name: "SummaryView",
  components: {
    LoginDataComponent,
    LoggedAccountComponent
  },
  data() {
    return {
      //Koszyk.
      productsInBasket: [],
      //Podsumowanie zamówienia.
      productSum: 0.0,
      sumTotal: 0.0,
      postCost: 30.0,
      //Obiekt zamówienia.
      order: {},
      //Przełączniki (tymczasowe)
      isUserLogged: true
    };
  },
  props: {
    serverAddress: String,
  },
  async created() {
    document.title = "Podsumowanie zamówienia";
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
      this.productSum += item.sum;
      this.productsInBasket.push(product);
    });
    this.sumTotal = this.productSum + this.postCost;
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
      this.sumTotal = this.productSum + this.postCost;
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
      this.sumTotal = this.productSum + this.postCost;
      localStorage.setItem("basket", JSON.stringify(basket));
    },
    //Przejście na stronę potwierdzenia zamówienia.
    goToConfirmationPage() {
      if (this.validateOrder()) {
        this.order = this.createOrder();
        localStorage.setItem("order", JSON.stringify(this.order));
        router.push({
          name: "confirmation",
          params: { serverAddress: this.serverAddress },
        });
      }
    },
    //Stworzenie obiektu zamówienia.
    createOrder() {
      let basket = this.readBasket();
      const order = {
        items: basket,
        note: this.note,
      };
      return order;
    },
    //Stworzenie właściwości.
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
    openLoginPopup() {
      this.$emit('openLoginPopup');
    }
  },
};
</script>
