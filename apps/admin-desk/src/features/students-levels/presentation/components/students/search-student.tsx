import { Loader2, Search } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/core/components/ui/card";
import { Input } from "@/core/components/ui/input";
import type { StudentEntity } from "@salc/core/features/admin-desk/students/domain/entities/Student.entity";
import type { ClassValue } from "class-variance-authority/types";


interface SearchStudentProps {
    searchQuery: string;
    filteredStudents: StudentEntity[];
    selectedStudent: StudentEntity | null;
    totalStudentLevels: number;
    isLoading: boolean;

    handleSearchStudent: (searchQuery: string) => void;
    handleSelectStudent: (student: StudentEntity) => void;
    cnFunction: (...inputs: ClassValue[]) => string;
}


export default function SearchStudent(props: SearchStudentProps) {

    const { searchQuery, filteredStudents, selectedStudent, totalStudentLevels, isLoading,
        handleSearchStudent, handleSelectStudent, cnFunction } = props

    const renderContent = () => {
        if (isLoading) {
            return (
                <p className="flex items-center justify-center">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Cargando estudiantes...
                </p>
            );
        }

        if (filteredStudents.length === 0) {
            return (
                <p className="py-4 text-center text-sm text-muted-foreground">
                    No se encontraron estudiantes
                </p>
            );
        }

        return filteredStudents.map((student) => (
            <button
                key={student.id}
                onClick={() => handleSelectStudent(student)}
                className={cnFunction(
                    "w-full rounded-lg border p-3 text-left transition-colors hover:border-primary",
                    selectedStudent?.id === student.id
                        ? "border-primary bg-primary/5"
                        : "border-border"
                )}
            >
                <p className="font-medium text-foreground">{student.fullName}</p>
                <p className="text-xs text-muted-foreground">
                    {totalStudentLevels} módulo(s) inscrito(s)
                </p>
            </button>
        ));
    };

    return (
        <Card className="lg:col-span-1">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                    <Search className="h-5 w-5 text-primary" />
                    Buscar Estudiante
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Nombre o teléfono..."
                        value={searchQuery}
                        onChange={(e) => handleSearchStudent(e.target.value)}
                        className="pl-10"
                    />
                </div>

                <div className="space-y-2">
                    {renderContent()}
                </div>
            </CardContent>
        </Card>
    );
}
