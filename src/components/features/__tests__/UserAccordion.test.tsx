import { render, screen, fireEvent } from '@testing-library/react';
import UserAccordion from '../UserAcordion';

const mockUser = {
    username: 'hsib19',
    repos: [
        {
            title: 'repo-1',
            stars: 10,
            description: 'Test repo 1',
        },
        {
            title: 'repo-2',
            stars: 20,
            description: 'Test repo 2',
        },
    ],
};

describe('UserAccordion', () => {
    test('renders username', () => {
        render(
            <UserAccordion
                user={mockUser}
                index={0}
                isOpen={false}
                onToggle={() => { }}
            />
        );
        expect(screen.getByTestId('user-username')).toHaveTextContent('hsib19');
    });

    test('calls onToggle when header is clicked', () => {
        const onToggleMock = jest.fn();
        render(
            <UserAccordion
                user={mockUser}
                index={0}
                isOpen={false}
                onToggle={onToggleMock}
            />
        );

        const header = screen.getByTestId('accordion-header-0');
        fireEvent.click(header);

        expect(onToggleMock).toHaveBeenCalledTimes(1);
        expect(onToggleMock).toHaveBeenCalledWith(0);
    });

    test('renders repo items when accordion is open', () => {
        render(
            <UserAccordion
                user={mockUser}
                index={0}
                isOpen={true}
                onToggle={() => { }}
            />
        );

        const titles = screen.getAllByTestId('repo-title').map(el => el.textContent);
        expect(titles).toEqual(['repo-1', 'repo-2']);

        expect(screen.getByTestId('repo-item-0')).toBeInTheDocument();
        expect(screen.getByTestId('repo-item-1')).toBeInTheDocument();

        const descriptionTexts = screen.getAllByTestId('repo-description').map(el => el.textContent);
        expect(descriptionTexts).toEqual(['Test repo 1', 'Test repo 2']);

    });

    test('does not render repos when accordion is closed', () => {
        render(
            <UserAccordion
                user={mockUser}
                index={0}
                isOpen={false}
                onToggle={() => { }}
            />
        );

        expect(screen.queryByTestId('repo-item-0')).not.toBeInTheDocument();
    });
});
