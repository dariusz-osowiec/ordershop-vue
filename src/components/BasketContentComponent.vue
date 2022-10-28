<template>
    <section class="div-basket" style="padding-right: 5%">
        <div v-if="productsInBasket.length === 0">
            <h2>Twój koszyk jest pusty!</h2>
        </div>
        <div v-else-if="productsInBasket.length > 0">
            <div :key="product.id" v-for="product in basketContent">
                <div class="row mb-3">
                    <div class="col-sm-3" style="
                  border-style: groove;
                  border-color: lightgreen;
                  border-width: 1px;
                  contain: content;
                ">
                        <img :src="product.imageUrl" width="100" height="100" />
                    </div>
                    <div class="col-sm-9 grid-basket-low grid-basket-high"
                        style="margin-top: auto; margin-bottom: auto">
                        <div class="grid-name-low" style="margin-left: auto; margin-right: auto; max-width: 50%">
                            <h2>
                                <b>{{ product.name }}</b>
                            </h2>
                        </div>
                        <div class="grid-qty-high grid-qty-low input-group justify-content-center grid-qty-wider"
                            style="">
                            <div class="input-group-prepend">
                                <button class="button-style button-qty" style="font-size: 30px"
                                    @click="lowerQty(product)">
                                    <b>-</b>
                                </button>
                            </div>
                            <input class="form-control text-center" style="background-color: white; color: black"
                                type="number" min="1" @keyup.enter="onEnterPressed(product)" :value="product.qty" />
                            <div class="input-group-append">
                                <button class="button-style button-qty" style="font-size: 30px"
                                    @click="raiseQty(product)">
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
                            <button @click="removeFromBasket(product)" class="button-cancel"
                                style="width: 100%; height: 100%">
                                <span>delete</span>
                            </button>
                        </div>
                    </div>
                    <div class="div-thin-line mt-3"></div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'BasketContentComponent',
    props: {
        serverAddress: String
    },
    data() {
        return {
            productsum: 0.0,
        }
    },
    async created() {
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
            this.productSum += product.sum;
            this.productsInBasket.push(product);
        });
    },
    methods: {
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
            this.$emit('basketUpdated', this.productsum);
        },
        //Aktualizacja kupowanej ilości produktu poprzez naciśnięcie Enter.
        onEnterPressed(product) {
            product.sum = product.qty * product.price;
            this.updateBasket();
        }
    }
}
</script>