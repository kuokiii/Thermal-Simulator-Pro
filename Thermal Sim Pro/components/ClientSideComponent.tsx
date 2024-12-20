'use client'

import { useEffect, useState } from 'react'

export default function ClientSideComponent() {
  const [windowWidth, setWindowWidth] = useState(0)

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    
    // Set the initial width
    setWindowWidth(window.innerWidth)
    
    // Add event listener
    window.addEventListener('resize', handleResize)
    
    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return <div>Window width: {windowWidth}px</div>
}

