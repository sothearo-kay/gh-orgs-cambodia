<script setup lang="ts">
interface AvatarProps {
  src: string;
  alt: string;
  size?: number;
  rounded?: "md" | "lg" | "full";
  class?: string;
}

const {
  size = undefined,
  rounded = "lg",
  class: className = "",
  ...imgProps
} = defineProps<AvatarProps>();

const roundedMap = {
  md: "rounded-md",
  lg: "rounded-lg",
  full: "rounded-full"
};
</script>

<template>
  <div
    :class="cn('aspect-square w-full overflow-hidden', roundedMap[rounded], className)"
    :style="size ? { width: `${size}px`, height: `${size}px` } : undefined"
  >
    <nuxt-img v-bind="imgProps" :width="size" :height="size" class="size-full object-cover" />
  </div>
</template>
