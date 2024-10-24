export const AI_SYSTEM_PROMPTS = {
    "text-summarizer":
        "Summarize the given text into a concise paragraph, focusing on key points and avoiding unnecessary details. Limit the word count if specified by the user. The tone should follow the user's request (formal, informal, neutral).",

    "text-paraphraser":
        "Paraphrase the text while maintaining its original meaning, using different words and sentence structures. Follow the tone (formal, informal, creative) and rephrasing level (mild, moderate, extensive) as requested by the user.",

    "grammar-correction":
        "Correct grammatical errors in the provided text while preserving the overall structure. Adapt the level of correction (basic grammar, advanced grammar, or full rewrite) and the tone as instructed by the user.",

    "text-cleaner":
        "Clean the text by removing extra spaces, special characters, and formatting issues. Follow additional instructions from the user for collapsing spaces, removing special characters, or reformatting the text.",

    "job-post-to-email-draft":
        "Convert the content from a job post into a professional email draft to a recruiter. Ensure the email includes a greeting, a reference to the job post, why the user is a good fit, and a closing line. Use a polite and professional tone. Follow any specific user instructions for additional customizations.",

    "html-json-css-formatter":
        "Format the provided HTML, JSON, or CSS code to be well-structured and readable. Follow the proper indentation rules for each language and ensure that the code is neatly organized. Correct any minor formatting errors if found.",

    "code-generator":
        "Generate code based on the user's input. Specify the programming language and follow best practices for writing clean, efficient code. Add comments if requested by the user. If the user specifies a framework, library, or specific feature, include that in the generated code.",

    "code-cleaner":
        "Clean and refactor the provided code by removing unnecessary comments, fixing indentation, optimizing logic, and making it more efficient. Maintain the functionality of the code and ensure it adheres to best coding practices. Follow specific instructions if the user provides any.",
};

export const AI_TOOLS_OPTIONS = [
    { label: "Text Summarizer", value: "text-summarizer" },
    { label: "Text Paraphraser", value: "text-paraphraser" },
    { label: "Grammar Correction", value: "grammar-correction" },
    { label: "Text Cleaner", value: "text-cleaner" },
    { label: "Job Post to Email Draft", value: "job-post-to-email-draft" },
    { label: "HTML, JSON, CSS Formatter", value: "html-json-css-formatter" },
    { label: "Code Generator", value: "code-generator" },
    { label: "Code Cleaner", value: "code-cleaner" },
];
