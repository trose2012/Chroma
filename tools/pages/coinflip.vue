<!--NOOOOOOOOOO I LOST 200K ON A COINFLIP: https://www.youtube.com/watch?v=myg6r0NSLEk&t=1122s -->
<template>
  <main class="flex flex-col items-center justify-center h-full p-4">
    <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Coin flip</h1>
    <div class="coin-container relative w-40 h-40 m-6">
      <div :class="['coin', flipping ? 'flipping' : '', reset ? 'no-transition' : '']" :style="{ transform: coinTransform }" class="absolute inset-0">
        <div class="front flex items-center justify-center bg-secondary text-black w-full h-full absolute backface-hidden rounded-full">Heads</div>
        <div class="back flex items-center justify-center bg-transparent w-full h-full absolute backface-hidden rounded-full border-4 border-white">Tails</div>
      </div>
    </div>
    <Button variant="secondary" class="" @click="flipCoin">Flip Coin</Button>
    <p v-if="result && !flipping" class="mt-4 text-lg font-bold">{{ resultF }}</p>
  </main>
</template>

<script>
export default {
  data() {
    return {
      flipping: false,
      result: "",
      resultF: "",
      coinTransform: "rotateY(0deg)",
      current: "heads",
      reset: false,
    };
  },
  methods: {
    flipCoin() {
      //define jank
      if (this.flipping) return;

      this.flipping = true;
      const isHeads = Math.random() > 0.5;
      this.result = isHeads ? "heads" : "tails";

      const rotation = isHeads ? 1440 : 1620;
      // this is such a stupid way to do this
      // todo: find a better way
      this.coinTransform = `rotateY(${rotation}deg)`;
      setTimeout(() => {
        this.reset = true;

        this.coinTransform = isHeads ? "rotateY(0deg)" : "rotateY(180deg)";

        setTimeout(() => {
          this.reset = false;
          this.current = this.result;
          this.flipping = false;
        }, 50);
      }, 1000);
      this.resultF = isHeads ? "The coin landed on Heads!" : "The coin landed on Tails!";
    },
  },
};
</script>

<style scoped>
/* fix things that tailwind does not cover */
.coin-container {
  perspective: 1000px;
}

.coin {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 1s ease-in-out;
}

.no-transition {
  transition: none !important;
}

.front,
.back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
}

.front {
  transform: rotateY(0deg);
}

.back {
  transform: rotateY(180deg);
}
</style>
