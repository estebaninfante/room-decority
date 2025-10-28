"use client"

import Link from "next/link"
import { useRouter} from "next/navigation"
import {useEffect, useState } from "react"
import { Sparkles, LogOut } from "lucide-react"
import { auth } from "@/lib/firebase"
import { Button } from "@/components/ui/button"
import { onAuthStateChanged, signOut, type User } from "firebase/auth"

export function Navigation() {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    // onAuthStateChanged devuelve una función "unsubscribe"
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser) // Si es null, el usuario no está logueado
    })

  return () => unsubscribe()
  }, [])

  const handleSignOut = async () => {
    try {
      await signOut(auth)
      // Opcional: redirigir al inicio después de cerrar sesión
      router.push("/")
    } catch (error) {
      console.error("Error al cerrar sesión: ", error)
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">Redesign AI</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link href="#features" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Features
          </Link>
          <Link href="#how-it-works" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            How it Works
          </Link>
          <Link href="#pricing" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Pricing
          </Link>
          <Link href="#gallery" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Gallery
          </Link>
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            // --- SI HAY UN USUARIO LOGUEADO ---
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/playground">Playground</Link>
              </Button>
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                <LogOut className="mr-2 h-4 w-4" />
                Cerrar Sesión
              </Button>
            </>
          ) : (
            // --- SI NO HAY USUARIO ---
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/playground">Try Free</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
