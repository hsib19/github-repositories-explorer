export interface Repo {
    title: string;
    stars: number;
    description: string;
}

export interface User {
    username: string;
    repos: Repo[];
}
