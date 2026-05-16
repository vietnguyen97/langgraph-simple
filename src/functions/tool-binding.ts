import { tool } from "@langchain/core/tools";
import { z } from 'zod'

// tính toán
export const toolBinding = (a: number, b: number) => {
    try {
        const calculatorTool = tool(
            async ({ a, b }) => {
                return a + b;
            },
            {
                name: "calculator",
                description: "Cộng hai số",
                schema: z.object({
                    a: z.number(),
                    b: z.number(),
                }),
            }
        );
    } catch (error) {
        console.error("Error invoking model:toolBinding ", error);
    }
}