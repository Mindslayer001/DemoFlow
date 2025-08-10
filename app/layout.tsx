import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import './globals.css'
import {FloatingNav} from "@/components/FloatingNav";
import React from "react";
import {Analytics} from "@vercel/analytics/next"

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'DemoFlow - Build Apps at the Speed of Thought',
    description: 'Revolutionary visual backend builder that transforms ideas into production-ready applications with zero friction.',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (<>
            <Analytics/>
            <html lang="en" className="dark">
            <body className={`${inter.className} bg-navy-950 text-white antialiased`}>
            <FloatingNav/>
            <main className="min-h-screen bg-navy-950 overflow-x-hidden">
                {children}
            </main>
            </body>
            </html>
        </>
    )
}