"use client";

import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, Mic, MicOff, Volume2, VolumeX, Sparkles, Bot } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useProjects } from "@/stores/projects-store";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: Date;
  projectsRef?: any[];
}

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "bot",
      text: "Hello! I am Kiwik.1 AI assistant. Ask me anything about Criska's projects, tech stack, or team members. You can also use the microphone to talk to me!",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const projects = useProjects();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  // Speech Recognition Setup
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const rec = new SpeechRecognition();
        rec.continuous = false;
        rec.interimResults = false;
        rec.lang = "en-US";

        rec.onstart = () => {
          setIsListening(true);
        };

        rec.onresult = (event: any) => {
          const speechToText = event.results[0][0].transcript;
          setInputValue(speechToText);
          handleSend(speechToText);
        };

        rec.onerror = (e: any) => {
          console.error("Speech recognition error", e);
          setIsListening(false);
        };

        rec.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = rec;
      }
    }
  }, [projects]);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition is not supported in this browser. Try Chrome or Safari.");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
  };

  const speakText = (text: string) => {
    if (isMuted || typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const cleanText = text.replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1"); // remove markdown links
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || inputValue).trim();
    if (!query) return;

    const userMessage: Message = { id: `user-${Date.now()}`, sender: "user", text: query, timestamp: new Date() };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          projectsContext: projects,
        }),
      });

      if (response.ok) {
        const resData = await response.json();
        if (!resData.fallback && resData.reply) {
          setMessages((prev) => [
            ...prev,
            {
              id: `bot-${Date.now()}`,
              sender: "bot",
              text: resData.reply,
              timestamp: new Date(),
            },
          ]);
          speakText(resData.reply);
          return;
        }
      }
    } catch (err) {
      console.warn("Error calling chat API, falling back to local processing", err);
    }

    // Local fallback processing
    const { text, matchedProjects } = generateResponse(query);
    setMessages((prev) => [
      ...prev,
      {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text,
        timestamp: new Date(),
        projectsRef: matchedProjects,
      },
    ]);
    speakText(text);
  };

  const generateResponse = (query: string): { text: string; matchedProjects: any[] } => {
    const lowerQuery = query.toLowerCase();
    let matchedProjects: any[] = [];
    let text = "";

    // 1. Check for specific project query
    const matchingProj = projects.find((p) => lowerQuery.includes(p.name.toLowerCase()) || p.slug.split("-").some(part => lowerQuery.includes(part)));

    if (matchingProj) {
      matchedProjects = [matchingProj];
      text = `Here are the details on **${matchingProj.name}** (${matchingProj.category} project, v${matchingProj.version || "1.0.0"}): \n\n* **Status**: ${matchingProj.status.replace("-", " ")} (${matchingProj.completionPercent}% complete)\n* **Tagline**: ${matchingProj.tagline}\n* **Stack**: ${matchingProj.techStack.map(t => t.name).join(", ")}\n\nYou can click below to explore its live edge monitor or full documentation.`;
      return { text, matchedProjects };
    }

    // 2. Check for technology queries
    const techMatches = projects.filter((p) =>
      p.techStack.some((t) => lowerQuery.includes(t.name.toLowerCase()))
    );

    if (techMatches.length > 0 && (lowerQuery.includes("tech") || lowerQuery.includes("stack") || lowerQuery.includes("react") || lowerQuery.includes("next") || lowerQuery.includes("tailwind") || lowerQuery.includes("prisma") || lowerQuery.includes("postgres") || lowerQuery.includes("ai") || lowerQuery.includes("python"))) {
      matchedProjects = techMatches;
      text = `I found ${techMatches.length} project(s) matching your requested stack: \n\n${techMatches
        .map((p) => `* **${p.name}** — ${p.tagline} (${p.category})`)
        .join("\n")}\n\nCheck out the quick action links below to view them!`;
      return { text, matchedProjects };
    }

    // 3. Status queries
    if (lowerQuery.includes("progress") || lowerQuery.includes("complete") || lowerQuery.includes("status")) {
      const inProgress = projects.filter((p) => p.status === "in-progress");
      const completed = projects.filter((p) => p.status === "completed");
      text = `Our edge operating system currently tracks **${projects.length} total projects**:\n\n* **Completed**: ${completed.length} project(s)\n* **In Progress**: ${inProgress.length} project(s)\n\nAsk me about any specific project (e.g. "CriskaCloud") to get deep statistics!`;
      return { text, matchedProjects };
    }

    // 4. Default fallbacks
    if (lowerQuery.includes("hello") || lowerQuery.includes("hi ") || lowerQuery.includes("hey")) {
      text = "Hi there! Welcome to Kiwik.1. Ask me about our projects (like CriskaAI, CriskaCloud), tech stack, or edge latency stats!";
    } else if (lowerQuery.includes("who are you") || lowerQuery.includes("what is this")) {
      text = "This is Kiwik.1, the central Operating System of Criska projects. I am an on-board semantic AI designed to index and answer queries about Criska's applications.";
    } else {
      // General match
      text = `I'm here to help you navigate our ecosystems! I'm indexing **${projects.length} Criska projects**: ${projects.map(p => p.name).join(", ")}. Ask me about any of these!`;
    }

    return { text, matchedProjects };
  };

  return (
    <>
      {/* Floating Chat Trigger Button */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="px-4 py-2.5 rounded-full bg-glass-bg border border-glass-border shadow-xl backdrop-blur-xl text-xs font-semibold text-text-primary flex items-center gap-2 cursor-pointer hover:bg-glass-bg-hover transition-colors"
              onClick={() => setIsOpen(true)}
            >
              <Sparkles className="w-3.5 h-3.5 text-accent-blue animate-pulse" />
              <span>Ask Kiwik AI</span>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "p-4 rounded-full shadow-2xl transition-all active:scale-95 flex items-center justify-center border",
            isOpen
              ? "bg-rose-500 hover:bg-rose-600 text-white border-rose-500/20"
              : "bg-accent-blue hover:bg-blue-600 text-white border-blue-500/20"
          )}
          aria-label="Toggle AI Assistant"
        >
          {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
        </button>
      </div>

      {/* Chat Window Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="fixed bottom-24 right-6 w-[90vw] sm:w-[420px] h-[580px] rounded-2xl border border-glass-border bg-glass-bg backdrop-blur-3xl shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-bg-secondary/60 border-b border-divider flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-accent-blue/15 flex items-center justify-center border border-accent-blue/30 text-accent-blue">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-serif font-bold text-text-primary flex items-center gap-1.5">
                    Kiwik Assistant
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  </h3>
                  <p className="text-[10px] text-text-secondary">On-board Project Telemetry</p>
                </div>
              </div>

              {/* Sound Settings */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className={cn(
                    "p-2 rounded-lg transition-colors",
                    isMuted ? "text-text-secondary hover:text-text-primary" : "text-accent-blue bg-accent-blue/10"
                  )}
                  title={isMuted ? "Unmute speech feedback" : "Mute speech feedback"}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg text-text-secondary hover:text-text-primary transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Conversation Log */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn("flex flex-col max-w-[85%]", {
                    "self-end ml-auto items-end": msg.sender === "user",
                    "self-start mr-auto items-start": msg.sender === "bot",
                  })}
                >
                  <div
                    className={cn("p-3 rounded-2xl text-xs leading-relaxed", {
                      "bg-accent-blue text-white rounded-tr-none": msg.sender === "user",
                      "bg-bg-secondary/60 border border-glass-border text-text-primary rounded-tl-none":
                        msg.sender === "bot",
                    })}
                  >
                    {msg.text}
                  </div>

                  {/* Render Quick Project Reference Cards */}
                  {msg.projectsRef && msg.projectsRef.length > 0 && (
                    <div className="mt-2 w-full space-y-2">
                      {msg.projectsRef.map((proj) => (
                        <Link
                          key={proj.id}
                          href={`/projects/${proj.slug}`}
                          className="block p-2 rounded-xl bg-glass-bg-hover hover:bg-glass-bg-active border border-glass-border transition-colors text-[11px]"
                          onClick={() => setIsOpen(false)}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-text-primary">{proj.name}</span>
                            <span className="text-[9px] uppercase font-mono px-1.5 py-0.5 rounded bg-glass-bg border border-glass-border text-text-secondary">
                              {proj.category}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}

                  <span className="text-[9px] text-text-secondary mt-1 font-mono">
                    {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form Controls */}
            <div className="p-3 border-t border-divider bg-bg-secondary/40">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2 bg-glass-bg border border-glass-border rounded-xl px-3 py-1.5"
              >
                {/* Voice button */}
                <button
                  type="button"
                  onClick={toggleListening}
                  className={cn(
                    "p-2 rounded-lg transition-colors flex items-center justify-center shrink-0",
                    isListening
                      ? "bg-rose-500/20 text-rose-500 animate-pulse border border-rose-500/30"
                      : "text-text-secondary hover:text-text-primary"
                  )}
                  title={isListening ? "Listening... click to stop" : "Start speaking"}
                >
                  {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </button>

                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={isListening ? "Listening to your voice..." : "Ask Kiwik AI..."}
                  className="flex-1 bg-transparent border-none text-xs text-text-primary focus:outline-none placeholder:text-text-secondary/50 font-medium"
                />

                <button
                  type="submit"
                  className="p-1.5 rounded-lg bg-accent-blue hover:bg-blue-600 text-white transition-colors flex items-center justify-center shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
