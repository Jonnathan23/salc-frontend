export interface BaseStudentLevelFormValues {
    // Campos para compra de módulos
    studentId: string;
    sellerId: string;
    moduleIds: string[];
    
    // Campos para actualización de estado de contrato
    contractId: string;
    status: string; // En la UI manejado temporalmente como string
}
