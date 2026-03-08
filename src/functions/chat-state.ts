import { StateGraph, Annotation, START, END } from "@langchain/langgraph"
import { BaseMessage } from "@langchain/core/messages"
import { model } from "../config/open-ai.js"

const GraphState = Annotation.Root({
  messages: Annotation<BaseMessage[]>({
    reducer: (x, y) => x.concat(y),
    default: () => []
  })
})

async function chatbot(state: typeof GraphState.State) {
  const response = await model.invoke(state.messages)

  return {
    messages: [response]
  }
}

const builder: any = new StateGraph(GraphState)

builder.addNode("chatbot", chatbot)

builder.addEdge(START, "chatbot")
builder.addEdge("chatbot", END)

export const graph = builder.compile()