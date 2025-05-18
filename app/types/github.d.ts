// Search
export interface GitHubUserBase {
  login: string;
  name: string | null;
  avatarUrl: string;
}

export interface GitHubOrganization extends GitHubUserBase {
  location: string;
}

export interface SearchEdge {
  node: GitHubOrganization;
  cursor: string;
}

export interface PageInfo {
  endCursor: string;
  hasNextPage: boolean;
}

export interface GitHubSearchResponse {
  data: {
    search: {
      userCount: number;
      edges: SearchEdge[];
      pageInfo: PageInfo;
    };
  };
}

// Detail
export interface GitHubOrgDetail extends GitHubUserBase {
  description: string | null;
  url: string;
}

export interface GitHubOrgMember extends GitHubUserBase {
  url: string;
}

export interface GitHubOrgDetailResponse {
  data: {
    organization: GitHubOrgDetail & {
      membersWithRole: {
        nodes: GitHubOrgMember[];
      };
    };
  };
}
