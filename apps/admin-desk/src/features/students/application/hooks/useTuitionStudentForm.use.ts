import { useRegisterStudent } from "@/features/students/application/hooks";
import type { RegisterStudentDto } from "@salc/core/features/admin-desk/students/domain/dtos";
import { certificateType } from "@salc/core/features/admin-desk/students/domain/interfaces/Student.interface";
import { useState } from "react";
import { useForm } from "react-hook-form";


export const useRegisterStudentForm = () => {

    const [submitSuccess, setSubmitSuccess] = useState(false);

    const certificates = [certificateType.ONE_TONNE, certificateType.TOEFL, certificateType.OTHER];

    const minStudentAge = 4;
    const minDate = new Date();
    minDate.setFullYear(minDate.getFullYear() - minStudentAge);
    const today = new Date();
    const maxAllowedDate = new Date(
        today.getFullYear() - minStudentAge,
        today.getMonth(),
        today.getDate()
    );

    const defaultValues: RegisterStudentDto = {
        identificationCard: '', //✒️
        fullName: '', //✒️
        phoneNumber: '', //✒️
        email: '', //✒️
        dateOfBirth: minDate, //✒️
        nationality: '', //✒️
        certificateType: certificates[0],
        startDate: new Date() //✒️
    }


    const { register, handleSubmit, control, formState: { errors }, reset } = useForm<RegisterStudentDto>({ defaultValues })

    const { mutate: registerStudentMutation, isPending: isSubmitting } = useRegisterStudent({ setSubmitSuccess, reset });

    const onSubmit = (data: RegisterStudentDto) => {
        registerStudentMutation(data);
    }




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
        certificates
    }


}