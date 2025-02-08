<template>
  <main class="flex flex-col items-center justify-center h-full p-1">
    <Tabs default-value="Reactive" class="w-full mb-4">
      <TabsList class="grid w-full grid-cols-2">
        <TabsTrigger value="Reactive" class="text-md font-semibold" @click="setMode('Reactive')"> Reactive Mode </TabsTrigger>
        <TabsTrigger value="Predictive" class="text-md font-semibold" @click="setMode('Predictive')"> Predictive Mode </TabsTrigger>
      </TabsList>
    </Tabs>
    <button :class="['w-full h-full rounded-lg pointer border border-zinc-800', boxColor]" @click="handleClick">
      <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-16">
        {{ hboxMessage }}
      </h1>
      <p class="scroll-m-20 text-4xl font-semibold tracking-tight transition-colors mt-4">
        {{ pboxMessage }}
      </p>
    </button>
  </main>
</template>

<script setup lang="ts">
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const isReady = ref(false);
const reactionTime = ref(null);
const startTime = ref(null);
const timeoutId = ref(null);
const boxColor = ref("bg-transparent");
const hboxMessage = ref("Reaction Time Test");
const pboxMessage = ref("Click to start the test");
const mode = ref("Reactive");
const countdownIn = ref(null);

const setMode = (newMode) => {
  mode.value = newMode;
  resetTest();
};

const startTest = () => {
  isReady.value = false;
  reactionTime.value = null;
  boxColor.value = "bg-zinc-950";
  // this is set to the actual color and not transparent
  // why? because if it is set to transparent, shit breaks
  // why? no fucking clue
  hboxMessage.value = "Get ready!";
  pboxMessage.value = "Wait for the color to change to white";
  clearTimeout(timeoutId.value);
  clearInterval(countdownIn.value);

  const randomDelay = Math.floor(Math.random() * 4000) + 1000;

  if (mode.value === "Reactive") {
    timeoutId.value = setTimeout(() => {
      isReady.value = true;
      boxColor.value = "bg-white"; // could change the color to not flashbang, but it works
      startTime.value = Date.now();
    }, randomDelay);
  } else if (mode.value === "Predictive") {
    //aka baby mode
    let countdown = randomDelay;
    pboxMessage.value = `Changing in ${(countdown / 1000).toFixed(2)} seconds`;
    countdownIn.value = setInterval(() => {
      countdown -= 10;
      pboxMessage.value = `Changing in ${(countdown / 1000).toFixed(2)} seconds`;
      if (countdown <= 0) {
        clearInterval(countdownIn.value);
        isReady.value = true;
        boxColor.value = "bg-white";
        startTime.value = Date.now();
      }
    }, 10);
  }
};

const handleClick = () => {
  if (boxColor.value === "bg-transparent") {
    startTest();
  } else if (isReady.value) {
    // user clicked after time expired
    const endTime = Date.now();
    reactionTime.value = endTime - startTime.value;
    isReady.value = false;
    boxColor.value = "bg-transparent";
    hboxMessage.value = `Your ${mode.value} time is ${reactionTime.value}ms`;
    pboxMessage.value = "Click again to start a new test";
  } else {
    // user fucking prefired it
    clearTimeout(timeoutId.value);
    clearInterval(countdownIn.value);
    isReady.value = false;
    boxColor.value = "bg-transparent";
    hboxMessage.value = "Too early!";
    pboxMessage.value = "Click again to start a new test";
  }
};

const resetTest = () => {
  clearTimeout(timeoutId.value);
  clearInterval(countdownIn.value);
  isReady.value = false;
  boxColor.value = "bg-transparent";
  hboxMessage.value = "Reaction Time Test";
  pboxMessage.value = "Click to start the test";
};
</script>

<style scoped>
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
