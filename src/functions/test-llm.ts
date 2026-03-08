import { model } from "../config/open-ai.js";

export const testLLM = async (input: string) => {
    try {
        const resp = await model.invoke(input);
        return resp;
    } catch (error) {
        console.error("Error invoking model:", error);
    }
}