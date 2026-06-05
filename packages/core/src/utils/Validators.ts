import { studentModuleStatus, type StudentModuleStatus } from "@salc/core/features/admin-desk/students-level/domain/interfaces/StudentLevels.interface";
import { certificateType, type CertificateType, studentContractStatus, type StudentContractStatus } from "@salc/core/features/admin-desk/students/domain/interfaces/Student.interface";
import type { UserState } from "@salc/core/features/shared/identity/domain/entities";
import { userState } from "@salc/core/features/shared/identity/domain/entities/UserAuthResponse.entity";
import type { UserRoles } from "@salc/core/interfaces";
import { userRoles } from "@salc/core/interfaces";

export const Validators = {
    isEmail: (email: string): boolean => {
        const emailRegularExpression = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return emailRegularExpression.test(email);
    },

    isStrongPassword: (password: string): boolean => {
        const isStrongPassword = password.length >= 6;

        return isStrongPassword
    },

    isRole: (role: string): boolean => {
        return Object.values(userRoles).includes(role as UserRoles);
    },

    IsUUID: (identifier: string): boolean => {
        const uuidRegex: RegExp = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

        return uuidRegex.test(identifier);
    },

    isIdentificationCard: (identificationCard: string): boolean => {
        const identificationCardRegex: RegExp = /^[0-9]{10}$/;
        return identificationCardRegex.test(identificationCard);
    },

    isPhoneNumber: (phoneNumber: string): boolean => {
        const phoneNumberRegex: RegExp = /^[0-9]{10}$/;
        return phoneNumberRegex.test(phoneNumber);
    },

    isStateUser: (state: string): boolean => {
        return Object.values(userState).includes(state as UserState);
    },

    isStudentContractStatus: (contractStatus: string): boolean => {
        return Object.values(studentContractStatus).includes(contractStatus as StudentContractStatus);
    },

    isStudentModuleStatus: (status: string): boolean => {
        return Object.values(studentModuleStatus).includes(status as StudentModuleStatus);
    },

    isBoolean: (value: any): boolean => {
        return typeof value === 'boolean';
    },

    isDate: (value: string | undefined | null): boolean => {
        if (value === undefined || value === null) return false;

        const parsedDate = new Date(value);

        return !isNaN(parsedDate.getTime());
    },

    isCertificateType: (certificate: string): boolean => {

        return Object.values(certificateType).includes(certificate as CertificateType);
    }

};