import { QueryClientProvider } from "@tanstack/react-query"
import { ThemeProvider } from "./components/theme-provider"
import { Dashboard } from "./pages/dashboard"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { queryClient } from "./lib/queryClient"
import { AuthProvider } from "./context/AuthContext"

export function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <Dashboard />

          <ReactQueryDevtools initialIsOpen={false} />

        </QueryClientProvider>
      </ThemeProvider>
    </AuthProvider>
  )
}
