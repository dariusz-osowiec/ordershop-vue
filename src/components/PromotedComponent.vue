<template>
  <div class="container">
    <div class="row">
      <div class="col" :key="product.id" v-for="product in promoted">
        <div class="card" style="width: 100%">
          <img :src="product.imageUrl" class="card-img-top" />
          <div class="card-body">
            <h3 class="card-title">
              <b>{{ product.name }}</b>
            </h3>
            <h6 class="card-text text-center" style="margin-top: 1em">
              {{ product.shortDescription }}
            </h6>
            <button
              type="button"
              class="button-style"
              style="
                height: 50px;
                margin-top: 1em;
                width: 40%;
                background-color: lightgreen;
              "
              @click="showModal(product)"
            >
              Czytaj opis
            </button>
            <div
              class="input-group justify-content-center mb-3"
              style="width: 40%; margin-left: auto; margin-right: auto; margin-top: 1em"
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
                :value="product.tempQty"
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
            <div style="margin-top: 10px"></div>
            <div class="text-center">
              <h4>
                <b>Cena: {{ product.price }}zł </b>
              </h4>
              <button
                class="button-style"
                style="
                  height: 50px;
                  width: 80%;
                  background-color: saddlebrown;
                  color: white;
                "
                @click="addToBasket(product)"
              >
                Dodaj do koszyka
              </button>
              <h5 style="margin-top: 15px">
                W koszyku {{ product.qty === undefined ? 0 : product.qty }} sztuk
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PromotedComponent",
  data() {
    return {
      promoted: [],
      isModalVisible: false,
    };
  },
  props: {
    serverAddress: String,
  },
  async created() {
    this.promoted = await this.getPromoted();
    const basket = this.readBasket();
    this.promoted.forEach((product) => {
      product = this.createProperty(product, "tempQty");
      product = this.createProperty(product, "qty");
      product.tempQty = 1;
    });
    basket.forEach((item) => {
      var product = this.promoted.find((p) => p.id === item.id);
      var index = this.promoted.indexOf(product);
      product.qty = item.qty;
      this.promoted[index] = product;
    });
  },
  methods: {
    raiseQty(product) {
      product.tempQty += 1;
    },
    lowerQty(product) {
      product.tempQty = product.tempQty > 1 ? product.tempQty - 1 : product.tempQty;
    },
    addToBasket(product) {
      product.qty += product.tempQty;
      product.tempQty = 1;
      let basket = this.readBasket();
      var basketItem = basket.find((bI) => bI.id === product.id);
      if (basketItem === undefined) {
        basketItem = { id: product.id, qty: product.qty };
        basket.push(basketItem);
      } else {
        var i = basket.indexOf(basketItem);
        basketItem.qty = product.qty;
        basket[i] = basketItem;
      }
      localStorage.setItem("basket", JSON.stringify(basket));
    },
    createProperty(product, propertyName) {
      Object.defineProperty(product, propertyName, {
        value: 0,
        writable: true,
      });
      return product;
    },
    readBasket() {
      const basket =
        localStorage.getItem("basket") === null ||
        localStorage.getItem("basket") === undefined
          ? "[]"
          : localStorage.getItem("basket");
      return JSON.parse(basket);
    },
    async getPromoted() {
      try {
        const res = await fetch(this.serverAddress + "/db/readpromoted");
        const data = await res.json();
        return data;
      } catch (e) {
        console.error(e);
        return [];
      }
    },
    showModal(product) {
      this.$emit("showModal", product);
    },
  },
};
</script>
