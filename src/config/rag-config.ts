import "dotenv/config";

import { Settings } from "llamaindex";
import { OpenAI, OpenAIEmbedding } from "@llamaindex/openai";

Settings.llm = new OpenAI({
    model: "gpt-4.1-mini",
    apiKey: process.env.OPENAI_API_KEY,
});

Settings.embedModel = new OpenAIEmbedding({
    model: "text-embedding-3-small",
    apiKey: process.env.OPENAI_API_KEY,
});

// export để file khác chỉ cần import là config được init
export { };