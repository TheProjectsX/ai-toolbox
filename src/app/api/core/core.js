import { AI_SYSTEM_PROMPTS } from "./prompts";
import randomUseragent from "random-useragent";

const API_URL = "https://liveweave.com/ai/apicall.php";
const API_Headers = {
    accept: "*/*",
    "accept-language": "en-US,en;q=0.9",
    "content-type": "application/json",
    origin: "https://liveweave.com",
    priority: "u=1, i",
    referer: "https://liveweave.com/ai/",
    "sec-ch-ua":
        '"Google Chrome";v="129", "Not=A?Brand";v="8", "Chromium";v="129"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"Windows"',
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "user-agent": "",
    "x-requested-with": "XMLHttpRequest",
};
const API_Body = {
    model: "gpt-3.5-turbo",
    messages: [],
    max_tokens: null,
    n: 1,
    stop: null,
    temperature: 0.3,
};

export const execute_request = async (tool_code, user_input) => {
    const system_prompt = AI_SYSTEM_PROMPTS[tool_code];

    const messages = [
        {
            role: "system",
            content: system_prompt,
        },
        {
            role: "user",
            content: user_input,
        },
    ];

    const apiHeaders = {
        ...API_Headers,
        "user-agent": randomUseragent.getRandom(),
    };
    const apiBody = { ...API_Body, messages };

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: apiHeaders,
            body: JSON.stringify(apiBody),
        });

        const data = await response.json();
        const aiResponse = data.choices[0]?.message?.content;
        return {
            response: {
                success: true,
                content: aiResponse,
            },
            statusCode: 200,
        };
    } catch (error) {
        console.log(error);
        return {
            response: {
                success: false,
                message: "Internal Server error, Please try again!",
                error: error,
            },
            statusCode: 500,
        };
    }
};
