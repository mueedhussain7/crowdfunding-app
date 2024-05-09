"use client"
import { FC } from 'react';
import { ChevronUpIcon } from '@heroicons/react/24/outline'; // Example import, replace with actual icons you need
import { Logo } from '..';
import Link from 'next/link';

const Footer: FC = () => {
    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      };
    return (
        <footer className="bg-bg text-text">
            <div className="relative mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 lg:pt-24">
                <div className="absolute right-4 top-4 sm:right-6 sm:top-6 lg:right-8 lg:top-8">
                    <div
                    onClick={handleScrollToTop}
                        className="cursor-pointer inline-block rounded-full bg-primary p-2 shadow transition hover:bg-opacity-90 sm:p-3 lg:p-3"
                    >
                        <span className="sr-only">Back to top</span>
                        <ChevronUpIcon className="h-5 w-5 text-text" />
                    </div>
                </div>

                <div className="lg:flex lg:items-end lg:justify-between">
                    <div>
                        <div className="flex justify-center lg:justify-start">
                            <Logo />
                        </div>

                        <p className="mx-auto mt-6 max-w-md text-center leading-relaxed lg:text-left">
                          Stay connected with BitRaise to discover innovative crowdfunding projects and opportunities. Join our community and support groundbreaking ideas today. Together, we can make a difference!
                        </p>
                    </div>

                    <ul className="mt-12 flex flex-wrap justify-center gap-6 lg:mt-0 lg:justify-end md:gap-8 lg:gap-12">
                        <li><Link className="transition hover:text-opacity-75 hover:text-primary hover:cursor-pointer" href="#"> How It works? </Link></li>
                        <li><Link className="transition hover:text-opacity-75 hover:text-primary hover:cursor-pointer" href="#"> Vision </Link></li>
                        <li><Link className="transition hover:text-opacity-75 hover:text-primary hover:cursor-pointer" href="#"> About Us </Link></li>
                    </ul>
                </div>

                <p className="mt-12 text-center text-sm lg:text-right">
                   BSc Computer Science - Westminster - Final Year Project 2024.
                </p>
            </div>
        </footer>
    );
}

export { Footer };
