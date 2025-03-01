import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { vulnerability } = await req.json();
    
    if (!vulnerability) {
      return NextResponse.json(
        { error: 'Vulnerability data is required' },
        { status: 400 }
      );
    }

    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    
    if (!GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'Gemini API key not configured' },
        { status: 500 }
      );
    }

    // Construct the prompt for Gemini
    const prompt = `
      Analyze this security vulnerability and provide a structured response:
      
      Title: ${vulnerability.message}
      Severity: ${vulnerability.vulnerabilityProbability}
      Status: ${vulnerability.status}
      File: ${vulnerability.component} (Line ${vulnerability.line})
      Rule: ${vulnerability.ruleKey}
      Category: ${vulnerability.securityCategory}
      Author: ${vulnerability.author}
      
      Please provide:
      1. A brief explanation of this type of vulnerability
      2. Potential security risks
      3. Recommended fix approach
      4. Best practices to prevent similar issues
      5. Estimated remediation effort (Low/Medium/High)
      
      Format the response in a structured way with clear sections.
    `;

    // Call Gemini API using the 1.5-flash model instead of gemini-pro
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.2,
          maxOutputTokens: 1024
        }
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Gemini API error:', errorData);
      return NextResponse.json(
        { error: 'Failed to analyze vulnerability with Gemini' },
        { status: 500 }
      );
    }

    const data = await response.json();
    console.log('Gemini API response:', JSON.stringify(data, null, 2));
    const analysisText = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No analysis available';
    
    return NextResponse.json({ analysis: analysisText });
  } catch (error) {
    console.error('Error in Gemini API route:', error);
    return NextResponse.json(
      { error: 'Failed to process vulnerability analysis' },
      { status: 500 }
    );
  }
}
