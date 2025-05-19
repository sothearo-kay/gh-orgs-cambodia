import type { GitHubOrgMembersResponse } from "~/types/github";
import { buildOrgMembersQuery } from "~~/server/utils/query";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const login = getRouterParam(event, "login") as string;
  const body = await readBody<{ after?: string; before?: string }>(event);

  const { query, variables } = buildOrgMembersQuery({
    login,
    after: body.after,
    before: body.before
  });

  const response = await $fetch<GitHubOrgMembersResponse>("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.githubToken}`
    },
    body: { query, variables }
  });

  const { membersWithRole } = response.data.organization;

  return {
    members: membersWithRole.nodes,
    endCursor: membersWithRole.pageInfo.endCursor,
    startCursor: membersWithRole.pageInfo.startCursor,
    hasNextPage: membersWithRole.pageInfo.hasNextPage,
    hasPreviousPage: membersWithRole.pageInfo.hasPreviousPage
  };
});
