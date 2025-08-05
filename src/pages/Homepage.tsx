import React, { useState, useCallback, useEffect } from 'react';
import type { User } from '../types';
import SearchBar from '../components/features/SearchBar';
import UserAccordion from '../components/features/UserAcordion';
import { fetchUsersWithRepos } from '../services/githubService';

const Homepage: React.FC = () => {
    const [input, setInput] = useState('');
    const [searchResult, setSearchResult] = useState<User[]>([]);
    const [openAccordion, setOpenAccordion] = useState<number | null>(null);
    const [loadingUser, setLoadingUser] = useState(false);

    useEffect(() => {
        document.title = 'GitHub Repositories Explorer';
        const meta = document.querySelector("meta[name='description']");
        if (meta) {
            meta.setAttribute('content', 'GitHub repositories explorer');
        }
    }, []);

    const handleSearch = useCallback(async () => {
        setLoadingUser(true);
        setSearchResult([]);
        setOpenAccordion(null);

        try {
            const result = await fetchUsersWithRepos(input);
            setSearchResult(result);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoadingUser(false);
        }
    }, [input]);

    const toggleAccordion = useCallback((index: number) => {
        setOpenAccordion((prev) => (prev === index ? null : index));
    }, []);

    return (
        <div className="min-h-screen flex flex-col items-center justify-start bg-gray-100 py-6 px-4">
            <div className="w-full max-w-xl bg-white p-6 rounded-xl shadow-md">
                <h2 className="capitalize font-bold text-xl pb-3 border-b border-gray-300 mb-4">
                    GitHub Repositories Explorer
                </h2>

                <SearchBar
                    input={input}
                    setInput={setInput}
                    onSearch={handleSearch}
                    loading={loadingUser}
                />

                {!loadingUser && searchResult.length > 0 && (
                    <p className="mt-4 text-sm text-gray-500" data-testid="search-result-info">
                        Showing users for "<span className="font-medium">{input}</span>"
                    </p>
                )}
            </div>

            <div className="w-full max-w-xl mt-6 space-y-4">
                {!loadingUser &&
                    searchResult.map((user, index) => (
                        <UserAccordion
                            key={user.username}
                            user={user}
                            index={index}
                            isOpen={openAccordion === index}
                            onToggle={toggleAccordion}
                        />
                    ))}

                {!loadingUser && input && searchResult.length === 0 && (
                    <p data-testid="no-users-message" className="text-gray-400 text-sm text-center">
                        No users found.
                    </p>
                )}
            </div>
        </div>
    );
};

export default Homepage;
