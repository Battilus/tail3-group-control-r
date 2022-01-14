import React from "react";


const UIbutton = ({ children, ...props }) => {
    return (
        <button
            {...props}
            className="flex items-center justify-center m-4 px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 active:bg-purple-700 md:py-4 md:text-lg md:px-10"
        >
            {children}
        </button>
    );
};

export default UIbutton;
