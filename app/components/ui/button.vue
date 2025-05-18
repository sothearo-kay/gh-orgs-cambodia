<script setup lang="ts">
import type { ButtonHTMLAttributes } from "vue";

interface ButtonProps extends /* @vue-ignored */ ButtonHTMLAttributes {
  variant?: "primary" | "outline" | "ghost";
  rounded?: "md" | "lg" | "full";
  loading?: boolean;
}

const {
  variant = "primary",
  rounded = "lg",
  loading = false,
  ...buttonAttrs
} = defineProps<ButtonProps>();

const variantMap = {
  primary: "bg-neutral-900 text-white hover:bg-neutral-800",
  outline: "border border-neutral-300 text-neutral-800 bg-white hover:bg-neutral-100",
  ghost: "text-neutral-700 hover:bg-neutral-100"
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
        'inline-flex items-center justify-center px-4 py-2 text-base font-medium',
        'hover:bg-neutral-100disabled:cursor-not-allowed transition-colors',
        variantMap[variant],
        roundedMap[rounded],
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
