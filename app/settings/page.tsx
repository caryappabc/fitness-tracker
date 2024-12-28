"use client"
import React from 'react';
import { redirect } from "next/navigation";

export default function SettingsPage() {
    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4">
            <div className="text-center max-w-2xl mx-auto">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 animate-bounce">
                    🚀 Coming Soon! 🚀
                </h1>
                <p className="text-xl md:text-2xl text-white mb-6 animate-pulse">
                    We&apos;re cooking up something in the settings lab!
                </p>
                <div className="space-y-2">
                    <p className="text-lg text-white/90">
                        Get ready for customization options
                    </p>
                    <p className="text-md text-white/80 italic">
                        (It&apos;ll be worth the wait!)
                    </p>
                    <div className="mt-8">
                        <span className="inline-block animate-spin text-4xl">⚙️</span>
                    </div>
                    <button
                        onClick={async () => {
                            const button = document.activeElement as HTMLButtonElement;
                            button.disabled = true;
                            button.innerHTML = `
                                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Redirecting...
                            `;
                            redirect('/dashboard');
                        }}
                        className="mt-6 px-6 py-2 bg-zinc-50 text-black rounded-lg hover:bg-zinc-400 transition-colors duration-200 flex items-center gap-2"
                    >
                        <span>←</span>
                        Back to Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
}