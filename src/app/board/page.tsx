'use client';
import dynamic from 'next/dynamic'

const Tldraw = dynamic(async () => (await import('tldraw')).Tldraw, { ssr: false })

export default function BoardPage() {
  return (
    <div className="w-full h-[calc(100vh-4rem)] inset-0">
      <Tldraw inferDarkMode />
    </div>
  )
}
