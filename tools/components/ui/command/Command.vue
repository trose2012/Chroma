<script setup lang="ts">
import type { ComboboxRootEmits, ComboboxRootProps } from "radix-vue";
import { cn } from "@/lib/utils";
import { ComboboxRoot, useForwardPropsEmits } from "radix-vue";
import { computed, type HTMLAttributes } from "vue";

const props = withDefaults(defineProps<ComboboxRootProps & { class?: HTMLAttributes["class"] }>(), {
  open: true,
  modelValue: "",
  class: "",
});

const emits = defineEmits<ComboboxRootEmits>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <ComboboxRoot v-bind="forwarded" :class="cn('flex h-full w-full flex-col overflow-hidden rounded-md bg-white text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50', props.class)">
    <slot />
  </ComboboxRoot>
</template>
