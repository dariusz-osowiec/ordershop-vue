<template>
  <!--
    Slider z promocyjnymi obrazkami.
  -->
  <div id="carouselExampleSlidesOnly" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img
          src="../assets/sliderimg/first.jpg"
          class="d-block w-100"
          style="height: 40em; width: 100em"
        />
      </div>
      <div class="carousel-item">
        <img
          src="../assets/sliderimg/second.jpg"
          class="d-block w-100"
          style="height: 40em; width: 100em"
        />
      </div>
      <div class="carousel-item">
        <img
          src="../assets/sliderimg/third.jpg"
          class="d-block w-100"
          style="height: 40em; width: 100em"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SliderComponent",
};
</script>
