"use client"

import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { LucideIcon, Menu, X } from "lucide-react"
import { cn } from "./utils"

interface NavItem {
  name: string
  url: string
  icon: LucideIcon
}

interface NavBarProps {
  items: NavItem[]
  className?: string
  ctaButton?: React.ReactNode
  secondaryCta?: React.ReactNode
  onNavigateToAbout?: () => void
  onNavigateToBlogs?: () => void
  onNavigateToCareers?: () => void
  onNavigateToHome?: () => void
  onNavigateToHomeWithScroll?: (sectionId?: string) => void
  currentPage?: string
}

export function NavBar({ items, className, ctaButton, secondaryCta, onNavigateToAbout, onNavigateToBlogs, onNavigateToCareers, onNavigateToHome, onNavigateToHomeWithScroll, currentPage }: NavBarProps) {
  const [activeTab, setActiveTab] = useState(items[0].name)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Update active tab based on current page
  useEffect(() => {
    if (currentPage === 'home') {
      setActiveTab('Главная')
    } else if (currentPage === 'about-us') {
      setActiveTab('О нас')
    } else if (currentPage === 'blogs') {
      setActiveTab('Новости')
    } else if (currentPage === 'vacancies') {
      setActiveTab('Вакансии')
    } else if (currentPage === 'pricing') {
      setActiveTab('Главная') // Keep home highlighted for pricing
    }
  }, [currentPage])

  useEffect(() => {
    // Close mobile menu when clicking outside
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (isMobileMenuOpen && !target.closest('.mobile-menu-container')) {
        setIsMobileMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isMobileMenuOpen])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, item: NavItem) => {
    e.preventDefault()
    setActiveTab(item.name)
    setIsMobileMenuOpen(false)

    // Handle Home navigation - always navigate to Home page
    if (item.name === 'Home' || item.name === 'Главная') {
      if (currentPage !== 'home') {
        // We're on a sub-page, navigate to home and scroll to top
        if (onNavigateToHomeWithScroll) {
          onNavigateToHomeWithScroll() // Will scroll to top
        } else if (onNavigateToHome) {
          onNavigateToHome()
        }
      } else {
        // We're already on home, scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
      return
    }

    // Handle About Us navigation - always navigate to About page
    if (item.name === 'About Us' || item.name === 'О нас') {
      if (onNavigateToAbout) {
        onNavigateToAbout()
      }
      return
    }


    // Handle Blogs navigation - always navigate to Blogs page
    if (item.name === 'Blogs' || item.name === 'Блоги' || item.name === 'Новости') {
      if (onNavigateToBlogs) {
        onNavigateToBlogs()
      }
      return
    }


    // Handle Vacancies navigation - always navigate to Vacancies page
    if (item.name === 'Vacancies' || item.name === 'Вакансии') {
      if (onNavigateToCareers) {
        onNavigateToCareers()
      }
      return
    }

    // Handle section links (Services, Gallery, Contact, etc.)
    if (currentPage === 'home') {
      // We're on home page, just scroll to section
      const element = document.querySelector(item.url)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    } else {
      // We're on a sub-page, navigate to home first then scroll
      if (onNavigateToHomeWithScroll) {
        onNavigateToHomeWithScroll(item.url)
      }
    }
  }

  return (
    <>
      <div
        className={cn(
          "fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 mobile-menu-container",
          className,
        )}
      >
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full backdrop-blur-xl py-3 sm:py-4 px-4 sm:px-6 lg:px-8 rounded-2xl shadow-lg border transition-all duration-300 hover:shadow-xl"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.75) 0%, rgba(250, 247, 242, 0.7) 100%)',
            borderColor: 'rgba(212, 165, 116, 0.2)',
          }}
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 md:gap-4">
            {/* Logo */}
            <div className="flex-shrink-0 order-2 sm:order-none">
              <a
                href="#home"
                onClick={(e) => {
                  e.preventDefault()
                  setActiveTab('Главная')
                  setIsMobileMenuOpen(false)
                  if (currentPage !== 'home') {
                    // Navigate to home page and scroll to top
                    if (onNavigateToHomeWithScroll) {
                      onNavigateToHomeWithScroll() // Will scroll to top
                    } else if (onNavigateToHome) {
                      onNavigateToHome()
                    }
                  } else {
                    // Already on home, scroll to top
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }
                }}
                className="flex items-center group"
              >
                <img
                  src="https://i.ibb.co/JWJ913Vb/5204071771186266480-removebg-preview.png"
                  alt="Banya Logo"
                  className="h-10 sm:h-11 md:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </a>
            </div>

            {/* Desktop Navigation Items - Centered */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-2 flex-1 justify-center">
              {items.map((item) => {
                const Icon = item.icon
                const isActive = activeTab === item.name

                return (
                  <a
                    key={item.name}
                    href={item.url}
                    onClick={(e) => handleNavClick(e, item)}
                    className={cn(
                      "relative cursor-pointer px-4 md:px-5 lg:px-6 py-2.5 rounded-full transition-all duration-300",
                      "text-[#3D3226] hover:text-[#7A5C47]",
                      isActive && "text-[#7A5C47]",
                      // Special styling for Vacancies item - button-like appearance
                      item.name === 'Вакансии' && "border-2 border-[#D4A574] bg-transparent hover:bg-[#D4A574]/10 shadow-sm hover:shadow-md hover:scale-105",
                    )}
                  >
                    <span className="text-sm relative z-10 whitespace-nowrap">
                      {item.name}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="lamp"
                        className="absolute inset-0 w-full rounded-full -z-10"
                        initial={false}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                        style={{
                          background: 'linear-gradient(135deg, rgba(232, 223, 213, 0.6) 0%, rgba(245, 239, 230, 0.5) 100%)',
                        }}
                      >
                        {/* Tubelight glow effect - top */}
                        <div
                          className="absolute -top-2 left-1/2 -translate-x-1/2 w-12 h-1.5 rounded-t-full"
                          style={{
                            background: 'linear-gradient(90deg, #D4A574 0%, #C69563 100%)',
                            boxShadow: '0 0 8px rgba(212, 165, 116, 0.6), 0 0 16px rgba(198, 149, 99, 0.4)',
                          }}
                        >
                          {/* Outer glow rings */}
                          <div
                            className="absolute w-16 h-8 rounded-full blur-lg -top-3 -left-2"
                            style={{
                              background: 'radial-gradient(circle, rgba(212, 165, 116, 0.3) 0%, transparent 70%)',
                            }}
                          />
                          <div
                            className="absolute w-12 h-6 rounded-full blur-md -top-2"
                            style={{
                              background: 'radial-gradient(circle, rgba(212, 165, 116, 0.25) 0%, transparent 70%)',
                            }}
                          />
                          <div
                            className="absolute w-6 h-5 rounded-full blur-sm top-0 left-3"
                            style={{
                              background: 'radial-gradient(circle, rgba(198, 149, 99, 0.2) 0%, transparent 70%)',
                            }}
                          />
                        </div>
                      </motion.div>
                    )}
                  </a>
                )
              })}
            </nav>

            {/* Tablet Navigation Icons (sm to md) */}
            <nav className="hidden sm:flex md:hidden items-center gap-2 flex-1 justify-center">
              {items.map((item) => {
                const Icon = item.icon
                const isActive = activeTab === item.name

                return (
                  <a
                    key={item.name}
                    href={item.url}
                    onClick={(e) => handleNavClick(e, item)}
                    className={cn(
                      "relative cursor-pointer px-2.5 py-2 rounded-full transition-all duration-300",
                      "text-[#3D3226] hover:text-[#7A5C47]",
                      isActive && "text-[#7A5C47]",
                      // Special styling for Vacancies item
                      item.name === 'Вакансии' && "border-2 border-[#D4A574] bg-transparent hover:bg-[#D4A574]/10 shadow-sm hover:shadow-md hover:scale-105",
                    )}
                  >
                    <span className="relative z-10">
                      <Icon size={18} strokeWidth={2.5} />
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="lamp-tablet"
                        className="absolute inset-0 w-full rounded-full -z-10"
                        initial={false}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                        style={{
                          background: 'linear-gradient(135deg, rgba(232, 223, 213, 0.6) 0%, rgba(245, 239, 230, 0.5) 100%)',
                        }}
                      >
                        {/* Tubelight glow effect - top */}
                        <div
                          className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-10 h-1 rounded-t-full"
                          style={{
                            background: 'linear-gradient(90deg, #D4A574 0%, #C69563 100%)',
                            boxShadow: '0 0 6px rgba(212, 165, 116, 0.6), 0 0 12px rgba(198, 149, 99, 0.4)',
                          }}
                        >
                          <div
                            className="absolute w-12 h-6 rounded-full blur-md -top-2 -left-1"
                            style={{
                              background: 'radial-gradient(circle, rgba(212, 165, 116, 0.25) 0%, transparent 70%)',
                            }}
                          />
                        </div>
                      </motion.div>
                    )}
                  </a>
                )
              })}
            </nav>

            {/* Mobile Hamburger Menu */}
            <div className="flex sm:hidden items-center flex-1 justify-start order-1 sm:order-none">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="w-10 h-10 rounded-full bg-[#E8DFD5]/80 backdrop-blur-sm flex items-center justify-center hover:bg-[#D4C4B0] transition-all duration-300 hover:scale-110"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 text-[#7A5C47]" />
                ) : (
                  <Menu className="w-5 h-5 text-[#7A5C47]" />
                )}
              </button>
            </div>

            {/* Secondary CTA Button - Desktop & Tablet */}
            {secondaryCta && (
              <div className="flex-shrink-0 hidden sm:block">
                {secondaryCta}
              </div>
            )}

            {/* CTA Button - Desktop & Tablet */}
            {ctaButton && (
              <div className="flex-shrink-0 hidden sm:block">
                {ctaButton}
              </div>
            )}
          </div>
        </motion.div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="sm:hidden mt-3"
            >
              <div
                className="backdrop-blur-xl rounded-2xl shadow-xl border overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(250, 247, 242, 0.9) 100%)',
                  borderColor: 'rgba(212, 165, 116, 0.2)',
                }}
              >
                <nav className="p-4 space-y-1">
                  {items.map((item, index) => {
                    const Icon = item.icon
                    const isActive = activeTab === item.name

                    return (
                      <motion.a
                        key={item.name}
                        href={item.url}
                        onClick={(e) => handleNavClick(e, item)}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className={cn(
                          "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300",
                          "text-[#3D3226] hover:text-[#7A5C47]",
                          isActive
                            ? "bg-gradient-to-r from-[#E8DFD5]/70 to-[#F5EFE6]/60 text-[#7A5C47]"
                            : "hover:bg-[#E8DFD5]/30",
                          // Special styling for Vacancies item - button-like appearance
                          item.name === 'Вакансии' && "border-2 border-[#D4A574] bg-transparent hover:bg-[#D4A574]/10 shadow-sm"
                        )}
                      >
                        <Icon size={20} strokeWidth={2.5} />
                        <span>{item.name}</span>
                      </motion.a>
                    )
                  })}

                  {/* Mobile Secondary CTA Button */}
                  {secondaryCta && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: items.length * 0.05 }}
                      className="pt-2"
                    >
                      {secondaryCta}
                    </motion.div>
                  )}

                  {/* Mobile CTA Button */}
                  {ctaButton && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: (items.length + (secondaryCta ? 1 : 0)) * 0.05 }}
                      className="pt-2"
                    >
                      {ctaButton}
                    </motion.div>
                  )}
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}
