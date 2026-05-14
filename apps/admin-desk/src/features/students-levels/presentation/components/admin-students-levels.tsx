import { useMemo, useState } from "react";

import type { StudentEntity } from "@salc/core/features/admin-desk/students/domain/entities/Student.entity";
import { useGetAllStudents } from "@/features/students/application/hooks";
import { useGetAllModules } from "@/features/modules/application/hooks";
import { useGetAllStudentLevels } from "@/features/students-levels/application/hooks/use-cases";
import type { ModuleEntity } from "@salc/core/features/admin-desk/modules/domain/entities/Module.entity";
import { cn } from "@salc/ui/lib/utils";
import type { ClassValue } from "class-variance-authority/types";
import SearchStudent from "@/features/students-levels/presentation/components/students/search-student";
import StudentProgressTimeline from "@/features/students-levels/presentation/components/students/student-progres-timeline";



export default function AdminStudentsLevels() {

    //* States
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedStudent, setSelectedStudent] = useState<StudentEntity | null>(null)
    const [addedModule, setAddedModule] = useState<string | null>(null)

    //* Querys
    const { data: responseStudents, isLoading: isLoadingStudents } = useGetAllStudents();
    const allStudents = useMemo(() => responseStudents?.data || [], [responseStudents]);
    const { data: responseModules, isLoading: isLoadingModules } = useGetAllModules();
    const { data: responseStudentLevels, isLoading: isLoadingStudentLevels } = useGetAllStudentLevels(selectedStudent?.id || '');

    //* Memos
    const filteredStudents = useMemo(() => {

        if (isLoadingStudents || !allStudents || allStudents.length === 0) return [];
        if (!searchQuery.trim()) return allStudents;

        const query = searchQuery.toLowerCase()

        return allStudents.filter((student) =>
            student.fullName.toLowerCase().includes(query) ||
            student.identificationCard.toLowerCase().includes(query) ||
            student.phoneNumber.includes(query) ||
            student.email.toLowerCase().includes(query)
        );
    }, [searchQuery, isLoadingStudents, allStudents]);


    const studentLevels = useMemo(() => responseStudentLevels?.data || [], [responseStudentLevels]);
    const allEnglishModules = useMemo(() => responseModules?.data || [], [responseModules]);

    const availableModulesForUpsell: ModuleEntity[] = useMemo(() => {
        if (isLoadingStudents || !allEnglishModules || !studentLevels) return [];

        return allEnglishModules.filter((module) => {
            return !studentLevels.some((studentLevel) => studentLevel.module.mo_id === module.mo_id)
        })

    }, [isLoadingStudents, allEnglishModules, studentLevels]);

    const isLoading = isLoadingStudents || isLoadingModules || isLoadingStudentLevels;

    //* Adapters
    const cnFunction = (...inputs: ClassValue[]) => cn(...inputs)

    //* Handlers
    const handleSelectStudent = (student: StudentEntity) => {
        setSelectedStudent(student)
    }

    const handleSearchStudent = (searchQuery: string) => {
        setSearchQuery(searchQuery)
    }

    const handleAddModule = (moduleId: string) => {
        setAddedModule(moduleId)
        setTimeout(() => setAddedModule(null), 2000)
    }

    return (
        <div className="grid gap-6 lg:grid-cols-3">
            {/* Student Search and List */}
            <SearchStudent
                searchQuery={searchQuery}
                filteredStudents={filteredStudents}
                selectedStudent={selectedStudent}
                totalStudentLevels={studentLevels.length}
                isLoading={isLoading}
                handleSearchStudent={handleSearchStudent}
                handleSelectStudent={handleSelectStudent}
                cnFunction={cnFunction}
            />

            {/* Student Progress Timeline */}
            <StudentProgressTimeline
                selectedStudent={selectedStudent}
                studentLevels={studentLevels}
                addedModule={addedModule}
                availableModulesForUpsell={availableModulesForUpsell}
                isLoading={isLoading}
                cnFunction={cnFunction}
                handleAddModule={handleAddModule}
            />
        </div>
    );
}
