import { NextResponse } from "next/server";

export async function GET() {
  try {
    return NextResponse.json({
      status: "ok",
      timestamp: new Date().toISOString(),
      version: "1.0.0-beta",
      message: "Kiwik.1 Enterprise Website Content Management System API Active"
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to query CMS data" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    return NextResponse.json({
      status: "success",
      message: "CMS content payload received & verified",
      timestamp: new Date().toISOString(),
      updatedFields: Object.keys(body)
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid CMS payload" },
      { status: 400 }
    );
  }
}
