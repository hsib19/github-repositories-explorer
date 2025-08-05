import axios from 'axios';
import { fetchUsersWithRepos } from '../githubService';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('fetchUsersWithRepos', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('fetches users and their repos correctly', async () => {
        mockedAxios.get.mockImplementationOnce(() =>
            Promise.resolve({
                data: {
                    items: [
                        { login: 'user1' },
                        { login: 'user2' },
                    ],
                },
            })
        );

        mockedAxios.get.mockImplementationOnce(() =>
            Promise.resolve({
                data: [
                    { name: 'repo1', stargazers_count: 3, description: 'desc1' },
                    { name: 'repo2', stargazers_count: 1, description: null },
                ],
            })
        );

        mockedAxios.get.mockImplementationOnce(() =>
            Promise.resolve({
                data: [
                    { name: 'repoA', stargazers_count: 5, description: 'descA' },
                ],
            })
        );

        const result = await fetchUsersWithRepos('testquery');

        expect(mockedAxios.get).toHaveBeenCalledTimes(3);
        expect(mockedAxios.get).toHaveBeenNthCalledWith(
            1,
            'https://api.github.com/search/users?q=testquery'
        );
        expect(mockedAxios.get).toHaveBeenNthCalledWith(
            2,
            'https://api.github.com/users/user1/repos'
        );
        expect(mockedAxios.get).toHaveBeenNthCalledWith(
            3,
            'https://api.github.com/users/user2/repos'
        );

        expect(result).toEqual([
            {
                username: 'user1',
                repos: [
                    { title: 'repo1', stars: 3, description: 'desc1' },
                    { title: 'repo2', stars: 1, description: '-' }, 
                ],
            },
            {
                username: 'user2',
                repos: [
                    { title: 'repoA', stars: 5, description: 'descA' },
                ],
            },
        ]);
    });

    test('returns empty array when no users found', async () => {
        mockedAxios.get.mockResolvedValueOnce({
            data: { items: [] },
        });

        const result = await fetchUsersWithRepos('nope');

        expect(mockedAxios.get).toHaveBeenCalledTimes(1);
        expect(result).toEqual([]);
    });
});
