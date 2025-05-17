import { GitHubSearchResponse } from "~~/types/github";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  const query = `
    query() {
      search(query: "type:org location:cambodia", type: USER, first: 100) {
        edges {
          node {
            ... on Organization {
              login
              name
              location
            }
          }
        }
      }
    }
  `;

  const response = await $fetch<GitHubSearchResponse>("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.githubToken}`
    },
    body: { query }
  });

  const { edges } = response.data.search;

  return edges.map((edge) => edge.node);
});
