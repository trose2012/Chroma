<template>
  <main class="flex flex-col items-center justify-center h-full p-4">
    <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">{{ timezone }}</h1>
    <h2 class="scroll-m-20 border-b pb-2 text-4xl font-semibold tracking-tight transition-colors mt-4">{{ currentTime }}</h2>
    <h4 class="scroll-m-20 text-xl font-semibold tracking-tight mt-4">{{ date }}</h4>
  </main>
</template>
<script>
export default {
  data() {
    return {
      currentTime: new Date().toLocaleTimeString("en-GB"), //24 time based
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      date: new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" }),
    };
  },
  mounted() {
    this.interval = setInterval(() => {
      this.currentTime = new Date().toLocaleTimeString("en-GB");
    }, 1000);
  },
  beforeUnmount() {
    clearInterval(this.interval); // prevent memory leak
  },
};
</script>
