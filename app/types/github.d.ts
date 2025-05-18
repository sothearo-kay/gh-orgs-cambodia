export interface GitHubOrganization {
  login: string;
  name: string;
  location: string;
  avatarUrl: string;
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
