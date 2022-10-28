<template>
  <div>
    <!--

     Popup z opisem.

    -->
    <div class="root">
      <teleport to="#modalBox">
        <div class="modal" v-if="isModalVisible">
          <ModalComponent :product="this.product" @close="closeModal"></ModalComponent>
        </div>
      </teleport>
    </div>
    <!--

    Tytuł strony.

    -->
    <div class="text-center" style="margin-top: 3em">
      <h1 class="display-1" style="font-size: 120px; font-weight: 400">
        <b>OrderShop</b>
      </h1>
      <h2 class="display-1" style="font-size: 60px; font-weight: 200; margin-top: 5px">
        <b>Zamawiarka produktów</b>
      </h2>
    </div>

    <div class="div-line"></div>

    <!--

    Slider.

    -->
    <div class="small-divider"></div>

    <!--
    <SliderComponent />
    -->
    <!--

    Div z promowanymi produktami.

    -->

    <div class="small-divider"></div>

    <div class="small-divider"></div>

    <PromotedComponent @showModal="showModal" :serverAddress="serverAddress" />

    <!--

    Przycisk zamów - przejdzie do podsumowania zamówienia.

    -->

    <div class="small-divider"></div>

    <div class="container text-center">
      <button class="place-order-btn button-style button-ok"
        style="font-size: 40px; height: 100px; background-color: green; color: white" @click="goToSummaryPage">
        ZAMÓW!
      </button>
    </div>

    <div class="small-divider"></div>

    <div class="div-line"></div>

    <!--

      Nadchodzace wydarzenia.

    -->
    <div class="small-divider"></div>

    <div class="small-divider"></div>

    <EventsComponent :serverAddress="serverAddress" />


    <!--

      Mapka.

    -->

    <div class="small-divider"></div>

    <div class="small-divider"></div>

    <MapComponent />

    <!--

    Form z kontaktem.

    -->

    <div class="small-divider"></div>

    <div class="small-divider"></div>

    <ContactFormComponent :serverAddress="serverAddress" />
  </div>
</template>

<script>
import router from "@/router";
import ContactFormComponent from "../components/ContactFormComponent.vue";
import EventsComponent from "@/components/EventsComponent.vue";
import MapComponent from "@/components/MapComponent.vue";
import PromotedComponent from "../components/PromotedComponent.vue";
import ModalComponent from "@/components/ModalComponent.vue";

export default {
  name: "HomeView",
  data() {
    return {
      isModalVisible: false,
      product: {},
    };
  },
  props: {
    serverAddress: String,
  },
  components: {
    ContactFormComponent,
    EventsComponent,
    MapComponent,
    PromotedComponent,
    ModalComponent,
  },
  //Inicjalizacja strony.
  created() {
    document.title = "OrderShop";
  },
  methods: {
    //Pokazanie popupu.
    showModal(product) {
      this.isModalVisible = true;
      this.product = product;
    },
    //Zamknięcie popupu.
    closeModal() {
      this.isModalVisible = false;
    },
    //Przejście na stronę podsumowania zamówienia.
    goToSummaryPage() {
      router.push({ name: "summary", params: { serverAddress: this.serverAddress } });
    },
  },
};
</script>
