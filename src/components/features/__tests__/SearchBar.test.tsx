import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../SearchBar';

describe('SearchBar component', () => {
    test('renders input with placeholder and empty value', () => {
        render(<SearchBar input="" setInput={() => { }} onSearch={() => { }} loading={false} />);
        const input = screen.getByTestId('username-input');

        expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute('type', 'text');
        expect(input).toHaveValue('');
    });

    test('calls setInput with typed value', () => {
        const mockSetInput = jest.fn();
        render(<SearchBar input="" setInput={mockSetInput} onSearch={() => { }} loading={false} />);
        const input = screen.getByTestId('username-input');

        fireEvent.change(input, { target: { value: 'hsib19' } });

        expect(mockSetInput).toHaveBeenCalledTimes(1);
        expect(mockSetInput).toHaveBeenCalledWith('hsib19');
    });

    test('disables button when input is empty', () => {
        render(<SearchBar input=" " setInput={() => { }} onSearch={() => { }} loading={false} />);
        const button = screen.getByTestId('search-button');

        expect(button).toBeDisabled();
        expect(button).toHaveClass('cursor-not-allowed');
    });

    test('disables button during loading', () => {
        render(<SearchBar input="hsib19" setInput={() => { }} onSearch={() => { }} loading={true} />);
        const button = screen.getByTestId('search-button');

        expect(button).toBeDisabled();
        expect(button).toHaveClass('cursor-not-allowed');
    });

    test('shows loading spinner and text when loading is true', () => {
        render(<SearchBar input="hsib19" setInput={() => { }} onSearch={() => { }} loading={true} />);
        const loadingText = screen.getByText(/loading/i);

        expect(loadingText).toBeInTheDocument();
        expect(loadingText.closest('button')).toBeDisabled();
    });

    test('calls onSearch when Enter is pressed with valid input', () => {
        const mockSearch = jest.fn();
        render(<SearchBar input="hsib19" setInput={() => { }} onSearch={mockSearch} loading={false} />);
        const input = screen.getByTestId('username-input');

        fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

        expect(mockSearch).toHaveBeenCalledTimes(1);
    });

    test('does not call onSearch when Enter is pressed and input is empty', () => {
        const mockSearch = jest.fn();
        render(<SearchBar input="   " setInput={() => { }} onSearch={mockSearch} loading={false} />);
        const input = screen.getByTestId('username-input');

        fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

        expect(mockSearch).not.toHaveBeenCalled();
    });

    test('does not call onSearch when Enter is pressed and loading is true', () => {
        const mockSearch = jest.fn();
        render(<SearchBar input="hsib19" setInput={() => { }} onSearch={mockSearch} loading={true} />);
        const input = screen.getByTestId('username-input');

        fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

        expect(mockSearch).not.toHaveBeenCalled();
    });
});
