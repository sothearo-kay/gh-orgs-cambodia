<script setup lang="ts">
import type { GitHubOrgMember } from "~/types/github";

const route = useRoute();
const router = useRouter();

const login = route.params.login as string;

const pageInfo = reactive({
  after: route.query.after || undefined,
  before: route.query.before || undefined
});

const queryParams = computed(() => ({
  after: pageInfo.after,
  before: pageInfo.before
}));

const members = ref<GitHubOrgMember[]>([]);
const hasPreviousPage = ref(false);
const hasNextPage = ref(false);

const { data: orgData } = await useAsyncData(
  () => `github-org-info-${login}`,
  () => $fetch(`/api/github/org/${login}/info`)
);

const { data: membersData, pending } = await useAsyncData(
  () => `github-org-members-${login}-${pageInfo.after ?? "start"}-${pageInfo.before ?? "end"}`,
  () =>
    $fetch(`/api/github/org/${login}/members`, {
      method: "POST",
      body: {
        after: pageInfo.after,
        before: pageInfo.before
      }
    })
);

watchEffect(() => {
  if (membersData.value) {
    members.value = membersData.value.members;
    hasNextPage.value = membersData.value.hasPreviousPage;
    hasNextPage.value = membersData.value.hasNextPage;
  }
});

watch(queryParams, (newQuery) => {
  router.replace({ query: { ...newQuery } });
});

function goToNextPage() {
  if (membersData.value?.hasNextPage && membersData.value?.endCursor) {
    pageInfo.after = membersData.value.endCursor;
    pageInfo.before = undefined;
  }
}

function goToPrevPage() {
  if (membersData.value?.hasPreviousPage && membersData.value?.startCursor) {
    pageInfo.before = membersData.value.startCursor;
    pageInfo.after = undefined;
  }
}
</script>

<template>
  <div class="container py-16">
    <div class="space-y-6 divide-y">
      <div v-if="orgData" class="flex gap-6 pb-6">
        <ui-avatar :size="150" :src="orgData.avatarUrl" :alt="`${orgData.login}'s avatar`" />
        <div class="flex flex-col">
          <div class="mb-2">
            <h1 class="text-2xl font-bold">{{ orgData.name }}</h1>
            <a :href="orgData.url" target="_blank"> @{{ orgData.login }} </a>
            <p class="mt-1 text-neutral-500">
              {{ orgData.description }}
            </p>
          </div>
          <nuxt-link to="/" class="mt-auto flex items-center">
            <ui-button variant="outline" rounded="md">
              <Icon name="lucide:chevron-left" class="mr-2 h-5 w-5" />
              Go to homepage
            </ui-button>
          </nuxt-link>
        </div>
      </div>

      <div v-if="members.length" class="space-y-3">
        <h3 class="text-lg font-semibold">Team Members</h3>
        <ul class="space-y-4">
          <li v-for="member in members" :key="member.login">
            <a :href="member.url" target="_blank">
              <div class="flex items-center gap-x-4 px-3 transition-colors hover:bg-neutral-200">
                <ui-avatar
                  rounded="full"
                  :size="50"
                  :src="member.avatarUrl"
                  :alt="`${member.login}'s avatar`"
                />
                <p>{{ member.name || member.login }}</p>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div v-if="hasPreviousPage || hasNextPage" class="mt-6 flex items-center justify-center">
      <ui-button
        variant="ghost"
        :loading="pending && !!pageInfo.before"
        :disabled="!membersData?.hasPreviousPage"
        @click="goToPrevPage"
      >
        <Icon name="lucide:arrow-left" class="mr-2 h-5 w-5" />
        Previous
      </ui-button>
      <ui-button
        variant="ghost"
        :loading="pending && !!pageInfo.after"
        :disabled="!membersData?.hasNextPage"
        @click="goToNextPage"
      >
        Next
        <Icon name="lucide:arrow-right" class="ml-2 h-5 w-5" />
      </ui-button>
    </div>
  </div>
</template>
