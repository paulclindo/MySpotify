<template>
  <div>
    <a :href="artist.url" target="_blank">
      <h2 class="Artist__title">{{artist.name}}</h2>
      <img class="Artist__image" :src="artist.image[2]['#text']" alt />
    </a>
    <p class="Artist__number">Listeners: {{artist.listeners}}</p>
  </div>
</template>

<script>
export default {
  name: "artist",
  props: ["artist"]
};
</script>

<style scoped>
</style>