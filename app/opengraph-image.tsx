import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Bellevue Assurance - Life Insurance Made Simple';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: 'linear-gradient(135deg, #1e3a5f 0%, #2563A8 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            opacity: 0.1,
            background: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,.05) 10px, rgba(255,255,255,.05) 20px)',
          }}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '80px',
            zIndex: 10,
          }}
        >
          <div
            style={{
              fontSize: 96,
              fontWeight: 'bold',
              marginBottom: 20,
              letterSpacing: '-2px',
              color: '#FFFFFF',
            }}
          >
            BELLEVUE
          </div>
          <div
            style={{
              fontSize: 72,
              fontWeight: '400',
              marginBottom: 40,
              color: '#D4AF37',
              letterSpacing: '8px',
            }}
          >
            ASSURANCE
          </div>
          <div
            style={{
              fontSize: 40,
              fontWeight: '400',
              color: '#E5E7EB',
              maxWidth: 900,
              lineHeight: 1.4,
            }}
          >
            Simplified Term Life & Final Expense Insurance
          </div>
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            fontSize: 32,
            color: '#9CA3AF',
          }}
        >
          bellevueassurance.com
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
