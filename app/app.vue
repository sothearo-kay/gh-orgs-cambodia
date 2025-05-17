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
  <div class="container py-16">
    <ul class="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-6">
      <li v-for="(org, idx) in orgs" :key="org.login" class="relative">
        <ui-avatar :src="org.avatarUrl" :alt="`${org.login}'s avatar`" class="border shadow-2xs" />
        <p class="absolute right-0 -bottom-2 rounded bg-neutral-100 px-1.5">
          <span class="text-neutral-600">#</span>{{ idx + 1 }}
        </p>
      </li>
    </ul>

    <div class="mt-6 text-center">
      <button
        :disabled="!hasNextPage"
        :class="[
          'inline-flex items-center justify-center px-4 py-2 text-base font-medium',
          'rounded-full border transition-colors hover:bg-neutral-100'
        ]"
        @click="loadMore"
      >
        <Icon name="lucide:plus" class="h-5 w-5" />
        Show more
      </button>
    </div>
  </div>
</template>
