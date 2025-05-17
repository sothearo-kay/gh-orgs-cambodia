<script setup lang="ts">
import type { GitHubOrganization } from "./types/github";

const orgs = ref<GitHubOrganization[]>([]);
const hasNextPage = ref(false);
const after = ref<string | null>(null);

const { data } = await useAsyncData(
  () => `orgs-${after.value ?? "first"}`,
  () => $fetch("/api/github/orgs", { method: "POST", body: { after: after.value } })
);

watchEffect(() => {
  if (data.value) {
    orgs.value = [...orgs.value, ...data.value.orgs];
    hasNextPage.value = data.value.hasNextPage;
  }
});

function loadMore() {
  if (hasNextPage.value && data.value?.endCursor) {
    after.value = data.value.endCursor;
  }
}
</script>

<template>
  <div>
    <ul>
      <li v-for="org in orgs" :key="org.login">
        <strong>{{ org.login }}</strong> — {{ org.name }} ({{ org.location }})
      </li>
    </ul>
    <button :disabled="!hasNextPage" @click="loadMore">Load More</button>
  </div>
</template>
