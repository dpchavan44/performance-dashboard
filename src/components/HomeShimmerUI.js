import React from 'react';

const HomeShimmerUI = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen w-full">
            <div className="animate-pulse w-full space-y-4">
                <div className="h-8 bg-gray-300 rounded w-3/12 mx-auto"></div>
                <div className="h-56 bg-gray-300 rounded w-1/4 mx-auto"></div>
                <div className="h-8 bg-gray-300 rounded w-1/2 mx-auto"></div>
            </div>
            <div className="animate-pulse w-full space-y-4 pt-4">
                <div className="h-80 bg-gray-300 rounded w-2/3 mx-auto"></div>
                <div className="h-8 bg-gray-300 rounded w-1/4 mx-auto"></div>
            </div>
        </div>
    );
};

export default HomeShimmerUI;