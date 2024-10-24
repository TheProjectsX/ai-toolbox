import { NextResponse } from "next/server";
import { execute_request } from "../core/core";
import { AI_TOOLS_OPTIONS } from "../core/prompts";

export const POST = async (request) => {
    const { tool, userInput } = await request.json();
    const { response, statusCode } = await execute_request(tool, userInput);

    return NextResponse.json(response, { status: statusCode });
};

export const GET = async (request) => {
    return NextResponse.json(
        { success: true, data: AI_TOOLS_OPTIONS },
        { status: 200 }
    );
};
