import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  console.log("API");
  try {
    console.log(req.body, "BODY BODY BODY");
    const body = await req.json();
    console.log(body, "BODY BODY");
    const cohereApiUrl = "https://api.cohere.ai/v1/rerank";
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
        query: body.values.query,
        model: body.values.model,
        documents: body.values.documents,
        return_documents: body.values.return_documents,
        top_n: body.values.top_n,
      },
    };
    console.log(options, "SEARCH");
    const response = await axios.request(options);
    console.log(response, "SEARCH BAR")
    const responseData = response.data;
    return NextResponse.json(responseData);
  } catch (error) {
    console.log("[ReRank_SEARCH_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
