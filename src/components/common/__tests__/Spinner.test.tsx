import { render, screen } from '@testing-library/react';
import Spinner from '../Spinner';

test('renders spinner with default size and text', () => {
    render(<Spinner text="Loading..." />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
});

test('renders spinner with custom size', () => {
    render(<Spinner size={32} />);
    const spinnerIcon = screen.getByTestId('spinner-icon');
    expect(spinnerIcon).toHaveStyle({ width: '32px', height: '32px' });
});
