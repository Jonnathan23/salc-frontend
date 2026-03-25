import { Alert, AlertDescription } from '@/core/components/alerts/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/core/components/ui/card';
import { BookOpen, Briefcase, CheckCircle, GraduationCap, ShieldCheck } from 'lucide-react';
export const PageHeader = () => (
    <div className="space-y-1">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Registro de Usuarios
        </h2>
        <p className="text-muted-foreground">
            Crea cuentas para el personal administrativo, asesores, directores y profesores.
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
            {/* ADMIN */}
            <div className={`rounded-lg border p-4 transition-colors ${selectedRole === 'ADMIN' ? 'border-primary bg-primary/5' : ''}`}>
                <div className="flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-primary" />
                    <h4 className="font-medium text-foreground">Administrador</h4>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                    Acceso total sin restricciones a ambos subsistemas (AdminDesk y ClassTrack).
                </p>
            </div>

            {/* ADVISOR */}
            <div className={`rounded-lg border p-4 transition-colors ${selectedRole === 'ADVISOR' ? 'border-primary bg-primary/5' : ''}`}>
                <div className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-amber-500" />
                    <h4 className="font-medium text-foreground">Asesor</h4>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                    Acceso limitado a AdminDesk. Permisos exclusivos para registrar estudiantes, generar contratos y gestionar módulos adquiridos.
                </p>
            </div>

            {/* ACADEMIC DIRECTOR */}
            <div className={`rounded-lg border p-4 transition-colors ${selectedRole === 'ACADEMIC_DIRECTOR' ? 'border-primary bg-primary/5' : ''}`}>
                <div className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-blue-500" />
                    <h4 className="font-medium text-foreground">Director Académico</h4>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                    Acceso total a ClassTrack. En AdminDesk, posee permisos de solo lectura para auditar la información de estudiantes y niveles.
                </p>
            </div>

            {/* TEACHER */}
            <div className={`rounded-lg border p-4 transition-colors ${selectedRole === 'TEACHER' ? 'border-primary bg-primary/5' : ''}`}>
                <div className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-muted-foreground" />
                    <h4 className="font-medium text-foreground">Profesor</h4>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                    Acceso estándar a ClassTrack para gestión de aulas y asistencia. Acceso de solo lectura al perfil de sus estudiantes.
                </p>
            </div>
        </CardContent>
    </Card>
);