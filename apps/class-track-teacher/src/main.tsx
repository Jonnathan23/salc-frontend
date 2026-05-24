import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <div className="bg-red-500 text-white p-4 text-center font-bold text-2xl">
            <h1>Class Track</h1>
            <p>SI VES ESTO ROJO, TAILWIND ESTÁ VIVO</p>
        </div>
    </StrictMode>
);
