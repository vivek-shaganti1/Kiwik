import { NextResponse } from "next/server";

// Keep visitor metrics in-memory to prevent filesystem writes
// in the watched project directory which triggers Next.js dev server hot reload loops.
let visitorMetrics = {
  total: 35247,
  active: 6,
};

export async function GET() {
  // Simulate active session fluctuation
  const change = Math.random() > 0.5 ? 1 : -1;
  visitorMetrics.active = Math.max(2, Math.min(30, visitorMetrics.active + change));
  return NextResponse.json(visitorMetrics);
}

export async function POST() {
  visitorMetrics.total += 1;
  // Fluctuate active visitors slightly
  if (Math.random() > 0.6) {
    visitorMetrics.active = Math.max(2, Math.min(30, visitorMetrics.active + 1));
  }
  return NextResponse.json(visitorMetrics);
}
