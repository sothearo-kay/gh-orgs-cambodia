<script setup lang="ts">
import type { GitHubOrganization } from "~/types/github";

const totalCount = ref<number>(0);
const orgs = ref<GitHubOrganization[]>([]);
const hasNextPage = ref(false);
const after = ref<string | null>(null);

const { data, pending } = await useAsyncData(
  () => `orgs-${after.value ?? "first"}`,
  () => $fetch("/api/github/orgs", { method: "POST", body: { after: after.value } })
);

watchEffect(() => {
  if (!data.value) return;

  const d = data.value;
  orgs.value = [...orgs.value, ...d.orgs];
  hasNextPage.value = d.hasNextPage;

  if (d.totalCount) {
    totalCount.value = d.totalCount;
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
    <div>
      <h1></h1>
      <p></p>
    </div>

    <div class="sticky top-4 z-10 w-max">
      <p
        class="rounded border bg-white/80 px-4 py-2 text-sm text-neutral-500 shadow-xs backdrop-blur-md"
      >
        Showing
        <span class="font-medium text-neutral-800">{{ orgs.length }}</span> of
        <span class="font-medium text-neutral-800">{{ totalCount }}</span> organizations
      </p>
    </div>

    <ul class="mt-6 grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-x-6 gap-y-10">
      <li v-for="(org, idx) in orgs" :key="org.login" class="relative">
        <nuxt-link :to="`/orgs/${org.login}`">
          <ui-avatar :src="org.avatarUrl" :alt="`${org.login}'s avatar`" />
          <p class="absolute -right-2 -bottom-2 rounded bg-neutral-100 px-1.5">
            <span class="text-neutral-500">#</span>{{ idx + 1 }}
          </p>
        </nuxt-link>
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
