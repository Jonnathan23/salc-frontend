import type { ClassValue } from "class-variance-authority/types";
import { useMemo, useState } from "react";

import { cn } from "@salc/ui/lib/utils";

import { usePurchaseModules } from "@/features/admin-desk/students-levels/application/hooks/use-cases";
import type { BaseStudentLevelFormValues } from "@/features/admin-desk/students-levels/presentation/interfaces/BaseStudentLevelFormValues.interface";
import { useAuthStore } from "@/features/shared/identity/application/store/auth.store";
import { systemPermissions } from "@salc/core/enums/Permissions";

import { useDebounce } from "@/core/hooks/useDebounce.use";
import { useSearchStudentsLevels } from "@/features/admin-desk/students-levels/application/hooks/use-cases/useSearchStudentsLevels.hook";
import { useGetStudentTimeline } from "@/features/admin-desk/students-levels/application/hooks/use-cases/useGetStudentTimeline.hook";

import type { SearchStudentsLevelsDto } from "@salc/core/features/admin-desk/students-level/domain/dtos/SearchStudentsLevels.dto";
import type { TimelineAvailableModule } from "@salc/core/features/admin-desk/students-level/domain/entities/StudentTimelineProjection.entity";

export const useAdminStudentsLevels = () => {
    //* Store
    const { userResponse } = useAuthStore();

    //* States
    const [searchQuery, setSearchQuery] = useState("");
    const [isComboOpen, setIsComboOpen] = useState(false);
    const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
    const [modulesSelectedForUpsell, setModulesSelectedForUpsell] = useState<TimelineAvailableModule[]>([]);

    //* Debounce
    const debouncedSearchQuery = useDebounce(searchQuery, 300);
    const searchParameters: SearchStudentsLevelsDto | null =
        debouncedSearchQuery.length >= 2
            ? {
                  searchTerm: debouncedSearchQuery,
                  limit: 10,
              }
            : null;

    //* Queries
    const { data: searchResults, isLoading: isLoadingStudents } = useSearchStudentsLevels(searchParameters);
    const { data: timelineData, isLoading: isLoadingProgressTimeline } = useGetStudentTimeline(selectedStudentId);

    //* Memos
    const canUserPurchaseModules = useMemo(() => {
        if (!userResponse) return false;
        if (!userResponse.permissions) return false;

        return userResponse.permissions.includes(systemPermissions.ADMINDESK_CONTRACTS_WRITE);
    }, [userResponse]);

    const filteredStudents = useMemo(() => searchResults ?? [], [searchResults]);
    const studentTimelineInfo = useMemo(() => timelineData?.studentInfo ?? null, [timelineData]);
    const studentLevels = useMemo(() => timelineData?.enrolledLevels ?? [], [timelineData]);
    const availableModulesForUpsell = useMemo(() => timelineData?.availableModules ?? [], [timelineData]);

    //* Adapters
    const cnFunction = (...inputs: ClassValue[]): string => cn(...inputs);

    //* Handlers
    const handleSelectStudent = (studentId: string, identificationCard: string, fullName: string) => {
        setSelectedStudentId(studentId);
        setSearchQuery(`${identificationCard} - ${fullName}`);
        setIsComboOpen(false);
        setModulesSelectedForUpsell([]);
    };

    const handleSearchStudent = (query: string) => {
        setSearchQuery(query);
    };

    const handleAddModulesForUpsell = (newModule: TimelineAvailableModule) => {
        setModulesSelectedForUpsell((previousModulesSelected) => {
            if (previousModulesSelected.some((moduleSelected) => moduleSelected.moduleId === newModule.moduleId))
                return previousModulesSelected;

            return [...previousModulesSelected, newModule];
        });
    };

    const handleRemoveModulesForUpsell = (removeModule: TimelineAvailableModule) => {
        setModulesSelectedForUpsell((previousModulesSelected) =>
            previousModulesSelected.filter((moduleSelected) => moduleSelected.moduleId !== removeModule.moduleId),
        );
    };

    const handleSuccess = () => {
        setModulesSelectedForUpsell([]);
    };

    const handleValidation = (): boolean => {
        if (!selectedStudentId) return false;
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
            studentId: selectedStudentId!,
            sellerId: userResponse!.userId,
            moduleIds: moduleIds,
        };

        purchaseModules(formValues);
    };

    return {
        //states
        userResponse,
        searchQuery,
        isComboOpen,
        selectedStudentId,
        modulesSelectedForUpsell,
        //Queries - loading
        isLoadingStudents,
        isLoadingProgressTimeline,
        isLoadingPurchaseModules,
        // Memos
        canUserPurchaseModules,
        filteredStudents,
        studentTimelineInfo,
        studentLevels,
        availableModulesForUpsell,
        // handlers
        setIsComboOpen,
        handleSelectStudent,
        handleSearchStudent,
        handleAddModulesForUpsell,
        handleRemoveModulesForUpsell,
        handlePurchaseModules,
        cnFunction,
    };
};
