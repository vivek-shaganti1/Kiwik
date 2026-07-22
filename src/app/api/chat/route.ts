import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { messages, projectsContext } = await req.json();

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey || apiKey.startsWith("gsk_KiwikOS")) {
      return NextResponse.json({ fallback: true, error: "Using client fallback (No Groq Key configured)" });
    }

    const systemPrompt = `You are the Kiwik.1 AI Assistant, a high-performance system telemetry agent built for Criska.
You have access to the following projects information from our edge operating system database:
${JSON.stringify(projectsContext, null, 2)}

Answer queries concisely, using standard markdown formatting. Highlight project names, category tags, versions, and stack components. Keep your voice clean, corporate, premium, and professional.
Respond back to the user query immediately.`;

    const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages.map((m: any) => ({
            role: m.sender === "user" ? "user" : "assistant",
            content: m.text,
          })),
        ],
        temperature: 0.7,
        max_tokens: 1024,
      }),
    });

    if (!groqResponse.ok) {
      const errText = await groqResponse.text();
      console.error("Groq API error response:", errText);
      return NextResponse.json({ fallback: true, error: "Groq api failed, using fallback" });
    }

    const data = await groqResponse.json();
    const replyText = data.choices[0].message.content;

    return NextResponse.json({ reply: replyText, fallback: false });
  } catch (error: any) {
    console.error("Error in chat route handler:", error);
    return NextResponse.json({ fallback: true, error: error.message });
  }
}
