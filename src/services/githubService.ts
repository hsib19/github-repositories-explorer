import axios from 'axios';
import type { GitHubRepo, GitHubUser, User } from '../types';

export const fetchUsersWithRepos = async (query: string): Promise<User[]> => {
    const response = await axios.get<{ items: GitHubUser[] }>(
        `https://api.github.com/search/users?q=${query}`
    );
    const users = response.data.items.slice(0, 5);

    const usersWithRepos = await Promise.all(
        users.map(async (user) => {
            const reposRes = await axios.get<GitHubRepo[]>(
                `https://api.github.com/users/${user.login}/repos`
            );

            return {
                username: user.login,
                repos: reposRes.data.map((repo) => ({
                    title: repo.name,
                    stars: repo.stargazers_count,
                    description: repo.description || '-',
                })),
            };
        })
    );

    return usersWithRepos;
};
