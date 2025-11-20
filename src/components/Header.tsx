
import React from 'react';

export const Header: React.FC = () => {
    return (
        <header style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px 0',
        }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
            }}>
                <div style={{ width: '20px', height: '20px', background: 'radial-gradient(141.42% 141.42% at 0% 0%, #E30000 0%, #FFF 25%, #E30000 48.56%, #8A0202 70%, #E30000 100%)', borderRadius: '50%' }} />
                <div style={{ width: '20px', height: '20px', background: 'radial-gradient(141.42% 141.42% at 0% 0%, #00DD04 0%, #FFF 25%, #00DD04 48.56%, #048C07 70%, #00DD04 100%)', borderRadius: '50%' }} />
                <div style={{ width: '20px', height: '20px', background: 'radial-gradient(141.42% 141.42% at 0% 0%, #FFA216 0%, #FFF 25%, #FFA216 48.56%, #DB5B00 70%, #FFA216 100%)', borderRadius: '50%' }} />

                <h1 style={{
                    fontSize: '14px',
                    fontWeight: 700,
                    color: '#fff',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    fontFamily: 'var(--font-mono)'
                }}>
                    WorkPonder
                </h1>
            </div>

            {/* <div style={{
                border: '1px solid #333',
                padding: '8px 16px',
                borderRadius: 'var(--radius-pill)',
                fontSize: '12px',
                fontFamily: 'var(--font-mono)',
                color: '#888',
                letterSpacing: '1px'
            }}>
                NEW TRIP
            </div> */}
        </header>
    );
};

