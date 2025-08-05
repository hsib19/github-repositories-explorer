import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Homepage from '../Homepage';
import * as githubService from '../../services/githubService';

// Mock fetchUsersWithRepos
jest.mock('../../services/githubService');

const mockUser = {
    username: 'hsib19',
    repos: [
        { title: 'repo-1', stars: 10, description: 'Test repo 1' },
        { title: 'repo-2', stars: 5, description: 'Test repo 2' },
    ],
};

describe('Homepage', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders input and search button', () => {
        render(<Homepage />);
        expect(screen.getByTestId('username-input')).toBeInTheDocument();
        expect(screen.getByTestId('search-button')).toBeInTheDocument();
    });

    test('searches and displays user data', async () => {
        (githubService.fetchUsersWithRepos as jest.Mock).mockResolvedValueOnce([mockUser]);

        render(<Homepage />);
        const input = screen.getByTestId('username-input');
        const button = screen.getByTestId('search-button');

        fireEvent.change(input, { target: { value: 'hsib19' } });
        fireEvent.click(button);

        await waitFor(() => {
            expect(screen.getByTestId('search-result-info')).toBeInTheDocument();
        });

        expect(screen.getByTestId('user-username')).toHaveTextContent('hsib19');
    });

    test('shows "No users found" when API returns empty array', async () => {
        (githubService.fetchUsersWithRepos as jest.Mock).mockResolvedValueOnce([]);

        render(<Homepage />);
        fireEvent.change(screen.getByTestId('username-input'), {
            target: { value: 'unknown' },
        });
        fireEvent.click(screen.getByTestId('search-button'));

        await waitFor(() => {
            expect(screen.getByTestId('no-users-message')).toBeInTheDocument();
        });
    });

    test('expands accordion on user click', async () => {
        (githubService.fetchUsersWithRepos as jest.Mock).mockResolvedValueOnce([mockUser]);

        render(<Homepage />);
        fireEvent.change(screen.getByTestId('username-input'), {
            target: { value: 'hsib19' },
        });
        fireEvent.click(screen.getByTestId('search-button'));

        await waitFor(() => {
            expect(screen.getByTestId('user-username')).toBeInTheDocument();
        });

        fireEvent.click(screen.getByTestId('user-username'));

        await waitFor(() => {
            const titles = screen.getAllByTestId('repo-title').map(el => el.textContent);
            expect(titles).toEqual(['repo-1', 'repo-2']);

            expect(screen.getByTestId('repo-item-0')).toBeInTheDocument();
            expect(screen.getByTestId('repo-item-1')).toBeInTheDocument();

            const descriptionTexts = screen.getAllByTestId('repo-description').map(el => el.textContent);
            expect(descriptionTexts).toEqual(['Test repo 1', 'Test repo 2']);
        });
    });

    test('closes accordion when clicking the open user again', async () => {
        (githubService.fetchUsersWithRepos as jest.Mock).mockResolvedValueOnce([mockUser]);

        render(<Homepage />);
        fireEvent.change(screen.getByTestId('username-input'), {
            target: { value: 'hsib19' },
        });
        fireEvent.click(screen.getByTestId('search-button'));

        await waitFor(() => {
            expect(screen.getByTestId('user-username')).toBeInTheDocument();
        });

        fireEvent.click(screen.getByTestId('user-username'));

        await waitFor(() => {
            expect(screen.getByTestId('repo-item-0')).toBeInTheDocument();
        });

        fireEvent.click(screen.getByTestId('user-username'));

        await waitFor(() => {
            expect(screen.queryByTestId('repo-item-0')).not.toBeInTheDocument();
            expect(screen.queryByTestId('repo-item-1')).not.toBeInTheDocument();
        });
    });

    test('handles fetch error gracefully', async () => {
        const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => { });
        (githubService.fetchUsersWithRepos as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

        render(<Homepage />);
        fireEvent.change(screen.getByTestId('username-input'), {
            target: { value: 'hsib19' },
        });
        fireEvent.click(screen.getByTestId('search-button'));

        await waitFor(() => {
            expect(consoleErrorMock).toHaveBeenCalledWith('Error fetching users:', expect.any(Error));
        });

        consoleErrorMock.mockRestore();
    });
});
