import { useRegisterStudent } from "@/features/students/application/hooks";
import type { RegisterStudentDto } from "@salc/core/features/admin-desk/students/domain/dtos";
import { useState } from "react";
import { useForm } from "react-hook-form";


export const useRegisterStudentForm = () => {

    const [submitSuccess, setSubmitSuccess] = useState(false);

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
        certificateType: '',
        startDate: new Date() //✒️
    }


    const { register, handleSubmit, control, formState: { errors }, reset } = useForm<RegisterStudentDto>({ defaultValues })

    const { mutate: registerStudentMutation, isPending: isSubmitting } = useRegisterStudent({ setSubmitSuccess, reset });

    const onSubmit = (data: RegisterStudentDto) => {
        console.log(data)
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
        minDate
    }


}