<script setup lang="ts">
const { text, visible, position } = useTooltip();
</script>

<template>
  <Transition name="fly">
    <div
      v-show="visible"
      :class="[
        'absolute z-50 -translate-x-1/2 border border-black bg-black/80',
        'rounded px-3 py-1 text-sm font-medium whitespace-nowrap text-white shadow-lg'
      ]"
      :style="{ top: `${position.y}px`, left: `${position.x}px` }"
    >
      {{ text }}
    </div>
  </Transition>
</template>

<style scoped>
.fly-enter-active,
.fly-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.fly-enter-from,
.fly-leave-to {
  opacity: 0;
  transform: translate(0, 10px);
}

.fly-enter-to,
.fly-leave-from {
  opacity: 1;
  transform: translate(0, 0);
}
</style>
