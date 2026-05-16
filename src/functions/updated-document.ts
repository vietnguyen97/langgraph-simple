import { Document, VectorStoreIndex } from "llamaindex";
import { Annotation, END, START, StateGraph } from "@langchain/langgraph";


// 1. Tạo dữ liệu demo cho LlamaIndex
const docs = [
    new Document({
        text: "LlamaIndex dùng tốt cho RAG, indexing, retrieval trên dữ liệu riêng.",
    }),
    new Document({
        text: "LangGraph dùng tốt cho workflow, state, routing và agent orchestration.",
    }),
    new Document({
        text: "Có thể kết hợp LlamaIndex để retrieve context, rồi LangGraph để điều phối flow.",
    }),
];

// 2. Build index bằng LlamaIndex
const index = await VectorStoreIndex.fromDocuments(docs);
const queryEngine = index.asQueryEngine();

// 3. Định nghĩa state cho LangGraph
const GraphState = Annotation.Root({
    question: Annotation<string>(),
    context: Annotation<string>(),
    answer: Annotation<string>(),
});

// 4. Node retrieve: gọi LlamaIndex
async function retrieve(state: typeof GraphState.State) {
    const response = await queryEngine.query({
        query: state.question,
    });

    return {
        context: response.toString(),
    };
}

// 5. Node generate: tạo final answer đơn giản
async function generate(state: typeof GraphState.State) {
    return {
        answer: `
Câu hỏi: ${state.question}

Context lấy từ LlamaIndex:
${state.context}

Trả lời:
Bạn có thể dùng LlamaIndex để xử lý phần RAG/retrieval, sau đó dùng LangGraph để điều phối các bước xử lý như retrieve → generate → validate → trả kết quả.
`,
    };
}

// 6. Tạo workflow LangGraph
const graph = new StateGraph(GraphState)
    .addNode("retrieve", retrieve)
    .addNode("generate", generate)
    .addEdge(START, "retrieve")
    .addEdge("retrieve", "generate")
    .addEdge("generate", END)
    .compile();

export const updatedDocument = async (input: string) => {
    try {
        // 7. Run
        const result = await graph.invoke({
            question: input,
        });
        return result
    } catch (error) {
        console.log("Updated error", error)
    }
}
