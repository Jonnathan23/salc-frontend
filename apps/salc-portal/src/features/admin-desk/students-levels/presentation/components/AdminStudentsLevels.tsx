import type { ClassValue } from "class-variance-authority/types";
import { useMemo, useState } from "react";

import type { StudentEntity } from "@salc/core/features/admin-desk/students/domain/entities/Student.entity";
import type { ModuleEntity } from "@salc/core/features/admin-desk/modules/domain/entities/Module.entity";
import { cn } from "@salc/ui/lib/utils";

import StudentProgressTimeline from "@/features/admin-desk/students-levels/presentation/components/students/StudentProgresTimeline";
import SearchStudent from "@/features/admin-desk/students-levels/presentation/components/students/Searchstudent";
import { useGetAllStudentLevels, usePurchaseModules } from "@/features/admin-desk/students-levels/application/hooks/use-cases";
import { useGetAllStudents } from "@/features/admin-desk/students/application/hooks";
import { useGetAllModules } from "@/features/admin-desk/modules/application/hooks";
import type { BaseStudentLevelFormValues } from "@/features/admin-desk/students-levels/presentation/interfaces/BaseStudentLevelFormValues.interface";
import { useAuthStore } from "@/features/shared/identity/application/store/auth.store";
import { systemPermissions } from "@salc/core/enums/Permissions";

export default function AdminStudentsLevels() {
    //TODO: marcar como graduado a un estudiante
    // TODO: marcar cuando finaliza un nivel

    //* Store
    const { userResponse } = useAuthStore();

    //* States
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedStudent, setSelectedStudent] = useState<StudentEntity | null>(null);
    const [modulesSelectedForUpsell, setModulesSelectedForUpsell] = useState<ModuleEntity[]>([]);

    //* Querys
    const { data: responseStudents, isLoading: isLoadingStudents } = useGetAllStudents();
    const { data: responseModules, isLoading: isLoadingModules } = useGetAllModules();
    const { data: responseStudentLevels, isLoading: isLoadingStudentLevels } = useGetAllStudentLevels(selectedStudent?.id || "");

    //* Memos
    const allStudents = useMemo(() => responseStudents?.data || [], [responseStudents]);
    const canUserPurchaseModules = useMemo(() => {
        if (!userResponse) return false;
        if (!userResponse.permissions) return false;

        return userResponse.permissions.includes(systemPermissions.ADMINDESK_CONTRACTS_WRITE);
    }, [userResponse]);

    const filteredStudents = useMemo(() => {
        if (isLoadingStudents || !allStudents || allStudents.length === 0) return [];
        if (!searchQuery.trim()) return allStudents;

        const query = searchQuery.toLowerCase();

        return allStudents.filter(
            (student) =>
                student.fullName.toLowerCase().includes(query) ||
                student.identificationCard.toLowerCase().includes(query) ||
                student.phoneNumber.includes(query) ||
                student.email.toLowerCase().includes(query),
        );
    }, [searchQuery, isLoadingStudents, allStudents]);

    const studentLevels = useMemo(() => responseStudentLevels?.data || [], [responseStudentLevels]);
    const allEnglishModules = useMemo(() => responseModules?.data || [], [responseModules]);

    const availableModulesForUpsell: ModuleEntity[] = useMemo(() => {
        if (isLoadingStudents || !allEnglishModules || !studentLevels) return [];

        return allEnglishModules.filter((module) => {
            return !studentLevels.some((studentLevel) => studentLevel.module.mo_id === module.mo_id);
        });
    }, [isLoadingStudents, allEnglishModules, studentLevels]);

    const isLoadingProgressTimeline = useMemo(
        () => isLoadingModules || isLoadingStudentLevels,
        [isLoadingModules, isLoadingStudentLevels],
    );

    //* Adapters
    const cnFunction = (...inputs: ClassValue[]): string => cn(...inputs);

    //* Handlers
    const handleSelectStudent = (student: StudentEntity) => {
        setSelectedStudent(student);
        setModulesSelectedForUpsell([]);
    };

    const handleSearchStudent = (searchQuery: string) => {
        setSearchQuery(searchQuery);
    };

    const handleAddModulesForUpsell = (newModule: ModuleEntity) => {
        setModulesSelectedForUpsell((previousModulesSelected) => {
            if (previousModulesSelected.some((moduleSelected) => moduleSelected.mo_id === newModule.mo_id))
                return previousModulesSelected;

            return [...previousModulesSelected, newModule];
        });
    };

    const handleRemoveModulesForUpsell = (removeModule: ModuleEntity) => {
        setModulesSelectedForUpsell((previousModulesSelected) =>
            previousModulesSelected.filter((moduleSelected) => moduleSelected.mo_id !== removeModule.mo_id),
        );
    };

    const handleSuccess = () => {
        setModulesSelectedForUpsell([]);
    };

    const handleValidation = (): boolean => {
        if (!selectedStudent) return false;
        if (!userResponse?.us_id) return false;
        if (modulesSelectedForUpsell.length === 0) return false;

        return true;
    };

    //* useMutations
    const { mutateAsync: purchaseModules, isPending: isLoadingPurchaseModules } = usePurchaseModules({ handleSuccess });

    const handlePurchaseModules = () => {
        if (!handleValidation()) return;

        const momoduleIds = modulesSelectedForUpsell.map((module) => module.mo_id);
        const formValues: BaseStudentLevelFormValues = {
            studentId: selectedStudent!.id,
            sellerId: userResponse!.us_id,
            moduleIds: momoduleIds,
        };

        purchaseModules(formValues);
    };

    return (
        <div className="grid gap-6 lg:grid-cols-3">
            {/* Student Search and List */}
            <SearchStudent
                searchQuery={searchQuery}
                filteredStudents={filteredStudents}
                selectedStudent={selectedStudent}
                totalStudentLevels={studentLevels.length}
                isLoading={isLoadingStudents}
                handleSearchStudent={handleSearchStudent}
                handleSelectStudent={handleSelectStudent}
                cnFunction={cnFunction}
            />

            {/* Student Progress Timeline */}
            <StudentProgressTimeline
                selectedStudent={selectedStudent}
                studentLevels={studentLevels}
                modulesSelectedForUpsell={modulesSelectedForUpsell}
                availableModulesForUpsell={availableModulesForUpsell}
                isLoading={isLoadingProgressTimeline}
                canUserPurchaseModules={canUserPurchaseModules}
                cnFunction={cnFunction}
                handleAddModulesForUpsell={handleAddModulesForUpsell}
                handleRemoveModulesForUpsell={handleRemoveModulesForUpsell}
                handlePurchaseModules={handlePurchaseModules}
                isLoadingPurchaseModules={isLoadingPurchaseModules}
            />
        </div>
    );
}
