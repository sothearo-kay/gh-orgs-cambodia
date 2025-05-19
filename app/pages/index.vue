<script setup lang="ts">
import type { GitHubOrganization } from "~/types/github";

const owner = "sothearo-kay";
const repo = "gh-orgs-cambodia";

const totalCount = ref<number>(0);
const orgs = ref<GitHubOrganization[]>([]);
const hasNextPage = ref(false);
const after = ref<string | null>(null);

const { data: orgsData, pending } = await useAsyncData(
  () => `orgs-${after.value ?? "first"}`,
  () => $fetch("/api/github/orgs", { method: "POST", body: { after: after.value } })
);

const { data: repoData } = await useAsyncData(`github-repo-stars-${repo}`, () =>
  $fetch(`/api/github/repo/${owner}/${repo}/stars`)
);

watchEffect(() => {
  if (!orgsData.value) return;

  const d = orgsData.value;
  orgs.value = [...orgs.value, ...d.orgs];
  hasNextPage.value = d.hasNextPage;

  if (d.totalCount) {
    totalCount.value = d.totalCount;
  }
});

function loadMore() {
  if (hasNextPage.value && orgsData.value?.endCursor) {
    after.value = orgsData.value.endCursor;
  }
}
</script>

<template>
  <div class="container py-6">
    <div class="sm:my-6 sm:flex sm:justify-between sm:gap-6">
      <div class="space-y-1" md:col-start-1 md:row-start-1>
        <h1 class="text-3xl font-bold">GitHub Organizations Cambodia</h1>
        <p class="text-neutral-500">
          Curated list of tech organizations and communities in Cambodia
        </p>
      </div>

      <div class="py-3 sm:hidden" />

      <a
        v-if="repoData"
        :href="repoData.url"
        target="_blank"
        class="float-end inline-block sm:self-end"
      >
        <ui-button variant="outline" rounded="md">
          <Icon
            mode="svg"
            name="lucide:star"
            class="mr-2 h-5 w-5 text-yellow-400"
            :customize="addFillColor"
          />
          Star {{ repoData.stars }}
        </ui-button>
      </a>
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

    <ul class="mt-10 grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-x-6 gap-y-10">
      <li v-for="(org, idx) in orgs" :key="org.login" class="relative">
        <nuxt-link v-tooltip="org.name" :to="`/orgs/${org.login}`">
          <ui-avatar :src="org.avatarUrl" :alt="`${org.login}'s avatar`" />
          <p class="absolute -right-2 -bottom-2 rounded bg-neutral-100 px-1.5">
            <span class="text-neutral-500">#</span>{{ idx + 1 }}
          </p>
        </nuxt-link>
      </li>
    </ul>

    <div class="mt-10 text-center">
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
