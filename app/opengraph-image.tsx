import { ImageResponse } from 'next/og'

export const alt = 'Muhammad Furqan Tahir — HR Operations & Executive Administration'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#F5F2EC',
          color: '#1A1A1A',
          padding: '60px 70px',
          fontFamily: 'serif',
          position: 'relative',
        }}
      >
        {/* Hairline border frame */}
        <div
          style={{
            position: 'absolute',
            top: 24,
            left: 24,
            right: 24,
            bottom: 24,
            border: '1px solid #CDC6BA',
            display: 'flex',
            pointerEvents: 'none',
          }}
        />

        {/* Header bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid #CDC6BA',
            paddingBottom: '24px',
            marginBottom: '40px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                width: 44,
                height: 44,
                backgroundColor: '#0F5257',
                color: '#FAF8F5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: 18,
                borderRadius: 4,
                letterSpacing: '1px',
              }}
            >
              MFT
            </div>
            <div
              style={{
                fontSize: 14,
                fontFamily: 'monospace',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: '#66635D',
              }}
            >
              Operations Ledger &bull; Portfolio
            </div>
          </div>
          <div
            style={{
              fontSize: 14,
              fontFamily: 'monospace',
              color: '#0F5257',
              fontWeight: 600,
            }}
          >
            Rawalpindi, PK &bull; Available US EST
          </div>
        </div>

        {/* Main hero typography */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
          <div
            style={{
              fontSize: 54,
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: '-1px',
              color: '#1A1A1A',
            }}
          >
            Muhammad Furqan Tahir
          </div>
          <div
            style={{
              fontSize: 24,
              color: '#0F5257',
              fontStyle: 'italic',
              marginTop: '4px',
            }}
          >
            HR Operations & Executive Administration
          </div>
          <div
            style={{
              fontSize: 17,
              color: '#66635D',
              lineHeight: 1.5,
              maxWidth: '850px',
              marginTop: '8px',
              fontFamily: 'sans-serif',
            }}
          >
            Managing people operations, executive reporting, and digital administration with precision, data integrity, and zero tolerance for error.
          </div>
        </div>

        {/* 3 Metric ledger boxes */}
        <div
          style={{
            display: 'flex',
            gap: '24px',
            borderTop: '1px solid #CDC6BA',
            paddingTop: '28px',
          }}
        >
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: '#FAF8F5',
              border: '1px solid #CDC6BA',
              padding: '18px 24px',
            }}
          >
            <div
              style={{
                fontSize: 38,
                fontWeight: 700,
                color: '#1A1A1A',
                fontFamily: 'monospace',
                lineHeight: 1,
              }}
            >
              45
            </div>
            <div
              style={{
                fontSize: 13,
                fontFamily: 'sans-serif',
                fontWeight: 600,
                color: '#1A1A1A',
                marginTop: '6px',
              }}
            >
              Employees on Payroll
            </div>
            <div
              style={{
                fontSize: 11,
                fontFamily: 'monospace',
                color: '#66635D',
                marginTop: '2px',
              }}
            >
              End-to-end ERPNext & Excel
            </div>
          </div>

          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: '#FAF8F5',
              border: '1px solid #CDC6BA',
              padding: '18px 24px',
            }}
          >
            <div
              style={{
                fontSize: 38,
                fontWeight: 700,
                color: '#0F5257',
                fontFamily: 'monospace',
                lineHeight: 1,
              }}
            >
              100%
            </div>
            <div
              style={{
                fontSize: 13,
                fontFamily: 'sans-serif',
                fontWeight: 600,
                color: '#1A1A1A',
                marginTop: '6px',
              }}
            >
              Attendance Accuracy
            </div>
            <div
              style={{
                fontSize: 11,
                fontFamily: 'monospace',
                color: '#66635D',
                marginTop: '2px',
              }}
            >
              Time & leave audit compliance
            </div>
          </div>

          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: '#FAF8F5',
              border: '1px solid #CDC6BA',
              padding: '18px 24px',
            }}
          >
            <div
              style={{
                fontSize: 38,
                fontWeight: 700,
                color: '#1A1A1A',
                fontFamily: 'monospace',
                lineHeight: 1,
              }}
            >
              40%
            </div>
            <div
              style={{
                fontSize: 13,
                fontFamily: 'sans-serif',
                fontWeight: 600,
                color: '#1A1A1A',
                marginTop: '6px',
              }}
            >
              Manual Time Reduced
            </div>
            <div
              style={{
                fontSize: 11,
                fontFamily: 'monospace',
                color: '#66635D',
                marginTop: '2px',
              }}
            >
              Via ERPNext module rollout
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
