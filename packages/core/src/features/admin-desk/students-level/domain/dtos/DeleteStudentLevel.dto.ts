import { CustomError } from "@salc/core/enums";
import { Validators } from "@salc/core/utils";

export interface DeleteStudentLevelDto {
    studentLevelId: string;
}

export class DeleteStudentLevelDtoImpl implements DeleteStudentLevelDto {
    private constructor(public readonly studentLevelId: string) {}

    static create(data: DeleteStudentLevelDto): DeleteStudentLevelDto {
        const { studentLevelId } = data;

        if (!studentLevelId) throw CustomError.badRequest("Missing studentLevelId");
        if (!Validators.IsUUID(studentLevelId)) throw CustomError.badRequest("Invalid studentLevelId");

        return new DeleteStudentLevelDtoImpl(studentLevelId);
    }
}
