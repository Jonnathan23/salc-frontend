import StudentProgressTimeline from "@/features/admin-desk/students-levels/presentation/components/students/StudentProgresTimeline";
import SearchStudent from "@/features/admin-desk/students-levels/presentation/components/students/SearchStudent";

import { useAdminStudentsLevels } from "@/features/admin-desk/students-levels/application/hooks/logic/useAdminStudentsLevels.use";

export default function AdminStudentsLevels() {
    //TODO: marcar como graduado a un estudiante
    // TODO: marcar cuando finaliza un nivel

    const {
        searchQuery,
        isComboOpen,
        modulesSelectedForUpsell,
        isLoadingStudents,
        isLoadingProgressTimeline,
        isLoadingPurchaseModules,
        canUserPurchaseModules,
        filteredStudents,
        studentTimelineInfo,
        studentLevels,
        availableModulesForUpsell,
        setIsComboOpen,
        handleSelectStudent,
        handleSearchStudent,
        handleAddModulesForUpsell,
        handleRemoveModulesForUpsell,
        handlePurchaseModules,
        cnFunction,
    } = useAdminStudentsLevels();

    return (
        <div className="grid gap-6 lg:grid-cols-3">
            {/* Student Search and List */}
            <SearchStudent
                searchQuery={searchQuery}
                isComboOpen={isComboOpen}
                filteredStudents={filteredStudents}
                isLoading={isLoadingStudents}
                handleSearchStudent={handleSearchStudent}
                handleSelectStudent={handleSelectStudent}
                setIsComboOpen={setIsComboOpen}
            />

            {/* Student Progress Timeline */}
            <StudentProgressTimeline
                studentTimelineInfo={studentTimelineInfo}
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
