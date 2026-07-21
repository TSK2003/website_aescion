import { NextResponse } from 'next/server';
import { z } from 'zod';

const contactSchema = z.object({
  firstName: z.string().min(2, "First name is too short"),
  lastName: z.string().min(1, "Last name is too short"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Invalid phone number"),
  inquiryType: z.string().min(1, "Please select an inquiry type"),
  message: z.string().min(10, "Message must be at least 10 characters long"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Server-side validation
    const result = contactSchema.safeParse(body);
    
    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid form data', details: result.error.format() },
        { status: 400 }
      );
    }

    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';
    
    const backendResponse = await fetch(`${backendUrl}/public/leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: result.data.firstName,
        lastName: result.data.lastName,
        email: result.data.email,
        phone: result.data.phone,
        requirement: result.data.message,
        source: 'WEBSITE',
        priority: 'MEDIUM', // Optional default
      }),
    });

    if (!backendResponse.ok) {
      console.error('Backend rejected contact form:', await backendResponse.text());
      throw new Error('Failed to submit to CRM');
    }

    console.log('Successfully processed contact form submission:', result.data);

    return NextResponse.json(
      { message: 'Inquiry received successfully. Our team will contact you soon.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
