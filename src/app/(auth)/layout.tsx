export default function AuthLayout({children}: {children: React.ReactNode}) {
  return (
    <div className="mx-auto max-w-[500px] px-4 flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
        {children}
    </div>
  )
}
