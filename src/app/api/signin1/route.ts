import UserModel from "@/model/User.model";
import dbConnect from "@/utils/dbConnect";
import loginZodSchema from "@/zod schemas/Auth Schemas/Login/LoginZschema";
import { NextRequest, NextResponse } from "next/server"; // Use NextRequest and NextResponse
import { z } from "zod";

export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const body = await req.json(); // Use `json()` method to parse body

    console.log(body);
    let validatedData;

    try {
      validatedData = loginZodSchema.parse(body);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return NextResponse.json(
          {
            success: false,
            errors: error.errors.map((e) => ({
              field: e.path[0],
              message: e.message,
            })),
          },
          { status: 400 }
        );
      }
    }

    const email = validatedData?.email;

    console.log("email", email);

    return NextResponse.json(
      { success: true, data: "Login successfull" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 400 });
  }
}
