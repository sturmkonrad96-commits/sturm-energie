import { useEffect } from 'react'
import Head from 'next/head'
import Nav from '../components/Nav'
import Hero from '../components/Hero'
import Features from '../components/Features'
import Tarife from '../components/Tarife'
import Rechner from '../components/Rechner'
import Why from '../components/Why'
import Sustainability from '../components/Sustainability'
import Testimonials from '../components/Testimonials'
import FAQ from '../components/FAQ'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

export default function Home() {
  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible')
      }),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale')
    els.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <Head>
        <title>Sturm Energie – Sauber. Intelligent. Transparent.</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Nav />

      <main>
        <Hero />
        <Features />
        <Tarife />
        <Rechner />
        <Why />
        <Sustainability />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>

      <Footer />
    </>
  )
}
