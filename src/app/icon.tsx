import { ImageResponse } from 'next/og';

// Image metadata
export const size = {
    width: 32,
    height: 32,
};
export const contentType = 'image/png';

// Image generation
export default function Icon() {
    return new ImageResponse(
        (
            // ImageResponse JSX element
            <div
                style={{
                    background: '#0F172A',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '20%',
                    padding: '4px',
                }}
            >
                {/* Scooter Icon silhouette matching official logo */}
                <svg
                    width="26"
                    height="26"
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {/* Scooter Base (Blue) */}
                    <g fill="#1a6aff">
                        <circle cx="25" cy="75" r="14" />
                        <circle cx="75" cy="75" r="14" />
                        <path d="M 25,65 L 75,65 L 75,75 L 25,75 Z" />
                        <path d="M 70,68 L 55,20 L 70,18 L 40,24 L 42,18 Z" />
                    </g>
                    {/* Bolt (Green) */}
                    <path
                        d="M 45,25 L 30,55 L 50,55 L 35,85 L 75,45 L 50,45 Z"
                        fill="#1df542"
                    />
                </svg>
            </div>
        ),
        // ImageResponse options
        {
            ...size,
        }
    );
}
