import type { ClassValue } from "class-variance-authority/types";
import { useMemo, useState } from "react";

import type { StudentEntity } from "@salc/core/features/admin-desk/students/domain/entities/Student.entity";
import type { ModuleEntity } from "@salc/core/features/admin-desk/modules/domain/entities/Module.entity";
import { cn } from "@salc/ui/lib/utils";

import { useGetAllStudentLevels, usePurchaseModules } from "@/features/admin-desk/students-levels/application/hooks/use-cases";
import { useGetAllStudents } from "@/features/admin-desk/students/application/hooks";
import { useGetAllModules } from "@/features/admin-desk/modules/application/hooks";
import type { BaseStudentLevelFormValues } from "@/features/admin-desk/students-levels/presentation/interfaces/BaseStudentLevelFormValues.interface";
import { useAuthStore } from "@/features/shared/identity/application/store/auth.store";
import { systemPermissions } from "@salc/core/enums/Permissions";

export const useAdminStudentsLevels = () => {
    //* Store
    const { userResponse } = useAuthStore();

    //* States
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedStudent, setSelectedStudent] = useState<StudentEntity | null>(null);
    const [modulesSelectedForUpsell, setModulesSelectedForUpsell] = useState<ModuleEntity[]>([]);

    //* Queries
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
            return !studentLevels.some((studentLevel) => studentLevel.module.moduleId === module.moduleId);
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
            if (previousModulesSelected.some((moduleSelected) => moduleSelected.moduleId === newModule.moduleId))
                return previousModulesSelected;

            return [...previousModulesSelected, newModule];
        });
    };

    const handleRemoveModulesForUpsell = (removeModule: ModuleEntity) => {
        setModulesSelectedForUpsell((previousModulesSelected) =>
            previousModulesSelected.filter((moduleSelected) => moduleSelected.moduleId !== removeModule.moduleId),
        );
    };

    const handleSuccess = () => {
        setModulesSelectedForUpsell([]);
    };

    const handleValidation = (): boolean => {
        if (!selectedStudent) return false;
        if (!userResponse?.userId) return false;
        if (modulesSelectedForUpsell.length === 0) return false;

        return true;
    };

    //* useMutations
    const { mutateAsync: purchaseModules, isPending: isLoadingPurchaseModules } = usePurchaseModules({ handleSuccess });

    const handlePurchaseModules = () => {
        if (!handleValidation()) return;

        const moduleIds = modulesSelectedForUpsell.map((module) => module.moduleId);
        const formValues: BaseStudentLevelFormValues = {
            studentId: selectedStudent!.id,
            sellerId: userResponse!.userId,
            moduleIds: moduleIds,
        };

        purchaseModules(formValues);
    };

    return {
        //states
        userResponse,
        //states
        searchQuery,
        selectedStudent,
        modulesSelectedForUpsell,
        //Queries - loading
        isLoadingStudents,
        // Memos
        canUserPurchaseModules,
        filteredStudents,
        studentLevels,
        availableModulesForUpsell,
        isLoadingProgressTimeline,
        isLoadingPurchaseModules,
        totalStudents: studentLevels.length,
        // handlers
        handleSelectStudent,
        handleSearchStudent,
        handleAddModulesForUpsell,
        handleRemoveModulesForUpsell,
        handlePurchaseModules,
        cnFunction,
    };
};
