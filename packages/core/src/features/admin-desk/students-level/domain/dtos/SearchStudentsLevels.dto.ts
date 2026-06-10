import { CustomError } from "@salc/core/enums";

export interface SearchStudentsLevelsDto {
    searchTerm: string;
    limit: number;
}

export class SearchStudentsLevelsDtoImpl implements SearchStudentsLevelsDto {
    private constructor(
        public readonly searchTerm: string,
        public readonly limit: number,
    ) {}

    static create(data: SearchStudentsLevelsDto): SearchStudentsLevelsDto {
        if (!data.searchTerm) {
            throw CustomError.badRequest("Search term is required");
        }

        if (data.limit <= 0) {
            throw CustomError.badRequest("Limit must be greater than 0");
        }

        return new SearchStudentsLevelsDtoImpl(data.searchTerm, data.limit);
    }
}
