import { useRef, useEffect } from "react";
import { Search, Loader2 } from "lucide-react";

interface ComboBoxProps {
    readonly value: string;
    readonly onChange: (value: string) => void;
    readonly placeholder?: string;
    readonly isLoading?: boolean;
    readonly isOpen: boolean;
    readonly onOpenChange: (isOpen: boolean) => void;
    readonly hasResults: boolean;
    readonly children: React.ReactNode;
}

export function ComboBox(props: ComboBoxProps) {
    const { value, onChange, placeholder, isLoading, isOpen, onOpenChange, hasResults, children } = props;
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                onOpenChange(false);
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [onOpenChange]);

    return (
        <div ref={containerRef} className="relative w-full">
            <div className="relative">
                <input
                    type="text"
                    value={value}
                    onChange={(e) => {
                        onChange(e.target.value);
                        onOpenChange(true); // Abrir al escribir
                    }}
                    onFocus={() => onOpenChange(true)} // Abrir al hacer focus
                    placeholder={placeholder}
                    className="w-full pl-9 pr-3 py-2.5 bg-background border border-input rounded-lg text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-ring focus:border-ring transition-colors"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                {isLoading && <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-primary" />}
            </div>

            {isOpen && value.trim().length > 0 && (
                <div className="absolute z-50 w-full mt-1 bg-card border border-border rounded-lg shadow-lg max-h-60 overflow-auto">
                    {hasResults ? (
                        <ul className="py-1">{children}</ul>
                    ) : (
                        !isLoading && (
                            <div className="p-3 text-sm text-center text-muted-foreground">No se encontraron resultados</div>
                        )
                    )}
                </div>
            )}
        </div>
    );
}
