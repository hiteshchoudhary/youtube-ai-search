import service from "@/service/server";
import { NextRequest, NextResponse } from "next/server";

/**
 * @param { NextRequest } request
 */
export async function POST(request) {
  // get body safely
  const body = await (async () => {
    try {
      return await request.json();
    } catch (error) {
      return {};
    }
  })();

  const { keywords, query } = body;

  // Empty body validator
  if (!(keywords && query))
    return NextResponse.json(
      { success: false, message: "query or keywords is missing" },
      {
        status: 400,
      }
    );

  const response = await service.triggerScraping({ keywords, query });

  return NextResponse.json(response, {
    status: 200,
  });
}
