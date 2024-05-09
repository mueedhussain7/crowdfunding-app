import React, { InputHTMLAttributes } from 'react';

interface SearchProps extends InputHTMLAttributes<HTMLInputElement> { }

const Search: React.FC<SearchProps> = (props) => {
    return (
        <div className="relative">
            <label htmlFor="Search" className="sr-only">Search</label>
            <input
                {...props}
                type="text"
                id={props.id || "Search"}
                className={`mr-12 w-full rounded-md border-primary bg-primary bg-opacity-10 px-4 py-2 shadow-sm sm:text-sm border rounded-md text-text placeholder-primary ${props.className}`}
            />

            <span className="absolute inset-y-0 right-0 grid w-10 place-content-center">
                <button type="button" className="text-gray-600 hover:text-gray-700">
                    <span className="sr-only">Search</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="#ffffff"
                        className="h-4 w-4"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                        />
                    </svg>
                </button>
            </span>
        </div>
    );
}



export { Search }
