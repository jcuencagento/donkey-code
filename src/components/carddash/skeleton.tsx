import React from 'react';

const CardDashSkeleton = () => {
    return (
        <div className="hidden lg:flex lg:justify-between lg:align-center lg:rounded-lg lg:bg-midnight lg:transition-all lg:hover:shadow-lg">
            <div className="w-[70%] m-6">
                <div className="flex items-center mt-0.5">
                    <div className="w-24 h-6"></div>
                </div>
                <div className="mt-2">
                    <div className="w-24 h-4 mt-1"></div>
                    <div className="w-20 h-4 mt-2"></div>
                </div>
                <div className="mt-2">
                    <div className="w-20 h-4"></div>
                </div>
            </div>
        </div>
    );
};

export default CardDashSkeleton;