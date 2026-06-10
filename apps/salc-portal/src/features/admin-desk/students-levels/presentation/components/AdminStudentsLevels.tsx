import StudentProgressTimeline from "@/features/admin-desk/students-levels/presentation/components/students/StudentProgresTimeline";
import SearchStudent from "@/features/admin-desk/students-levels/presentation/components/students/SearchStudent";

import { useAdminStudentsLevels } from "@/features/admin-desk/students-levels/application/hooks/logic/useAdminStudentsLevels.use";

export default function AdminStudentsLevels() {
    //TODO: marcar como graduado a un estudiante
    // TODO: marcar cuando finaliza un nivel

    const {
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
        totalStudents,
        // handlers
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
                filteredStudents={filteredStudents}
                selectedStudent={selectedStudent}
                totalStudentLevels={totalStudents}
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
