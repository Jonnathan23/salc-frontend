import { CustomError } from "@salc/core/enums";

export interface SearchStudentsDto {
    searchTerm: string;
    limit?: number;
}

export class SearchStudentsDtoImpl implements SearchStudentsDto {
    private constructor(
        public readonly searchTerm: string,
        public readonly limit?: number,
    ) {}

    static create(data: Record<string, any>): SearchStudentsDto {
        if (!data.searchTerm) {
            throw CustomError.badRequest("Search term is required");
        }

        if (typeof data.searchTerm !== "string" || data.searchTerm.length < 2) {
            throw CustomError.badRequest("Search term must be at least 2 characters long");
        }

        let limit = 10;

        if (data.limit !== undefined) {
            const parsedLimit = Number(data.limit);

            if (Number.isNaN(parsedLimit) || parsedLimit < 1 || parsedLimit > 50) {
                throw CustomError.badRequest("Limit must be a number between 1 and 50");
            }

            limit = parsedLimit;
        }

        return new SearchStudentsDtoImpl(data.searchTerm, limit);
    }
}
