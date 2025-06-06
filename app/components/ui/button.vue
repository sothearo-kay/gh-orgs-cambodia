<script setup lang="ts">
import type { ButtonHTMLAttributes } from "vue";

interface ButtonProps extends /* @vue-ignored */ ButtonHTMLAttributes {
  variant?: "primary" | "outline" | "ghost";
  rounded?: "md" | "lg" | "full";
  loading?: boolean;
  class?: string;
}

const {
  variant = "primary",
  rounded = "lg",
  loading = false,
  class: buttonClass = "",
  ...buttonAttrs
} = defineProps<ButtonProps>();

const variantMap = {
  primary: "bg-neutral-900 text-white hover:bg-neutral-800",
  outline: "border text-neutral-800 bg-white hover:bg-neutral-100",
  ghost: `text-blue-500 border border-transparent hover:enabled:border-neutral-200 disabled:text-neutral-400`
};

const roundedMap = {
  md: "rounded-md",
  lg: "rounded-lg",
  full: "rounded-full"
};
</script>

<template>
  <button
    v-bind="buttonAttrs"
    :class="
      cn(
        'inline-flex items-center justify-center px-3 py-2 text-base font-medium',
        'transition-colors disabled:cursor-not-allowed',
        variantMap[variant],
        roundedMap[rounded],
        buttonClass,
        { 'h-10 w-10 p-0': loading }
      )
    "
  >
    <template v-if="loading">
      <Icon name="lucide:loader" class="animate-slow-spin h-5 w-5" />
    </template>
    <template v-else>
      <slot />
    </template>
  </button>
</template>
