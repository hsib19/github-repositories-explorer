export interface Repo {
    title: string;
    stars: number;
    description: string;
}

export interface User {
    username: string;
    repos: Repo[];
}

export type GitHubUser = {
    login: string;
};

export type GitHubRepo = {
    name: string;
    stargazers_count: number;
    description: string | null;
};
