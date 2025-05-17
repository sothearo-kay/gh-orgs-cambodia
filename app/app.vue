<script setup lang="ts">
const { data } = useAsyncData("orgs", () => $fetch("/api/github/orgs"));

watchEffect(() => {
  console.log(data.value);
});
</script>

<template>
  <div>
    <h1 class="text-center">Hello, world</h1>
  </div>
</template>
