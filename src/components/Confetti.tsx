import { useRef, useEffect } from 'react'

interface ConfettiProps {
  active: boolean
}

interface Particle {
  color: string
  x: number
  y: number
  diameter: number
  tilt: number
  tiltAngleIncrement: number
  tiltAngle: number
  particleSpeed: number
  waveAngle: number
}

export function Confetti({ active }: ConfettiProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameId = useRef<number | null>(null)
  
  useEffect(() => {
    if (!active || !canvasRef.current) return
    
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    let particles: Particle[] = []
    const particleCount = 150
    const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', 
                    '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4CAF50', 
                    '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722']
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        color: colors[Math.floor(Math.random() * colors.length)],
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        diameter: Math.random() * 10 + 5,
        tilt: Math.random() * 10 - 10,
        tiltAngleIncrement: Math.random() * 0.07 + 0.05,
        tiltAngle: 0,
        particleSpeed: Math.random() + 1,
        waveAngle: Math.random() * Math.PI * 2
      })
    }
    
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      particles.forEach((p, i) => {
        ctx.beginPath()
        ctx.lineWidth = p.diameter
        ctx.strokeStyle = p.color
        ctx.moveTo(p.x + p.tilt, p.y)
        ctx.lineTo(p.x + p.tilt + p.diameter / 2, p.y + p.diameter)
        ctx.stroke()
        
        // Update
        p.tiltAngle += p.tiltAngleIncrement
        p.y += (Math.cos(p.waveAngle) + p.particleSpeed) * 2
        p.x += Math.sin(p.tiltAngle) * 2
        p.tilt = Math.sin(p.tiltAngle) * 15
        
        // Reset if particle is off the screen
        if (p.y > canvas.height) {
          if (i % 5 > 0 || i % 2 === 0) { // 66.67% of particles will be recycled
            particles[i] = {
              ...p,
              x: Math.random() * canvas.width,
              y: -10,
              tiltAngle: 0
            }
          } else {
            // Remove excess particles
            particles.splice(i, 1)
          }
        }
      })
      
      // Stop animation if no particles left
      if (particles.length === 0) {
        if (animationFrameId.current !== null) {
          cancelAnimationFrame(animationFrameId.current)
        }
        return
      }
      
      animationFrameId.current = requestAnimationFrame(draw)
    }
    
    if (active) {
      animationFrameId.current = requestAnimationFrame(draw)
    }
    
    return () => {
      if (animationFrameId.current !== null) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [active])
  
  if (!active) return null
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-50"
    />
  )
}