"use client";

export default function StormBackground() {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 z-0 bg-black" />

      <div
        className="pointer-events-none absolute inset-0 z-[1] opacity-[0.03]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "180px 180px",
        }}
      />

      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-[45%]"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, rgba(120,0,0,0.22) 0%, rgba(120,0,0,0.08) 28%, transparent 72%)",
          filter: "blur(48px)",
        }}
      />
    </>
  );
}
