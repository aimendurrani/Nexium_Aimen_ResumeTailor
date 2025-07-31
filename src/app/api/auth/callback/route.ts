import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const error_code = searchParams.get('error');
  const error_description = searchParams.get('error_description');
  const next = searchParams.get('next') ?? '/';

  // Log all parameters for debugging
  console.log('Auth callback received:', { 
    code: code ? 'present' : 'missing',
    error_code, 
    error_description,
    url: request.url,
  });

  if (error_code) {
    console.error('Auth callback error:', error_code, error_description);
    return NextResponse.redirect('https://nexium-aimen-resumetailor.vercel.app/auth/auth-code-error?error=' + encodeURIComponent(error_code));
  }

  if (code) {
 
    const productionUrl = 'https://nexium-aimen-resumetailor.vercel.app';
    const redirectUrl = `${productionUrl}/?code=${code}&next=${encodeURIComponent(next)}`;
    
    console.log('Redirecting to client for PKCE handling:', redirectUrl);
    return NextResponse.redirect(redirectUrl);
  }

  console.log('No code parameter found in callback');
  return NextResponse.redirect('https://nexium-aimen-resumetailor.vercel.app/auth/auth-code-error?error=no_code');
} 