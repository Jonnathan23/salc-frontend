import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ToastContainer } from "react-toastify";
import { QueryClientProvider } from "@tanstack/react-query";

import "./index.css";

import { loadCoreEnvs } from "@/core/config/envsLocal";
import { createQueryClient } from "@/core/config/queryClient";
import Router from "@/features/shared/identity/presentation/routes/router";

loadCoreEnvs();

const queryClient = createQueryClient();

createRoot(document.querySelector("#root")!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <Router />
            <ToastContainer position="top-right" autoClose={3000} />
        </QueryClientProvider>
    </StrictMode>,
);
