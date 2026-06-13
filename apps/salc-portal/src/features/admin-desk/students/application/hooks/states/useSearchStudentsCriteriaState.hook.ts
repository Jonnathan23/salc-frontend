import { useSearchStudentsByCriteria } from "@/features/admin-desk/students/application/hooks/use-cases/useSearchStudentsByCriteria.use";
import type { BaseSearchStudentsCriteriaValues } from "@/features/admin-desk/students/presentation/interfaces/BaseSearchStudentsCriteriaValues.interface";
import { useMemo, useState } from "react";

interface UpdateFilterProps<K extends keyof BaseSearchStudentsCriteriaValues> {
    key: K;
    value: BaseSearchStudentsCriteriaValues[K];
}

export const useSearchStudentsCriteriaState = () => {
    //* Hooks
    const [filters, setFilters] = useState<BaseSearchStudentsCriteriaValues>({
        page: 1,
        searchTerm: "",
        nationality: "",
        certificateType: "",
        isGraduated: "",
        contractStatus: "",
        progressCategory: "",
    });

    //* Queries
    const { data: response, isLoading, isError, refetch } = useSearchStudentsByCriteria(filters);

    //* Selectors
    const students = useMemo(() => response?.data?.data ?? [], [response]);
    const meta = useMemo(() => response?.data?.meta, [response]);

    //* Handlers
    const handleUpdateFilter = <K extends keyof BaseSearchStudentsCriteriaValues>(props: UpdateFilterProps<K>) => {
        const { key, value } = props;

        setFilters((prev) => ({ ...prev, [key]: value, page: 1 }));
    };

    const handleSetPage = (page: number) => {
        setFilters((prev) => ({ ...prev, page }));
    };

    const handleResetFilters = () => {
        setFilters({
            page: 1,
            searchTerm: "",
            nationality: "",
            certificateType: "",
            isGraduated: "",
            contractStatus: "",
            progressCategory: "",
        });
    };

    return {
        filters,
        students,
        meta,
        isLoading,
        isError,
        refetch,
        handleSetPage,
        handleResetFilters,
        handleUpdateFilter,
    };
};
