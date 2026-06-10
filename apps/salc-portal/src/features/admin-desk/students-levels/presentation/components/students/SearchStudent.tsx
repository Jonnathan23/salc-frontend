import { Search } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/core/components/ui/Card";
import { ComboBox } from "@/core/components/search/ComboBox";
import type { StudentSearchProjectionEntity } from "@salc/core/features/admin-desk/students-level/domain/entities/StudentSearchProjection.entity";

interface SearchStudentProps {
    readonly searchQuery: string;
    readonly isComboOpen: boolean;
    readonly filteredStudents: StudentSearchProjectionEntity[];
    readonly isLoading: boolean;

    handleSearchStudent: (searchQuery: string) => void;
    handleSelectStudent: (studentId: string, identificationCard: string, fullName: string) => void;
    setIsComboOpen: (isOpen: boolean) => void;
}

export default function SearchStudent(props: SearchStudentProps) {
    const { searchQuery, isComboOpen, filteredStudents, isLoading, handleSearchStudent, handleSelectStudent, setIsComboOpen } =
        props;

    return (
        <Card className="lg:col-span-1">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                    <Search className="h-5 w-5 text-primary" />
                    Buscar Estudiante
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-foreground">Buscador</label>
                    <ComboBox
                        value={searchQuery}
                        onChange={handleSearchStudent}
                        placeholder="Buscar por cédula o nombre..."
                        isLoading={isLoading}
                        isOpen={isComboOpen}
                        onOpenChange={setIsComboOpen}
                        hasResults={filteredStudents.length > 0}
                    >
                        {filteredStudents.map((student) => (
                            <li
                                key={student.id}
                                onClick={() => handleSelectStudent(student.id, student.identificationCard, student.fullName)}
                                className="flex cursor-pointer flex-col px-3 py-2 transition-colors hover:bg-muted/50"
                            >
                                <span className="text-sm font-medium text-foreground">{student.fullName}</span>
                                <span className="mt-0.5 font-mono text-xs text-muted-foreground">
                                    {student.identificationCard} • {student.totalEnrolledLevels} módulo(s) inscrito(s)
                                </span>
                            </li>
                        ))}
                    </ComboBox>
                </div>
            </CardContent>
        </Card>
    );
}
