"use client";

import { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import dynamic from "next/dynamic";

const ReactSelect = dynamic(() => import("react-select"), { ssr: false });

function HomePage() {
    const [toolOptions, setToolOptions] = useState([
        { label: "Text Summarizer", value: "text-summarizer" },
        { label: "Text Paraphraser", value: "text-paraphraser" },
        { label: "Grammar Correction", value: "grammar-correction" },
        { label: "Text Cleaner", value: "text-cleaner" },
        { label: "Job Post to Email Draft", value: "job-post-to-email-draft" },
        {
            label: "HTML, JSON, CSS Formatter",
            value: "html-json-css-formatter",
        },
        { label: "Code Generator", value: "code-generator" },
        { label: "Code Cleaner", value: "code-cleaner" },
    ]);
    const [darkMode, setDarkMode] = useState(true);
    const [result, setResult] = useState("");
    const [loading, setLoading] = useState(false);

    // Load options from Server
    useEffect(() => {
        fetch("/api/perform")
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setToolOptions(data.data);
                }
            });
    }, []);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const form = e.target;
        const body = {
            tool: form.tool.value,
            userInput: form.userInput.value,
        };

        try {
            const responseData = await (
                await fetch("/api/perform", {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify(body),
                })
            ).json();

            console.log(responseData);
            if (responseData.success) {
                setResult(responseData.content);
            } else {
                setResult(responseData.message);
            }
        } catch (error) {
            setResult(error);
        }

        setLoading(false);
    };

    return (
        <div
            className={`${
                darkMode
                    ? "bg-gray-900 text-white dark"
                    : "bg-white text-gray-900"
            } min-h-screen`}
        >
            <div className="max-w-7xl min-h-screen mx-auto px-4 py-8 flex flex-col">
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
                                    name="userInput"
                                    required
                                ></textarea>
                            </label>

                            <button
                                type="submit"
                                className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-colors flex justify-center"
                                disabled={loading}
                            >
                                {loading ? (
                                    <div role="status">
                                        <svg
                                            aria-hidden="true"
                                            className="w-8 h-8 text-gray-200 animate-spin dark:text-white fill-blue-600"
                                            viewBox="0 0 100 101"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                fill="currentColor"
                                            />
                                            <path
                                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                fill="currentFill"
                                            />
                                        </svg>
                                        <span className="sr-only">
                                            Loading...
                                        </span>
                                    </div>
                                ) : (
                                    "Process"
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Right Section: Result */}
                    <div className="flex flex-col bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md w-full">
                        <div className="flex justify-between mb-4">
                            <h2 className="text-2xl font-semibold">Result</h2>
                            <div className="flex gap-4">
                                <CopyToClipboard
                                    text={result}
                                    onCopy={() => {
                                        console.log("copied");
                                    }}
                                >
                                    <button
                                        type="submit"
                                        className={`py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-500 transition-colors ${
                                            result
                                                ? "cursor-pointer"
                                                : "cursor-not-allowed"
                                        }`}
                                        disabled={!result}
                                    >
                                        Copy
                                    </button>
                                </CopyToClipboard>

                                <button
                                    type="submit"
                                    className="py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-500 transition-colors"
                                    onClick={() => {
                                        setResult("");
                                    }}
                                >
                                    Clear
                                </button>
                            </div>
                        </div>

                        <div
                            className={`mb-4 flex-grow whitespace-break-spaces min-h-[200px] px-4 py-2.5 border rounded-md text-lg ${
                                result
                                    ? "text-white dark:text-white"
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
