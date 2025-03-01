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

    // Prepare vulnerability context for both segments
    const vulnerabilityContext = `
      Title: ${vulnerability.message}
      Severity: ${vulnerability.vulnerabilityProbability}
      Status: ${vulnerability.status}
      File: ${vulnerability.component} (Line ${vulnerability.line})
      Rule: ${vulnerability.ruleKey}
      Category: ${vulnerability.securityCategory}
      Author: ${vulnerability.author}
    `;

    // First segment prompt - Risk assessment and fix suggestions
    const prompt1 = `
      Analyze this security vulnerability and provide a structured response in markdown format:
      
      ${vulnerabilityContext}
      
      Please provide only the following sections:

      ## Understanding the Vulnerability
      
      Explain what this vulnerability is in simple terms.
      
      ## Risk Assessment
      
      - What is the potential impact of this vulnerability?
      - What are the possible attack vectors?
      - How severe is this in the real world?
      
      Format your response using markdown with proper headings, bullet points, and code blocks where appropriate.
      Do not include any attribution or footnotes about the analysis being powered by any AI service.
    `;

    // Second segment prompt - Prevention and references
    const prompt2 = `
      Based on this security vulnerability, provide recommendations for prevention:
      
      ${vulnerabilityContext}
      
      Please provide only the following sections in markdown format:

      ## How to Fix
      
      - Step-by-step guidance to address this vulnerability
      - Code examples showing both vulnerable and fixed code
      - Any configuration changes required
      
      ## Prevention Best Practices
      
      - Coding practices to prevent similar vulnerabilities
      - Security tools or libraries that can help
      - Design patterns to follow
      
      ## References
      
      - Standards or guidelines related to this vulnerability
      - Articles or documentation for further reading
      
      Format your response using markdown with proper headings, bullet points, and code blocks where appropriate.
      Do not include any attribution or footnotes about the analysis being powered by any AI service.
    `;

    // Make first API call
    const response1 = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt1
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.2,
          maxOutputTokens: 800
        }
      }),
    });

    if (!response1.ok) {
      const errorData = await response1.json();
      console.error('Gemini API error (segment 1):', errorData);
      return NextResponse.json(
        { error: 'Failed to analyze vulnerability (segment 1)' },
        { status: 500 }
      );
    }

    const data1 = await response1.json();
    const analysisText1 = data1.candidates?.[0]?.content?.parts?.[0]?.text || '';

    // Make second API call
    const response2 = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt2
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.2,
          maxOutputTokens: 800
        }
      }),
    });

    if (!response2.ok) {
      const errorData = await response2.json();
      console.error('Gemini API error (segment 2):', errorData);
      return NextResponse.json(
        { error: 'Failed to analyze vulnerability (segment 2)' },
        { status: 500 }
      );
    }

    const data2 = await response2.json();
    const analysisText2 = data2.candidates?.[0]?.content?.parts?.[0]?.text || '';

    // Combine both responses - removed the attribution footer
    const combinedAnalysis = `
# Security Vulnerability Analysis

${analysisText1}

${analysisText2}
    `.trim();
    
    return NextResponse.json({ 
      analysis: combinedAnalysis,
      rawData: {
        segment1: data1,
        segment2: data2
      }
    });
  } catch (error) {
    console.error('Error in Gemini API route:', error);
    return NextResponse.json(
      { error: 'Failed to process vulnerability analysis' },
      { status: 500 }
    );
  }
}
