import { signIn } from "@/lib/auth"
import { Github } from "lucide-react"
import Image from "next/image"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-8 rounded-lg border border-brand-border bg-brand-panel p-10 shadow-lg">
        <div className="text-center">
          <div className="flex justify-center mb-6">
             <Image src="/icon.png" alt="GitKarma Logo" width={48} height={48} className="object-contain" />
          </div>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground">
            Sign in to GitKarma
          </h2>
          <p className="mt-2 text-sm text-brand-muted">
            Connect your GitHub account to get started
          </p>
        </div>
        <form
          action={async () => {
            "use server"
            await signIn("github", { redirectTo: "/dashboard" })
          }}
          className="mt-8 space-y-6"
        >
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-3 rounded-md bg-[#24292F] px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#24292F]/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#24292F] transition-all"
          >
            <Github className="h-5 w-5" />
            Sign in with GitHub
          </button>
        </form>
      </div>
    </div>
  )
}
