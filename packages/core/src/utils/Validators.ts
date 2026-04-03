import { certificateType, CertificateType, studentContractStatus, StudentContractStatus } from "@salc/core/features/admin-desk/students/domain/interfaces/Student.interface";
import { UseState, useState } from "@salc/core/features/shared/indentiy/domain/entities";
import { UserRoles, userRoles } from "@salc/core/interfaces";

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
        return Object.values(useState).includes(state as UseState);
    },

    isStudentContractStatus: (contractStatus: string): boolean => {
        return Object.values(studentContractStatus).includes(contractStatus as StudentContractStatus);
    },

    isBoolean: (value: any): boolean => {
        return typeof value === 'boolean';
    },

    isDate: (date: string): boolean => {
        const dateRegex: RegExp = /^\d{4}-\d{2}-\d{2}$/;
        return dateRegex.test(date);
    },

    isCertificateType: (certificate: string): boolean => {
        
        return Object.values(certificateType).includes(certificate as CertificateType);
    }

};