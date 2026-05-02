import { Separator } from "@/components/ui/separator"
import { Button } from "./ui/button"

export function SiteHeader() {
  const authenticationUrl = "https://auth.mercadolivre.com.br/authorization?response_type=code&client_id=4933724664056622&redirect_uri=https://felipegalkowski.github.io/omni-mark/"

  return (
    <header className="flex h-12 shrink-0 items-center gap-2 border-b ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">Dashboard</h1>
      </div>
      <Button
        onClick={() => globalThis.location.href = authenticationUrl}
      >
        Login
      </Button>
    </header>
  )
}
