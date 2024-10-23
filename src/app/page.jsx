"use client";

import { useState } from "react";
import ReactSelect from "react-select";

function HomePage() {
    const toolOptions = [
        { label: "Text Summarizer", value: "text-summarizer" },
        { label: "Text Paraphraser", value: "text-paraphraser" },
        { label: "Text Generator", value: "text-generator" },
        { label: "Grammar Corrector", value: "grammar-corrector" },
        { label: "Sentiment Analyzer", value: "sentiment-analyzer" },
        { label: "Keyword Extractor", value: "keyword-extractor" },
        { label: "Language Translator", value: "language-translator" },
        { label: "Tone Analyzer", value: "tone-analyzer" },
        { label: "Text to Lowercase", value: "text-lowercase" },
        { label: "Text to Uppercase", value: "text-uppercase" },
        { label: "Title Case Converter", value: "title-case-converter" },
        { label: "Word Counter", value: "word-counter" },
        { label: "Character Counter", value: "character-counter" },
        { label: "Duplicate Remover", value: "duplicate-remover" },
        { label: "Text Cleaner", value: "text-cleaner" },
    ];

    const [darkMode, setDarkMode] = useState(true);
    const [result, setResult] = useState("");

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div
            className={`${
                darkMode
                    ? "bg-gray-900 text-white dark"
                    : "bg-white text-gray-900"
            } min-h-screen`}
        >
            <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col h-screen">
                {/* Title and Toggle */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">AI Toolkit</h1>
                    <button
                        onClick={toggleDarkMode}
                        className="py-2 px-4 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors"
                    >
                        {darkMode ? "Light Mode" : "Dark Mode"}
                    </button>
                </div>

                {/* Main Section: Flex with grow to fill screen */}
                <div className="flex flex-col md:flex-row flex-grow gap-8">
                    {/* Left Section: Dropdown and Text Input */}
                    <div className="flex flex-col bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md w-full">
                        <h2 className="text-2xl font-semibold mb-4">
                            AI Input Section
                        </h2>
                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col flex-grow"
                        >
                            <label className="block font-medium mb-3 *:text-black">
                                Select AI Tool:
                                <ReactSelect
                                    className="mt-2"
                                    options={toolOptions}
                                    defaultValue={toolOptions[0]}
                                    isSearchable={false}
                                    name="tool"
                                />
                            </label>

                            <label className="font-medium flex-grow flex flex-col mb-3">
                                Enter your text:
                                <textarea
                                    className="mt-2 w-full flex-grow p-2 bg-white dark:bg-gray-700 border rounded-md text-gray-900 dark:text-white"
                                    placeholder="Type your input here..."
                                    name="input"
                                ></textarea>
                            </label>

                            <button
                                type="submit"
                                className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-colors"
                            >
                                Process
                            </button>
                        </form>
                    </div>

                    {/* Right Section: Result */}
                    <div className="flex flex-col bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md w-full">
                        <h2 className="text-2xl font-semibold mb-4">Result</h2>
                        <div
                            className={`flex-grow min-h-[200px] p-4 border rounded-md text-lg ${
                                result
                                    ? "text-green-600 dark:text-green-400"
                                    : "text-gray-600 dark:text-gray-400"
                            }`}
                        >
                            {result
                                ? result
                                : "Your processed result will appear here."}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
