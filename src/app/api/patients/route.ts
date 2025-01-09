import { NextRequest, NextResponse } from 'next/server'; // Use NextRequest and NextResponse 
import dbConnect from '@/utils/dbConnect';
import PatientModel from '@/model/Patient.model';
import { z } from 'zod';
import patientZodSchema from '@/zod schemas/Model Schemas/PatientZschema';

export async function POST(req: NextRequest) {

  await dbConnect();

  try {
    const body = await req.json(); // Use `json()` method to parse body

    let validatedData;

    //ZOD handling errors Gracefully
    try {
      validatedData = patientZodSchema.parse(body);
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

    // Create a new patient
    const patient = await PatientModel.create(validatedData);

    return NextResponse.json({ success: true, data: patient }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 400 });
  }
}
