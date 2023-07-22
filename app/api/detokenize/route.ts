import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  console.log("API");
  try {
    console.log(req.body, "BODY BODY BODY");
    const body = await req.json();
    const cohereApiUrl = "https://api.cohere.ai/v1/detokenize";
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
        tokens: body.tokens,
        model: body.model,
      },
    };
    console.log(options, "DeToKENIZE");
    const response = await axios.request(options);
    const responseData = response.data;
    return NextResponse.json(responseData);
  } catch (error) {
    console.log("[DeToKENIZE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
