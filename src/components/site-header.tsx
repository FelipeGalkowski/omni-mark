import { Separator } from "@/components/ui/separator"
import { Button } from "./ui/button"
import { useAuth } from "@/hooks/useAuth";

export function SiteHeader() {
  const { signed, setSignedIn, signIn } = useAuth();

  async function handleSignIn() {
    const redirectUrl = await signIn();
    console.log(redirectUrl);

    if (redirectUrl) {
      globalThis.location.href = redirectUrl;
    };
  }

  return (
    <header className="flex h-12 shrink-0 items-center gap-2 border-b ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">Dashboard</h1>
      </div>
      {signed && (
        <>
          <span>Logado</span>
          <Button
            onClick={() => setSignedIn(false)}
          >
            Sair
          </Button>
        </>
      )}
      {!signed && (
        <Button
          onClick={handleSignIn}
        >
          Login
        </Button>
      )}
    </header>
  )
}
