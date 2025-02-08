<template>
  <main class="flex flex-col items-center justify-center h-full p-4">
    <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Pomodoro Timer</h1>
    <h2 class="scroll-m-20 border-b pb-2 text-4xl font-semibold tracking-tight transition-colors mt-4">{{ min }}:{{ sec < 10 ? "0" + sec : sec }}</h2>
    <h4 class="scroll-m-20 text-xl font-semibold tracking-tight mt-4">{{ timerType }}</h4>
    <div class="flex space-x-4 mt-4">
      <Button :disabled="isRunning" variant="secondary" @click="startTimer">Start</Button>
      <Button :disabled="!isRunning" variant="secondary" @click="resetTimer">Reset</Button>
      <Button variant="secondary" @click="skipTimer">Skip</Button>
    </div>
  </main>
</template>

<script>
import alarmSound from "@/assets/alarm.mp3";

export default {
  setup() {
    const timer = ref(null);
    const min = ref(25);
    const sec = ref(0);
    const timerType = ref("Work Time");
    const isRunning = ref(false);
    const audio = typeof window !== "undefined" ? new Audio(alarmSound) : null;
    // fix audio error in ssr

    const startTimer = () => {
      if (!isRunning.value) {
        isRunning.value = true;
        timer.value = setInterval(() => {
          if (sec.value === 0) {
            if (min.value === 0) {
              clearInterval(timer.value);
              if (audio) audio.play();
              switchT();
              isRunning.value = false;
            } else {
              min.value--;
              sec.value = 59;
            }
          } else {
            sec.value--;
          }
        }, 1000);
      }
    };

    const resetTimer = () => {
      clearInterval(timer.value);
      min.value = 25;
      sec.value = 0;
      timerType.value = "Work Time";
      isRunning.value = false;
    };

    const skipTimer = () => {
      clearInterval(timer.value);
      switchT();
      startTimer();
    };

    const switchT = () => {
      if (timerType.value === "Work Time") {
        timerType.value = "Break Time";
        min.value = 5;
        sec.value = 0;
      } else {
        timerType.value = "Work Time";
        min.value = 25;
        sec.value = 0;
      }
    };

    return {
      min,
      sec,
      startTimer,
      resetTimer,
      skipTimer,
      timerType,
      isRunning,
    };
  },
};
</script>
