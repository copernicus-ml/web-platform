import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { queryClient, router } from "./router.tsx";
import { ClerkProvider, useAuth } from "@clerk/react";
import "@/i18n/i18n";
import "./index.css";
import FlashToast from "./components/ui/FlashToast.tsx";
import { QueryClientProvider } from "@tanstack/react-query";

function AppRouter() {
  const { isLoaded, isSignedIn, getToken } = useAuth();
  useEffect(() => {
    if (isLoaded && !isSignedIn) router.invalidate();
  }, [isSignedIn, isLoaded]);
  if (!isLoaded) {
    return <></>; // probably could be an animation here
  }

  return (
    <RouterProvider
      router={router}
      context={{
        queryClient: queryClient,
        auth: { isSignedIn: Boolean(isSignedIn), getToken },
      }}
    />
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ClerkProvider>
        <FlashToast>
          <AppRouter />
        </FlashToast>
      </ClerkProvider>
    </QueryClientProvider>
  </StrictMode>,
);
