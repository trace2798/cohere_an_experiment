import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  console.log("API");
  try {
    console.log(req.body, "BODY BODY BODY");
    const body = await req.json();
    console.log(body, "BODY BODY");
    const cohereApiUrl = "https://api.cohere.ai/v1/classify";
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
        inputs: body.values.inputs,
        model: body.values.model,
        examples: body.values.examples,
        truncate: body.values.truncate,
      },
    };
    console.log(options, "CLASSIFY");
    const response = await axios.request(options);
    console.log(response, "RESPONSE CLASSIFY")
    const responseData = response.data;
    return NextResponse.json(responseData);
  } catch (error) {
    console.log("[CLASSSIFY_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// Errors:
//  data: {
// message: 'invalid request: min classes for classify request is 2 - received 1'
// data: {
//     message: 'invalid request: each unique label must have at least 2 examples. Not enough examples for: Spam'
//   }
// }

