import type { GitHubSearchResponse } from "~/types/github";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody<{ after?: string }>(event);

  const query = `
    query($after: String) {
      search(query: "type:org location:cambodia", type: USER, first: 100, after: $after) {
        userCount
        edges {
          node {
            ... on Organization {
              login
              name
              location
              avatarUrl
            }
          }
          cursor
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  `;

  const response = await $fetch<GitHubSearchResponse>("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.githubToken}`
    },
    body: {
      query,
      variables: { after: body.after ?? null }
    }
  });

  const { userCount, edges, pageInfo } = response.data.search;

  return {
    totalCount: userCount,
    orgs: edges.map((edge) => edge.node),
    endCursor: pageInfo.endCursor,
    hasNextPage: pageInfo.hasNextPage
  };
});
