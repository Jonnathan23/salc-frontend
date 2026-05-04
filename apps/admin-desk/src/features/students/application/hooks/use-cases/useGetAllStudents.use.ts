import { useQuery } from "@tanstack/react-query"
import { getAllStudentsUseCase } from "@salc/core/features/admin-desk/students/di/StudentModule";


export const useGetAllStudents = () => {

    return useQuery({
        queryKey: ["students"],
        queryFn: () => getAllStudentsUseCase.execute()
    });
}