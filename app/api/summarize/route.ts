import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  console.log("API");
  try {
    console.log(req.body, "BODY BODY BODY");
    const body = await req.json();
    const values = body; // Assuming the prompt is sent from the client
    const cohereApiUrl = "https://api.cohere.ai/v1/summarize";
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
        text: values.text,
        length: values.length,
        format: values.format, // Use 'json' as the format option for JSON response
        model: values.model,
        extractiveness: values.extractiveness,
      },
    };
    console.log(options);
    const response = await axios.request(options);
    const responseData = response.data;
    return NextResponse.json(responseData);
  } catch (error) {
    console.log("[SUMMARIZE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
