import type { GitHubOrgDetailResponse } from "~/types/github";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const login = getRouterParam(event, "login");

  const query = `
    query ($login: String!) {
      organization(login: $login) {
        login
        name
        url
        avatarUrl
        description
        membersWithRole(first: 10) {
          nodes {
            login
            name
            avatarUrl
            url
          }
        }
      }
    }
  `;

  const response = await $fetch<GitHubOrgDetailResponse>("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.githubToken}`
    },
    body: {
      query,
      variables: { login }
    }
  });

  const orgData = response.data.organization;

  if (!orgData) {
    throw createError({
      statusCode: 404,
      statusMessage: `Organization ${login} not found`
    });
  }

  const { membersWithRole, ...org } = orgData;

  return { org, members: membersWithRole.nodes };
});
