export const templatePrompt = (input: string) => {
    try {
        const promt = `
        template = """
            Bạn là một AI assistant.

            Yêu cầu của user:
            {input}

            Hãy:
            - Hiểu đúng ý định
            - Trả lời phù hợp (giải thích / viết / tóm tắt nếu cần)
            - Viết rõ ràng, đúng trọng tâm
            """
        `
    } catch (error) {
        console.error("Error invoking model:templatePrompt ", error);
    }
}