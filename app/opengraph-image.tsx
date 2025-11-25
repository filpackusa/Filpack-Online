import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Filpack Online - Professional Food Packaging Solutions'
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
                    fontSize: 60,
                    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontFamily: 'sans-serif',
                    position: 'relative',
                }}
            >
                {/* Background decorative elements */}
                <div
                    style={{
                        position: 'absolute',
                        top: -100,
                        right: -100,
                        width: 400,
                        height: 400,
                        background: '#f97316',
                        borderRadius: '50%',
                        opacity: 0.2,
                        filter: 'blur(100px)',
                    }}
                />
                <div
                    style={{
                        position: 'absolute',
                        bottom: -100,
                        left: -100,
                        width: 400,
                        height: 400,
                        background: '#3b82f6',
                        borderRadius: '50%',
                        opacity: 0.2,
                        filter: 'blur(100px)',
                    }}
                />

                {/* Content */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        padding: '40px',
                        zIndex: 10,
                    }}
                >
                    <div
                        style={{
                            fontSize: 80,
                            fontWeight: 900,
                            marginBottom: 20,
                            background: 'linear-gradient(90deg, #ffffff 0%, #f97316 100%)',
                            backgroundClip: 'text',
                            color: 'transparent',
                        }}
                    >
                        Filpack Online
                    </div>
                    <div
                        style={{
                            fontSize: 36,
                            fontWeight: 600,
                            color: '#cbd5e1',
                            marginBottom: 40,
                        }}
                    >
                        Professional Food Packaging Solutions
                    </div>
                    <div
                        style={{
                            fontSize: 24,
                            color: '#94a3b8',
                            fontWeight: 400,
                        }}
                    >
                        America's Trusted Packaging Supplier
                    </div>
                </div>
            </div>
        ),
        {
            ...size,
        }
    )
}
