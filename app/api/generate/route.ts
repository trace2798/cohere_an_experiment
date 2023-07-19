import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  console.log("API");
  try {
    console.log(req.body, "BODY BODY BODY");
    const body = await req.json();
    const { prompt }  = body; // Assuming the prompt is sent from the client
    const cohereApiUrl = "https://api.cohere.ai/v1/generate";
    const cohereApiKey = process.env.NEXT_PUBLIC_COHERE_API_KEY; // Use your environment variable here

    const options = {
      method: "POST",
      url: cohereApiUrl,
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        authorization: cohereApiKey,
      },
      data: { prompt, num_generations: 1, max_tokens: 1000 },
    };
    console.log(options);
    const response = await axios.request(options);
    const responseData = response.data;
    return NextResponse.json(responseData);
  } catch (error) {
    console.log("[CONVERSATION_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// // Server-side code (Node.js + Express)
// const express = require("express");
// const axios = require("axios");
// const app = express();
// const port = 3000; // Your desired port

// // Define the API route
// app.post("/api/generate", async (req, res) => {
//   try {
//     const { prompt } = req.body; // Assuming the prompt is sent from the client
//     const cohereApiUrl = "https://api.cohere.ai/v1/generate";
//     const cohereApiKey = process.env.COHERE_API_KEY; // Use your environment variable here

//     const options = {
//       method: "POST",
//       url: cohereApiUrl,
//       headers: {
//         accept: "application/json",
//         "content-type": "application/json",
//         authorization: cohereApiKey,
//       },
//       data: { prompt, num_generations: 1, max_tokens: 1000 },
//     };

//     const response = await axios.request(options);
//     res.json(response.data);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Something went wrong" });
//   }
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
