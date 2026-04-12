import { useState } from "react"
import { PageHeader, RoleInfoCard, SuccessAlert } from "@/features/indentity/presentation/components/register-update/StateForm";
import { RegisterUserForm } from "@/features/indentity/presentation/components/register-update/RegisterUserForm";

export default function RegisterPage() {
    const [selectedRole, setSelectedRole] = useState<string>('TEACHER');
    const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false);

    const handleSuccess = () => {
        setShowSuccessAlert(true);
        setTimeout(() => setShowSuccessAlert(false), 3000);
    };

    return (
        <div className="space-y-6">
            <PageHeader />

            {showSuccessAlert && <SuccessAlert />}

            <div className="grid gap-6 lg:grid-cols-3">

                <RegisterUserForm
                    onRoleChange={(role) => setSelectedRole(role)}
                    onSuccess={handleSuccess}
                />

                <RoleInfoCard selectedRole={selectedRole} />
            </div>
        </div>
    );
}