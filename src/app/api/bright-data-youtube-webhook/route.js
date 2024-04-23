import service from "@/service/server";
import { NextRequest, NextResponse } from "next/server";

/**
 *
 * @param { NextRequest } request
 */
export async function POST(request) {
  // get body safely
  const body = await (async () => {
    try {
      return await request.json();
    } catch (error) {
      return null;
    }
  })();

  const response = await service.insertScrappedData(body);

  return NextResponse.json(response, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });
}
