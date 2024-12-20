"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Menu } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Logo } from "./logo"
import { Button } from "./ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const links = [
  { href: "/", label: "Home" },
  { href: "/simulation", label: "Simulation" },
  { href: "/materials", label: "Materials" },
  { href: "/optimization", label: "Optimization" },
  { href: "/visualization", label: "Visualization" },
  { href: "/tools", label: "Tools" },
  { href: "/help", label: "Help & Guides" },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center">
        <Logo />
        
        {/* Desktop Navigation */}
        <div className="ml-6 hidden gap-4 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-emerald-500",
                "relative after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0",
                "after:bg-gradient-to-r after:from-emerald-500 after:to-cyan-500",
                "after:transition-all after:duration-300 hover:after:w-full"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-2">
          <div className="hidden sm:flex">
            <Link href="/auth/login">
              <Button variant="ghost" className="text-sm">
                Sign in
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-sm hover:from-emerald-600 hover:to-cyan-600">
                Sign up
              </Button>
            </Link>
          </div>

          {/* Mobile Navigation */}
          <div className="lg:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <div className="mt-4 flex flex-col space-y-2">
                  {links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="rounded-md p-2 text-sm font-medium hover:bg-accent"
                    >
                      {link.label}
                    </Link>
                  ))}
                  <hr className="my-2" />
                  <Link
                    href="/auth/login"
                    onClick={() => setIsOpen(false)}
                    className="rounded-md p-2 text-sm font-medium hover:bg-accent"
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/auth/register"
                    onClick={() => setIsOpen(false)}
                    className="rounded-md bg-gradient-to-r from-emerald-500 to-cyan-500 p-2 text-sm font-medium text-white hover:from-emerald-600 hover:to-cyan-600"
                  >
                    Sign up
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}

