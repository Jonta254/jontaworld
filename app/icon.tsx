import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <svg viewBox="0 0 32 32" width="32" height="32" style={{ background: "#17140F", borderRadius: 7 }}>
        <path d="M10 9h9v10.3c0 4.2-2.3 6.7-6.2 6.7-2.3 0-4.2-1-5.3-2.7" fill="none" stroke="#FBF9F6" strokeWidth="2.35" strokeLinecap="square" />
        <path d="M18.7 20.5 24 9l3.2 7.1M21.1 15.1h4.8" fill="none" stroke="#E8925A" strokeWidth="2" strokeLinecap="square" />
      </svg>
    ),
    { ...size }
  );
}
