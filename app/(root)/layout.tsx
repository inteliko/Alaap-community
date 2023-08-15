import '../globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Topbar from '@/components/shared/Topbar'
import LeftSidebar from '@/components/shared/LeftSidebar'
import RightSidebar from '@/components/shared/Rightsidebar'
import Bottombar from '@/components/shared/Bottombar'
import { ClerkProvider } from "@clerk/nextjs"

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Alaap',
  description: 'A platform for developer where they can connect with other developer. Share new Ideas , Publish their thoughts and comment on each other posts.'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (

    <ClerkProvider> 
    <html lang="en">
      <body className={inter.className}>
       <Topbar/> 

       <main className="flex flex-row" >
        <LeftSidebar/> 

        <section className="main-container">
          <div className="w-full max-w-4xl" >
            {children}
          </div>
        </section>


        <RightSidebar />
       </main>

       <Bottombar />

        
        {children}</body>
    </html>
    </ClerkProvider>

  )
}
