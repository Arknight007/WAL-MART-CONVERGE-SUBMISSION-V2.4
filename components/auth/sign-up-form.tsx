"use client"

import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"
import Link from "next/link"
import { signUp } from "@/lib/actions"

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full bg-[#0071ce] hover:bg-[#004f9f] text-white py-6 text-lg font-medium rounded-lg h-[60px]"
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Creating account...
        </>
      ) : (
        "Create Account"
      )}
    </Button>
  )
}

export default function SignUpForm() {
  const [state, formAction] = useActionState(signUp, null)

  return (
    <div className="w-full max-w-md space-y-8">
      <div className="space-y-2 text-center">
        <div className="flex items-center justify-center mb-6">
          <div className="w-12 h-12 bg-[#ffc220] rounded-full flex items-center justify-center">
            <div className="w-10 h-10 bg-[#0071ce] rounded-full relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-2 h-2 bg-[#ffc220] rounded-full"></div>
              </div>
              {/* Spark rays */}
              <div className="absolute -top-1 left-1/2 w-0.5 h-3 bg-[#ffc220] transform -translate-x-1/2"></div>
              <div className="absolute -bottom-1 left-1/2 w-0.5 h-3 bg-[#ffc220] transform -translate-x-1/2"></div>
              <div className="absolute -left-1 top-1/2 w-3 h-0.5 bg-[#ffc220] transform -translate-y-1/2"></div>
              <div className="absolute -right-1 top-1/2 w-3 h-0.5 bg-[#ffc220] transform -translate-y-1/2"></div>
            </div>
          </div>
        </div>
        <h1 className="text-4xl font-semibold tracking-tight text-gray-900">Create your account</h1>
        <p className="text-lg text-gray-600">Join Walmart and start saving today</p>
      </div>

      <form action={formAction} className="space-y-6">
        {state?.error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">{state.error}</div>
        )}

        {state?.success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">{state.success}</div>
        )}

        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
              className="h-12 border-gray-300 focus:border-[#0071ce] focus:ring-[#0071ce]"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              className="h-12 border-gray-300 focus:border-[#0071ce] focus:ring-[#0071ce]"
            />
          </div>
        </div>

        <SubmitButton />

        <div className="text-center text-gray-600">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-[#0071ce] hover:underline font-medium">
            Sign in
          </Link>
        </div>
      </form>
    </div>
  )
}
