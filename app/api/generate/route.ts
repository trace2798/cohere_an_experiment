import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  console.log("API");
  try {
    console.log(req.body, "BODY BODY BODY");
    const body = await req.json();
    const cohereApiUrl = "https://api.cohere.ai/v1/generate";
    const cohereApiKey = process.env.COHERE_API_KEY; // Use your environment variable here

    const options = {
      method: "POST",
      url: cohereApiUrl,
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        authorization: cohereApiKey,
      },
      data: {
        prompt: body.prompt,
        model: body.model,
        num_generations: body.num_generations,
        max_tokens: body.max_tokens,
        temperature: body.temperature,
        truncate: body.truncate,
      },
    };
    console.log(options, "GENERATE");
    const response = await axios.request(options);
    console.log(response, "RESPONSE GENERATE")
    const responseData = response.data;
    return NextResponse.json(responseData);
  } catch (error) {
    console.log("[GENERATE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
