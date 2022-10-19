<template>
  <!--
    Popup, który wyświetlany zostanie wyświetlany za pomocą teleportu.
  -->
  <div>
    <header>
      <h2>{{ product.name }}</h2>
    </header>
    <div>
      <p>
        {{ product.description }}
      </p>
    </div>
    <footer>
      <button
        class="button-cancel"
        @click="this.$emit('close')"
        style="height: 40px; width: 100px"
      >
        ZAMKNIJ
      </button>
    </footer>
  </div>
</template>

<script>
export default {
  name: "ModalComponent",
  props: {
    //Produkt, którego ma się wyświetlić opis.
    product: {},
  },
};
</script>
