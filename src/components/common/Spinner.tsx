import React from 'react';

interface SpinnerProps {
    text?: string;
    size?: number;
}

const Spinner: React.FC<SpinnerProps> = ({ text = 'Loading...', size = 20 }) => {
    const sizeClass = `w-[${size}px] h-[${size}px]`;
    return (
        <div className="flex items-center justify-center gap-2">
            <div
                className={`border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin ${sizeClass}`}
                style={{ width: size, height: size }}
                data-testid="spinner-icon"
            />
            <span className="text-sm text-gray-600">{text}</span>
        </div>
    );
};

export default Spinner;
