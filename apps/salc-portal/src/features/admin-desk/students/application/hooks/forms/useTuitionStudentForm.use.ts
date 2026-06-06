import { useForm } from "react-hook-Form";
import { useState } from "react";

import {
    certificateType,
    type CertificateType,
} from "@salc/core/features/admin-desk/students/domain/interfaces/Student.interface";
import type { BaseStudentFormValues } from "@/features/admin-desk/students/presentation/interfaces";
import { useRegisterStudent } from "@/features/admin-desk/students/application/hooks";

export const useRegisterStudentForm = () => {
    const certificates: CertificateType[] = [certificateType.ONE_TONNE, certificateType.TOEFL, certificateType.OTHER];

    const minStudentAge = 4;
    const minDate = new Date();

    minDate.setFullYear(minDate.getFullYear() - minStudentAge);
    const today = new Date();
    const maxAllowedDate = new Date(today.getFullYear() - minStudentAge, today.getMonth(), today.getDate());

    const [submitSuccess, setSubmitSuccess] = useState(false);

    const defaultValues: BaseStudentFormValues = {
        identificationCard: "",
        fullName: "",
        phoneNumber: "",
        email: "",
        dateOfBirth: minDate,
        nationality: "",
        certificateType: certificates[0],
        startDate: new Date(),
    };

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm<BaseStudentFormValues>({ defaultValues });

    const { mutate: registerStudentMutation, isPending: isSubmitting } = useRegisterStudent({ setSubmitSuccess, reset });

    const onSubmit = (data: BaseStudentFormValues) => {
        registerStudentMutation(data);
    };

    return {
        submitSuccess,
        errors,
        control,
        handleSubmit,
        registerStudentMutation,
        register,
        onSubmit,
        isSubmitting,
        maxAllowedDate,
        minDate,
        certificates,
    };
};
