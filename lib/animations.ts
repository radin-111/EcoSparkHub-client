import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MotionProps } from 'framer-motion'

gsap.registerPlugin(ScrollTrigger)

// GSAP Animation Utilities
export const fadeInUp = (element: HTMLElement, duration = 0.8, delay = 0) => {
  return gsap.fromTo(
    element,
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration, delay, ease: 'power3.out' }
  )
}

export const fadeInLeft = (element: HTMLElement, duration = 0.8, delay = 0) => {
  return gsap.fromTo(
    element,
    { opacity: 0, x: -30 },
    { opacity: 1, x: 0, duration, delay, ease: 'power3.out' }
  )
}

export const fadeInRight = (element: HTMLElement, duration = 0.8, delay = 0) => {
  return gsap.fromTo(
    element,
    { opacity: 0, x: 30 },
    { opacity: 1, x: 0, duration, delay, ease: 'power3.out' }
  )
}

export const scaleIn = (element: HTMLElement, duration = 0.6, delay = 0) => {
  return gsap.fromTo(
    element,
    { opacity: 0, scale: 0.8 },
    { opacity: 1, scale: 1, duration, delay, ease: 'back.out(1.7)' }
  )
}

export const staggerFadeIn = (elements: HTMLElement[], stagger = 0.1) => {
  return gsap.fromTo(
    elements,
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, stagger, duration: 0.6, ease: 'power2.out' }
  )
}

// Scroll-triggered animations
export const scrollFadeInUp = (element: HTMLElement, start = 'top 80%') => {
  return gsap.fromTo(
    element,
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        start,
        once: true
      }
    }
  )
}

export const scrollScaleIn = (element: HTMLElement, start = 'top 80%') => {
  return gsap.fromTo(
    element,
    { opacity: 0, scale: 0.9 },
    {
      opacity: 1,
      scale: 1,
      duration: 0.6,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: element,
        start,
        once: true
      }
    }
  )
}

// Framer Motion variants
export const fadeInUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } }
}

export const fadeInLeftVariant = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' as const } }
}

export const fadeInRightVariant = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' as const } }
}

export const scaleInVariant = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { duration: 0.5, ease: 'easeOut' as const, type: 'spring' as const, stiffness: 300 } 
  }
}

export const staggerContainerVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

export const slideInFromBottom = {
  hidden: { opacity: 0, y: '100%' },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } }
}

// Hover animations
export const hoverScale = {
  whileHover: { scale: 1.05, transition: { duration: 0.2, ease: 'easeOut' as const } },
  whileTap: { scale: 0.98, transition: { duration: 0.1, ease: 'easeOut' as const } }
}

export const hoverLift = {
  whileHover: { y: -5, transition: { duration: 0.2, ease: 'easeOut' as const } },
  whileTap: { y: 0, transition: { duration: 0.1, ease: 'easeOut' as const } }
}

// Page transition variants
export const pageTransition = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeInOut' as const } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: 'easeInOut' as const } }
}

// Table animation variants
export const tableRowVariant = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } }
}

export const tableContainerVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  }
}

// Card hover effects
export const cardHoverProps: MotionProps = {
  whileHover: { 
    y: -8,
    boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
    transition: { duration: 0.3, ease: 'easeOut' }
  },
  whileTap: { 
    scale: 0.98,
    transition: { duration: 0.1 }
  }
}

// Utility to auto-animate elements on mount
export const animateOnMount = (element: HTMLElement, animationType: 'fadeInUp' | 'fadeInLeft' | 'fadeInRight' | 'scaleIn' = 'fadeInUp') => {
  const animations = {
    fadeInUp,
    fadeInLeft,
    fadeInRight,
    scaleIn
  }
  
  return animations[animationType](element)
}

// Cleanup function for GSAP animations
export const cleanupAnimations = () => {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill())
  gsap.killTweensOf('*')
}
