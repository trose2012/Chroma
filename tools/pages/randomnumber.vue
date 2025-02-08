<template>
  <main>
    <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Random Number Generator</h1>
    <div class="p-2">
      <div class="flex space-x-4 mb-4">
        <div class="w-1/2">
          <Label class="mb-1" for="min">Minimum:</Label>
          <Input id="min" v-model.number="min" type="number" class="w-full py-2 px-3" />
        </div>
        <div class="w-1/2">
          <Label class="mb-1" for="max">Maximum:</Label>
          <Input id="max" v-model.number="max" type="number" class="w-full py-2 px-3" />
        </div>
      </div>
      <div class="mb-4">
        <Button variant="secondary" @click="generateRandomNumber">Generate</Button>
      </div>
      <div v-if="randomNumber !== null" class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center">
        {{ randomNumber }}
      </div>
    </div>
  </main>
</template>

<script setup>
import { toast } from "vue-sonner";

const min = ref(0);
const max = ref(100);
const randomNumber = ref(null);

const generateRandomNumber = () => {
  if (min.value > max.value) {
    // because someone broke it
    toast("Error", {
      description: "The minimum number can not be bigger than the maximum!",
    });
    return;
  }
  randomNumber.value = Math.floor(Math.random() * (max.value - min.value + 1)) + min.value;
  // we could use random.org for this, but i dont care if the number is pseudo random or not
};
</script>

<style scoped>
textarea {
  resize: none;
}
textarea:focus,
input:focus {
  outline: none;
}
</style>
