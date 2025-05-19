export function buildOrgMembersQuery({
  login,
  after,
  before
}: {
  login: string;
  after?: string;
  before?: string;
}) {
  const variables: Record<string, any> = { login };
  const variableDecl = ["$login: String!"];
  const membersArgs = [];

  if (after) {
    variableDecl.push("$after: String");
    variables.after = after;
    membersArgs.push("first: 10", "after: $after");
  } else if (before) {
    variableDecl.push("$before: String");
    variables.before = before;
    membersArgs.push("last: 10", "before: $before");
  } else {
    membersArgs.push("first: 10");
  }

  const query = `
    query (${variableDecl.join(", ")}) {
      organization(login: $login) {
        membersWithRole(${membersArgs.join(", ")}) {
          nodes {
            login
            name
            avatarUrl
            url
          }
          pageInfo {
            startCursor
            endCursor
            hasNextPage
            hasPreviousPage
          }
        }
      }
    }
  `;

  return { query, variables };
}
