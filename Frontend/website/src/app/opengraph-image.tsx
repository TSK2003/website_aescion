import { ImageResponse } from 'next/og';
 
export const runtime = 'edge';
 
export const alt = 'AESCION Enterprise Software';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';
 
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 64,
          background: '#0f172a', // primary-950
          color: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '40px' }}>
          <div
            style={{
              background: '#0ea5e9', // primary-500
              width: 100,
              height: 100,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '20px',
              fontSize: 72,
              fontWeight: 800,
            }}
          >
            A
          </div>
          <div style={{ fontSize: 80, fontWeight: 800, letterSpacing: '-0.05em' }}>
            AESCION
          </div>
        </div>
        <div style={{ fontSize: 32, color: '#bae6fd', fontWeight: 500 }}>
          Enterprise Software Engineering
        </div>
      </div>
    ),
    { ...size }
  );
}
