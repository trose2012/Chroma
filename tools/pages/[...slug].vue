<script setup>
import dog from "~/assets/img/error/dog.png";
import cat from "~/assets/img/error/cat.png";
import pizza from "~/assets/img/error/pizza.png";
// find more stupid 404 images

const imgs = [dog, cat, pizza];
const rand = imgs[Math.floor(Math.random() * imgs.length)];
</script>

<template>
  <!-- when i pull up to the function and the function not there :shock:-->
  <div class="flex flex-col items-center justify-center h-screen">
    <!-- eslint-disable-next-line vue/html-self-closing -->
    <img :src="rand" alt="404" class="w-1/2 h-auto" />
    <NuxtLink to="/" class="mt-4"><Button>Go back home</Button></NuxtLink>
  </div>
</template>
