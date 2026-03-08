export function generate(state: State): Partial<State> {
    const answer = `AI trả lời: ${state.question}`

    return {
        answer
    }
}