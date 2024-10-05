import "./globals.css"
import { Analytics } from "@vercel/analytics/react"

export const metadata = {
  title: 'Genesis',
  description: 'Lock your deepest secrets with the ultimate password',
}
 
export default function RootLayout({ children }) {
 return (
    <html lang="en">
      <head>
        <link href='https://fonts.googleapis.com/css?family=Roboto+Mono' rel='stylesheet'/>
      </head>
     <body>
       {children}
       <Analytics />
      </body>
    </html>
  )
}
