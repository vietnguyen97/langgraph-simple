import express, { Request } from 'express';
import { testLLM } from './src/functions/test-llm.js';
import { HumanMessage } from '@langchain/core/messages';
import { graph } from './src/functions/chat-state.js';

const app = express();
const port: number = 3000;

app.get('/', (req: Request, res: any) => {
    res.send('API working');
})

app.get('/test-llm', async (req: Request, res: any) => {
    try {
        const resp = await testLLM("Tôi đang muốn tìm hiểu langgraph, bạn có thể giải thích cho tôi về nó được không?");
        console.log(resp);
        res.send(resp);
    } catch (error) {
        console.error("Error invoking model:", error);
    }
})

app.post("/chat", async (req, res) => {
    try {
        let messages: any[] = []
        const userMessage = req.body.message

        messages.push(new HumanMessage(userMessage))

        const result = await graph.invoke({
            messages
        })
        messages = result.messages
        const last = result.messages[result.messages.length - 1]
        res.json({
            reply: last.content
        })
    } catch (error) {
        console.error("Error invoking graph:", error);
    }
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});