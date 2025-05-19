import type { GitHubRepoStargazerResponse } from "~/types/github";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const { owner, repo } = getRouterParams(event);

  const query = `
    query ($owner: String!, $repo: String!) {
      repository(owner: $owner, name: $repo) {
        stargazerCount
        url
      }
    }
  `;

  const response = await $fetch<GitHubRepoStargazerResponse>("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.githubToken}`,
      Accept: "application/vnd.github+json"
    },
    body: {
      query,
      variables: { owner, repo }
    }
  });

  const { stargazerCount, url } = response.data.repository;

  return {
    stars: stargazerCount,
    url
  };
});
