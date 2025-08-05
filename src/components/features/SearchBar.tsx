import React from 'react';
import Spinner from '../common/Spinner';

interface SearchBarProps {
    input: string;
    setInput: (value: string) => void;
    onSearch: () => void;
    loading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ input, setInput, onSearch, loading }) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && input.trim().length > 0 && !loading) {
            onSearch();
        }
    };

    return (
        <>
            <input
                data-testid="username-input"
                type="text"
                placeholder="Enter username"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                data-testid="search-button"
                onClick={onSearch}
                disabled={input.trim().length === 0 || loading}
                className={`w-full mt-4 py-2 rounded-lg flex items-center justify-center transition text-white ${loading || input.trim().length === 0
                        ? 'bg-blue-300 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700'
                    }`}
            >
                {loading ? (
                    <Spinner size={14} text="Loading..." />
                ) : (
                    'Search'
                )}
            </button>
        </>
    );
};

export default SearchBar;
