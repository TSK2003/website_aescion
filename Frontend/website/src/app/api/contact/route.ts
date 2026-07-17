import { NextResponse } from 'next/server';
import { z } from 'zod';

const contactSchema = z.object({
  firstName: z.string().min(2, "First name is too short"),
  lastName: z.string().min(2, "Last name is too short"),
  email: z.string().email("Invalid email address"),
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

    // Simulate network delay and CRM/Database integration
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Here we would typically:
    // 1. Save to PostgreSQL database (Prisma)
    // 2. Send email notification via SMTP (e.g., Resend or SendGrid)
    // 3. Push to CRM (Hubspot/Salesforce)

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
