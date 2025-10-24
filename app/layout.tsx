import '../styles/globals.css'

export const metadata = {
  title: 'Editable HTML Poster',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}