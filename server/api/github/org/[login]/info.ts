import type { GitHubOrgDetailResponse } from "~/types/github";

export default defineEventHandler(async (event) => {
  const login = getRouterParam(event, "login");
  const config = useRuntimeConfig();

  const query = `
    query ($login: String!) {
      organization(login: $login) {
        login
        name
        url
        avatarUrl
        description
      }
    }
  `;

  const response = await $fetch<GitHubOrgDetailResponse>("https://api.github.com/graphql", {
    method: "POST",
    headers: { Authorization: `Bearer ${config.githubToken}` },
    body: { query, variables: { login } }
  });

  return response.data.organization;
});
