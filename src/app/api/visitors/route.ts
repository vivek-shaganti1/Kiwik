import { NextResponse } from "next/server";

// Dynamic in-memory visitor tracking (no static dummy values)
const globalForVisitors = globalThis as unknown as {
  totalVisits: number;
  activeSessions: Map<string, number>;
};

if (typeof globalForVisitors.totalVisits === "undefined") {
  globalForVisitors.totalVisits = 1;
}
if (!globalForVisitors.activeSessions) {
  globalForVisitors.activeSessions = new Map<string, number>();
}

const ACTIVE_WINDOW_MS = 2 * 60 * 1000; // 2 minutes active window

function cleanupAndGetActive(): number {
  const now = Date.now();
  for (const [id, timestamp] of globalForVisitors.activeSessions.entries()) {
    if (now - timestamp > ACTIVE_WINDOW_MS) {
      globalForVisitors.activeSessions.delete(id);
    }
  }
  return Math.max(1, globalForVisitors.activeSessions.size);
}

export async function GET(req: Request) {
  const activeCount = cleanupAndGetActive();
  return NextResponse.json({
    total: globalForVisitors.totalVisits,
    active: activeCount,
  });
}

export async function POST(req: Request) {
  globalForVisitors.totalVisits += 1;

  const clientIp =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    `session-${Math.random().toString(36).substring(2, 9)}`;

  globalForVisitors.activeSessions.set(clientIp, Date.now());
  const activeCount = cleanupAndGetActive();

  return NextResponse.json({
    total: globalForVisitors.totalVisits,
    active: activeCount,
  });
}
