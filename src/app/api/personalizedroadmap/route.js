import { NextResponse } from "next/server";
import { ChatGroq } from "@langchain/groq";
import { PromptTemplate } from '@langchain/core/prompts';


const groqApiKey = process.env.GENERATE_ROADMAP_GROQ_API_KEY;

if (!groqApiKey) {

  throw new Error("GROQ_API_KEY is not set in the environment variables");

}


const llmModel = new ChatGroq({
    model: "gemma2-9b-it", 
    apiKey: groqApiKey,
});


export async function POST(req) {

    try {

      const body = await req.json();

      const promptText = body.textFromNextJSFrontend;
  
      const promptTemplate = PromptTemplate.fromTemplate(`
        {text}
      `);
  
      const formattedTemplate = await promptTemplate.format({ text: promptText });

      const responseFromModel = await llmModel.invoke(formattedTemplate);

      
  
      return NextResponse.json({
        success: true,
        response_from_model: responseFromModel,
      });

    } catch (error) {

      console.error("Error processing request:", error);

      return NextResponse.json(
        { success: false, message: "An error occurred while processing the request." },
        { status: 500 }
      );

    }

}

