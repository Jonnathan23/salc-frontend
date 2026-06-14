import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ToastContainer } from "react-toastify";

import "./index.css";
import { QueryClientProvider } from "@tanstack/react-query";
import Router from "@/core/routes/Router";
import { createQueryClient } from "@/core/config/queryClient";
import { loadCoreEnvs } from "@/core/config/envsLocal";

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
