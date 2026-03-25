import { Alert, AlertDescription } from '@/core/components/alerts/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/core/components/ui/card';
import { CheckCircle, GraduationCap, ShieldCheck } from 'lucide-react';

export const PageHeader = () => (
    <div className="space-y-1">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Registro de Usuarios
        </h2>
        <p className="text-muted-foreground">
            Crea cuentas para administradores y profesores del sistema.
        </p>
    </div>
);

export const SuccessAlert = () => (
    <Alert className="border-success/50 bg-success/10">
        <CheckCircle className="h-4 w-4 text-success" />
        <AlertDescription className="text-success">
            Usuario creado exitosamente. El formulario se reiniciará en breve.
        </AlertDescription>
    </Alert>
);

export const RoleInfoCard = ({ selectedRole }: { selectedRole: string }) => (
    <Card>
        <CardHeader>
            <CardTitle className="text-lg">Información de Roles</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className={`rounded-lg border p-4 transition-colors ${selectedRole === 'ADMIN' ? 'border-primary bg-primary/5' : ''}`}>
                <div className="flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-primary" />
                    <h4 className="font-medium text-foreground">Administrador</h4>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                    Acceso completo al sistema: gestión de usuarios, migración de datos,
                    y todas las funciones de matrícula y niveles.
                </p>
            </div>

            <div className={`rounded-lg border p-4 transition-colors ${selectedRole === 'TEACHER' ? 'border-primary bg-primary/5' : ''}`}>
                <div className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-muted-foreground" />
                    <h4 className="font-medium text-foreground">Profesor</h4>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                    Acceso limitado: puede gestionar matrículas de estudiantes y
                    consultar niveles. No tiene acceso a configuración del sistema.
                </p>
            </div>
        </CardContent>
    </Card>
);