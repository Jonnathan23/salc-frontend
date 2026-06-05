import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ToastContainer } from "react-toastify";
import { QueryClientProvider } from "@tanstack/react-query";

import "./index.css";
import Router from "@/features/shared/identity/presentation/routes/router";
import { loadCoreEnvs } from "@/core/config/envs-local";
import { createQueryClient } from "@/core/config/queryClient";

loadCoreEnvs();

const queryClient = createQueryClient();

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <Router />
            <ToastContainer position="top-right" autoClose={3000} />
        </QueryClientProvider>
    </StrictMode>,
);
