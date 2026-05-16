export function generate(state: State): Partial<State> {
    const answer = `AI trả lời: ${state.question}`

    return {
        answer
    }
}

// template = """
// Bạn là một AI assistant.

// Yêu cầu của user:
// {input}

// Hãy:
// - Hiểu đúng ý định
// - Trả lời phù hợp (giải thích / viết / tóm tắt nếu cần)
// - Viết rõ ràng, đúng trọng tâm
// """