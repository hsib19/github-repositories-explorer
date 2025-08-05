import axios from 'axios';
import type { User } from '../types';

export const fetchUsersWithRepos = async (query: string): Promise<User[]> => {
    const response = await axios.get(`https://api.github.com/search/users?q=${query}`);
    const users = response.data.items.slice(0, 5);

    const usersWithRepos = await Promise.all(
        users.map(async (user: any) => {
            const reposRes = await axios.get(`https://api.github.com/users/${user.login}/repos`);
            return {
                username: user.login,
                repos: reposRes.data.map((repo: any) => ({
                    title: repo.name,
                    stars: repo.stargazers_count,
                    description: repo.description || '-',
                })),
            };
        })
    );

    return usersWithRepos;
};
