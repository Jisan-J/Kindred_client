"use client"
import { useEffect, type FormEvent } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/toast"
import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"
import { authClient } from "@/lib/auth-client"

export default function LoginPage() {
  // proxy.ts redirects unauthenticated visitors here from a protected page,
  // and the browser keeps the old scroll position — snap back to the top so
  // the login form is visible, not the bottom of the page.
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleSignIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const user = Object.fromEntries(formData.entries()) as {
      email: string
      password: string
    }
    const { error } = await authClient.signIn.email({
      email: user.email,
      password: user.password,
      rememberMe: true,
    })
    if (error) {
      toast.add({
        type: "error",
        title: error.message,
      })
      return
    }

    // Full document load: the client-side router cache still holds the
    // pre-login state, which breaks /manage-events and /joined-event until
    // a hard refresh. This forces that refresh once, right after login.
    window.location.replace("/")
  }
  const handleGoogleLogin = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    })
  }
  return (
    <main className="grid min-h-screen grid-cols-1 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="hidden flex-col justify-between bg-[linear-gradient(rgba(54,59,101,0.68),rgba(54,59,101,0.82)),url('https://images.unsplash.com/photo-1551791506-57d68c0c6882?auto=format&fit=crop&w=1200&q=85')] bg-cover bg-center px-10 py-8 text-white lg:flex lg:px-[65px] lg:py-[42px]">
        <Link
          href="/"
          className="inline-flex items-center gap-[10px] border-0 bg-transparent p-0 font-heading text-lg font-extrabold tracking-[-0.8px] text-white sm:text-xl"
          aria-label="Go to home"
        >
          <span>
            Kindred<span className="text-[#8995ce]">Good</span>
          </span>
        </Link>
        <div>
          <span className="inline-flex items-center gap-[7px] rounded-[30px] border border-[rgba(166,177,225,0.45)] bg-[rgba(220,214,247,0.72)] px-3 py-2 text-xs font-extrabold tracking-[0.7px] text-[#6872ac]">
            <Sparkles size={16} aria-hidden="true" /> A kinder city starts here
          </span>
          <h2 className="my-5 text-[43px] leading-[1.15] tracking-[-2px]">
            Welcome community
            <br />
            <em className="font-[Georgia,serif] font-normal text-[#dcd6f7]">
              member!.
            </em>
          </h2>
          <p className="text-[#e0e2ef]">
            Join thousands of neighbors turning care into action.
          </p>
        </div>
        <blockquote className="m-0 max-w-[420px] font-[Georgia,serif] text-lg italic">
          “We rise by lifting others.”
          <span className="mt-3 block text-[10px] text-[#c9cde1]">
            — Robert Ingersoll
          </span>
        </blockquote>
      </div>
      <div className="grid place-items-center bg-[#fdfcff] p-5 sm:p-10 lg:p-[50px]">
        <div className="w-full max-w-md">
          <h1 className="mb-2 text-4xl text-ink">Login your account</h1>
          <p className="mb-7 text-sm text-muted-foreground">
            Welcome back! Please enter your details.
          </p>
          <form onSubmit={handleSignIn}>
            <label className="mb-[15px] block text-xs font-bold text-[#555b77]">
              Email address
              <Input
                className="mt-[7px] h-auto w-full rounded-[10px] border border-input bg-white px-[14px] py-[13px] text-foreground shadow-none focus-visible:border-mid focus-visible:ring-[3px] focus-visible:ring-mid/20"
                required
                type="email"
                name="email"
                placeholder="Enter your email"
              />
            </label>
            <label className="mb-[15px] block text-xs font-bold text-[#555b77]">
              Password
              <Input
                className="mt-[7px] h-auto w-full rounded-[10px] border border-input bg-white px-[14px] py-[13px] text-foreground shadow-none focus-visible:border-mid focus-visible:ring-[3px] focus-visible:ring-mid/20"
                required
                type="password"
                name="password"
                placeholder="Enter your password"
              />
            </label>

            <Button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-[10px] rounded-xl bg-ink px-[22px] py-[15px] text-sm font-bold text-white shadow-[0_8px_18px_rgba(66,72,116,0.18)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#343a64] hover:shadow-[0_11px_25px_rgba(66,72,116,0.24)]"
            >
              Log In
              <ArrowRight size={18} aria-hidden="true" />
            </Button>
          </form>
          <div className="my-5 flex items-center gap-[10px] text-[10px] text-[#9a9eb1] before:h-px before:flex-1 before:bg-[#e4e2ed] before:content-[''] after:h-px after:flex-1 after:bg-[#e4e2ed] after:content-['']">
            <span>or continue with</span>
          </div>
          <button
            onClick={handleGoogleLogin}
            className="w-full rounded-[10px] border border-input bg-white p-3 font-semibold text-[#5f647e]"
          >
            <strong className="mr-2 text-[#4285f4]">G</strong> Google
          </button>
          <p className="mt-5 text-center text-xs text-muted-foreground">
            Don’t have an account?{" "}
            <Link
              href="/register"
              className="border-0 bg-transparent font-bold text-ink"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
