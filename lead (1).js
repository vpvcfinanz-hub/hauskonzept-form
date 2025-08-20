export const config = { runtime: 'edge' };

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response('Only POST allowed', { status: 405 });
  }

  const bodyText = await req.text();
  const data = Object.fromEntries(new URLSearchParams(bodyText));
  console.log('Neuer Lead:', { ...data, signature_length: (data.signature_base64 || '').length });

  return new Response(
    JSON.stringify({ ok: true, message: 'Lead gespeichert' }),
    { status: 200, headers: { 'content-type': 'application/json' } }
  );
}
