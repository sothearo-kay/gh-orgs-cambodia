<script setup lang="ts">
import type { GitHubOrganization } from "./types/github";

const totalCount = ref<number>(0);
const orgs = ref<GitHubOrganization[]>([]);
const hasNextPage = ref(false);
const after = ref<string | null>(null);

const { data, pending } = await useAsyncData(
  () => `orgs-${after.value ?? "first"}`,
  () => $fetch("/api/github/orgs", { method: "POST", body: { after: after.value } })
);

watch(
  data,
  (d) => {
    if (!d) return;

    orgs.value = [...orgs.value, ...d.orgs];
    hasNextPage.value = d.hasNextPage;

    if (d.totalCount) {
      totalCount.value = d.totalCount;
    }
  },
  { immediate: true }
);

function loadMore() {
  if (hasNextPage.value && data.value?.endCursor) {
    after.value = data.value.endCursor;
  }
}
</script>

<template>
  <div class="container py-16">
    <div class="sticky top-4 z-10 w-max">
      <p class="rounded border bg-white px-4 py-2 text-sm text-neutral-500 shadow-2xs">
        Showing
        <span class="font-medium text-neutral-800">{{ orgs.length }}</span> of
        <span class="font-medium text-neutral-800">{{ totalCount }}</span> organizations
      </p>
    </div>

    <ul class="mt-6 grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-6">
      <li v-for="(org, idx) in orgs" :key="org.login" class="relative">
        <ui-avatar :src="org.avatarUrl" :alt="`${org.login}'s avatar`" class="border shadow-2xs" />
        <p class="absolute right-0 -bottom-2 rounded bg-neutral-100 px-1.5">
          <span class="text-neutral-500">#</span>{{ idx + 1 }}
        </p>
      </li>
    </ul>

    <div class="mt-6 text-center">
      <ui-button
        v-if="hasNextPage"
        variant="outline"
        rounded="full"
        :loading="pending"
        :disabled="pending"
        @click="loadMore"
      >
        <Icon name="lucide:plus" class="mr-2 h-5 w-5" />
        Show more
      </ui-button>
      <p v-else class="text-sm text-neutral-500">You've reached the end.</p>
    </div>
  </div>
</template>
