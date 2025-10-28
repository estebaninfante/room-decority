"use client" // 1. Directiva de Cliente

// 2. Importaciones de React y Next.js
import { useState } from "react"
import { useRouter } from "next/navigation" // Para redirigir al usuario

// 3. Importaciones de Firebase
import { auth } from "@/lib/firebase" // Nuestro archivo de config
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth"

// 4. Importaciones de UI y Validación
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod" // Conector de Zod
import * as z from "zod" // Librería de validación
import { toast } from "sonner" // Para notificaciones

// 5. Importaciones de Componentes
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Navigation } from "@/components/navigation" // Navbar
import { Footer } from "@/components/footer" // Footer
import { Sparkles } from "lucide-react"

// 6. Esquema de Validación (Las Reglas)
const formSchema = z.object({
  email: z.string().email({ message: "Por favor ingresa un email válido." }),
  password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres." }),
})

// 7. El Componente de la Página
export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  // 8. Configuración del Formulario
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema), // Conecta Zod con React Hook Form
    defaultValues: {
      email: "",
      password: "",
    },
  })

  // 9. Función de "Iniciar Sesión" (Email)
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    try {
      // Intenta iniciar sesión con Firebase
      await signInWithEmailAndPassword(auth, values.email, values.password)
      toast.success("¡Bienvenido de vuelta!")
      router.push("/playground") // Redirige al playground
    } catch (error: any) {
      toast.error(getFirebaseErrorMessage(error.code)) // Muestra error amigable
    } finally {
      setIsLoading(false)
    }
  }

  // 10. Función de "Registrarse" (Email)
  async function handleSignUp() {
    const values = form.getValues()
    const validation = formSchema.safeParse(values)

    // Valida los campos antes de intentar registrar
    if (!validation.success) {
      form.trigger() // Muestra los errores de Zod
      return
    }

    setIsLoading(true)
    try {
      // Intenta crear un nuevo usuario
      await createUserWithEmailAndPassword(auth, values.email, values.password)
      toast.success("¡Cuenta creada exitosamente!")
      router.push("/playground") // Redirige al playground
    } catch (error: any) {
      toast.error(getFirebaseErrorMessage(error.code))
    } finally {
      setIsLoading(false)
    }
  }

  // 11. Función de "Iniciar Sesión con Google"
  async function handleGoogleSignIn() {
    setIsLoading(true)
    const provider = new GoogleAuthProvider()
    try {
      // Muestra el PopUp de Google
      await signInWithPopup(auth, provider)
      toast.success("¡Bienvenido!")
      router.push("/playground")
    } catch (error: any) {
      toast.error(getFirebaseErrorMessage(error.code))
    } finally {
      setIsLoading(false)
    }
  }

  // 12. El JSX (Lo que se renderiza)
  return (
    <>
      <Navigation /> {/* Tu Navbar */}

      <div className="min-h-screen bg-background pt-20">
        <div className="container mx-auto flex max-w-lg items-center justify-center py-12 md:py-24">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Accede a tu cuenta</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">

              {/* Botón de Google */}
              <Button
                variant="outline"
                className="w-full"
                onClick={handleGoogleSignIn}
                disabled={isLoading}
              >
                <Sparkles className="mr-2 h-4 w-4" />
                Continuar con Google
              </Button>

              {/* Separador */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">
                    O continúa con email
                  </span>
                </div>
              </div>

              {/* Formulario de Email/Pass */}
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  {/* Campo de Email */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="tu@email.com" {...field} />
                        </FormControl>
                        <FormMessage /> {/* Aquí aparecen los errores de Zod */}
                      </FormItem>
                    )}
                  />
                  {/* Campo de Contraseña */}
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contraseña</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="••••••••" {...field} />
                        </FormControl>
                        <FormMessage /> {/* Aquí aparecen los errores de Zod */}
                      </FormItem>
                    )}
                  />
                  {/* Botones de Acción */}
                  <div className="flex flex-col gap-3 pt-2">
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Cargando..." : "Iniciar Sesión"}
                    </Button>
                    <Button
                      type="button"
                      variant="secondary"
                      className="w-full"
                      onClick={handleSignUp}
                      disabled={isLoading}
                    >
                      Registrarse
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer /> {/* Tu Footer */}
    </>
  )
}

// 13. Función "Helper" para Errores
function getFirebaseErrorMessage(code: string) {
  switch (code) {
    case 'auth/user-not-found':
    case 'auth/wrong-password':
      return 'Email o contraseña incorrectos.';
    case 'auth/email-already-in-use':
      return 'Este email ya está en uso.';
    case 'auth/weak-password':
      return 'La contraseña es muy débil (mínimo 6 caracteres).';
    case 'auth/invalid-email':
      return 'El email no es válido.';
    case 'auth/popup-closed-by-user':
      return 'Cancelaste el inicio de sesión con Google.';
    default:
      return 'Ocurrió un error. Intenta de nuevo.';
  }
}
