import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/core/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { navItems } from "@/core/data";

export default function DashboardPage() {
    const isAdmin = true;

    const filteredActions = navItems.filter(action => !action.adminOnly || isAdmin)

    return (
        <div className="space-y-6">
            <div className="space-y-1">
                <h2 className="text-2xl font-bold tracking-tight text-foreground">
                    Bienvenido
                </h2>
                <p className="text-muted-foreground">
                    {isAdmin
                        ? 'Tienes acceso completo al sistema de gestión de estudiantes.'
                        : 'Gestiona estudiantes y sus niveles desde aquí.'}
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredActions.map((action) => {
                    const Icon = action.icon
                    const iconColorClass = action.color === 'bg-accent'
                        ? 'text-accent-foreground'
                        : action.color === 'bg-primary'
                            ? 'text-primary-foreground'
                            : action.color === 'bg-secondary'
                                ? 'text-secondary-foreground'
                                : 'text-muted-foreground'

                    return (
                        <Link key={action.href} to={action.href}>
                            <Card className="group h-full transition-all hover:border-primary hover:shadow-md">
                                <CardHeader className="flex flex-row items-start gap-4 space-y-0">
                                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${action.color}`}>
                                        <Icon className={`h-6 w-6 ${iconColorClass}`} />
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        <CardTitle className="flex items-center justify-between text-lg">
                                            {action.title}
                                            <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                                        </CardTitle>
                                        <CardDescription>{action.description}</CardDescription>
                                    </div>
                                </CardHeader>
                            </Card>
                        </Link>
                    )
                })}
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Estado del Sistema</CardTitle>
                    <CardDescription>Resumen general del sistema SmartFlow</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 sm:grid-cols-3">
                        <div className="space-y-1 rounded-lg border p-4">
                            <p className="text-2xl font-bold text-primary">3</p>
                            <p className="text-sm text-muted-foreground">Estudiantes Activos</p>
                        </div>
                        <div className="space-y-1 rounded-lg border p-4">
                            <p className="text-2xl font-bold text-primary">6</p>
                            <p className="text-sm text-muted-foreground">Módulos Disponibles</p>
                        </div>
                        <div className="space-y-1 rounded-lg border p-4">
                            <p className="text-2xl font-bold text-primary">4</p>
                            <p className="text-sm text-muted-foreground">Vendedores</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
