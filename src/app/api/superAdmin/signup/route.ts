import superAdminModel from "@/model/superAdmin.model";
import UserModel from "@/model/User.model";
import dbConnect from "@/utils/dbConnect";
import signupSuperAdminZodSchema from "@/zod schemas/Auth Schemas/Signup/SignupSuperAdminZodSchema";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const body = await req.json();

    console.log("body", body);

    let validatedData;

    try {
      validatedData = signupSuperAdminZodSchema.parse(body);
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

    const existingUser = await UserModel.findOne();

    if (existingUser) {
      NextResponse.json(
        {
          success: false,
          message: "Super Admin already existed",
        },
        { status: 444 }
      );
    }

    const superAdminData = {
      ...validatedData,
      role: "superAdmin",
      status: "Active",
      isActive: "true",
    };

    const user = await UserModel.create(superAdminData);
    const superAdminProfile = await superAdminModel.create({
      userId: user._id,
    });

    const createdUser = await UserModel.findById(user?._id).select("-password");

    return NextResponse.json(
      {
        success: true,
        data: {
          data: superAdminProfile,
          message: "Sign up successfull - superAdmin",
        },
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 400 });
  }
}
