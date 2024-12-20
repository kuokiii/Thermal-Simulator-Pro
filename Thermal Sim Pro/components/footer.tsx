import Link from "next/link"
import { Github, Instagram } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t bg-background/80 backdrop-blur-sm">
      <div className="container py-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm text-muted-foreground">
            © 2024 ThermalSim Pro. All rights reserved. Developed by Nirupam Thapa a.k.a kuoki
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="https://instagram.com/_kuoki/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-emerald-500"
            >
              <Instagram className="h-5 w-5" />
            </Link>
            <Link
              href="https://github.com/kuokiii"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-emerald-500"
            >
              <Github className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

