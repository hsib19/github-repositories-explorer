import React from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';
import type { User } from '../../types';

interface UserAccordionProps {
    user: User;
    index: number;
    isOpen: boolean;
    onToggle: (index: number) => void;
}

const UserAccordion: React.FC<UserAccordionProps> = ({
    user,
    index,
    isOpen,
    onToggle,
}) => {
    return (
        <div className="bg-white rounded-lg shadow" data-testid={`user-accordion-${index}`}>
            <div
                onClick={() => onToggle(index)}
                className="flex justify-between items-center p-4 cursor-pointer"
                data-testid={`accordion-header-${index}`}
            >
                <h2 className="text-md font-semibold" data-testid="user-username">
                    {user.username}
                </h2>
                <ChevronDownIcon
                    data-testid="accordion-icon"
                    className={`w-5 h-5 text-gray-500 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''
                        }`}
                />
            </div>

            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? '' : 'max-h-0'
                    }`}
                data-testid={`accordion-content-${index}`}
            >
                {isOpen && (
                    <ul className="p-4 text-sm text-gray-700 bg-gray-50 divide-y divide-gray-300 rounded-b-lg">
                        {user.repos.map((repo, i) => (
                            <li
                                key={i}
                                data-testid={`repo-item-${i}`}
                                className={`py-3 ${i === user.repos.length - 1 ? '' : 'border-b border-gray-300'
                                    }`}
                            >
                                <div className="flex justify-between items-center">
                                    <span className="font-semibold text-base" data-testid="repo-title">
                                        {repo.title}
                                    </span>
                                    <div
                                        className="flex items-center text-gray-500 text-sm"
                                        data-testid="repo-stars"
                                    >
                                        <StarIcon className="w-4 h-4 mr-1 text-yellow-500" />
                                        {repo.stars}
                                    </div>
                                </div>
                                <p className="text-gray-600 text-sm mt-1" data-testid="repo-description">
                                    {repo.description}
                                </p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default UserAccordion;
