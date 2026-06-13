import { BookOpen, Loader2, Search, Filter } from "lucide-react";

import { useSearchStudentsCriteriaState } from "@/features/admin-desk/students/application/hooks";
import StudentItem from "@/features/admin-desk/students/presentation/components/student-item/StudentItem";
import { Input } from "@/core/components/ui/Input";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/core/components/ui/Pagination";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/core/components/ui/Select";
import { Nationalities } from "@salc/core/enums/Nationality";
import {
    studentContractStatus,
    studentProgressCategory,
    certificateType,
    type CertificateType,
    type StudentContractStatus,
    type StudentProgressCategory,
} from "@salc/core/features/admin-desk/students/domain/interfaces";

export default function DirectoryStudents() {
    const { students, meta, isLoading, filters, handleUpdateFilter, handleSetPage } = useSearchStudentsCriteriaState();

    return (
        <div className="bg-card text-card-foreground rounded-xl border border-border/50 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-border/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-title" />
                    <h2 className="font-semibold text-title text-sm">Directorio de Estudiantes</h2>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Buscar por cédula, nombre, correo..."
                            className="pl-9 w-full sm:w-[350px]"
                            value={filters.searchTerm}
                            onChange={(e) => handleUpdateFilter({ key: "searchTerm", value: e.target.value })}
                        />
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 px-5 py-3 bg-muted/30 border-b border-border/50">
                {/* Nationality Filter */}
                <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-muted-foreground" />
                    <Select
                        value={filters.nationality || "all"}
                        onValueChange={(value) =>
                            handleUpdateFilter({ key: "nationality", value: value === "all" ? undefined : value })
                        }
                    >
                        <SelectTrigger className="w-[150px] bg-background text-xs">
                            <SelectValue placeholder="Nacionalidad" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="all">Cualquier nacionalidad</SelectItem>
                                {Nationalities.map((n) => (
                                    <SelectItem key={n.id} value={n.name}>
                                        {n.name}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                {/* Certificate Filter */}
                <div className="flex items-center gap-2">
                    <Select
                        value={filters.certificateType || "all"}
                        onValueChange={(value) =>
                            handleUpdateFilter({
                                key: "certificateType",
                                value: value === "all" ? undefined : (value as CertificateType),
                            })
                        }
                    >
                        <SelectTrigger className="w-[150px] bg-background text-xs">
                            <SelectValue placeholder="Certificado" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="all">Cualquier certificado</SelectItem>
                                <SelectItem value={certificateType.ONE_TONNE}>One Tonne</SelectItem>
                                <SelectItem value={certificateType.TOEFL}>TOEFL</SelectItem>
                                <SelectItem value={certificateType.OTHER}>Otro</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                {/* Contract Status Filter */}
                <div className="flex items-center gap-2">
                    <Select
                        value={filters.contractStatus || "all"}
                        onValueChange={(value) =>
                            handleUpdateFilter({
                                key: "contractStatus",
                                value: value === "all" ? undefined : (value as StudentContractStatus),
                            })
                        }
                    >
                        <SelectTrigger className="w-[150px] bg-background text-xs">
                            <SelectValue placeholder="Contrato" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="all">Cualquier contrato</SelectItem>
                                <SelectItem value={studentContractStatus.ACTIVE}>Activo</SelectItem>
                                <SelectItem value={studentContractStatus.FROZEN}>Congelado</SelectItem>
                                <SelectItem value={studentContractStatus.INACTIVE}>Inactivo</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                {/* Progress Category Filter */}
                <div className="flex items-center gap-2">
                    <Select
                        value={filters.progressCategory || "all"}
                        onValueChange={(value) =>
                            handleUpdateFilter({
                                key: "progressCategory",
                                value: value === "all" ? undefined : (value as StudentProgressCategory),
                            })
                        }
                    >
                        <SelectTrigger className="w-[150px] bg-background text-xs">
                            <SelectValue placeholder="Progreso" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="all">Cualquier progreso</SelectItem>
                                <SelectItem value={studentProgressCategory.FAST}>Rápido</SelectItem>
                                <SelectItem value={studentProgressCategory.MODERATE}>Moderado</SelectItem>
                                <SelectItem value={studentProgressCategory.SLOW}>Lento</SelectItem>
                                <SelectItem value={studentProgressCategory.NOT_ENOUGH_DATA}>Sin datos</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                {/* Is Graduated Filter */}
                <div className="flex items-center gap-2">
                    <Select
                        value={
                            filters.isGraduated !== undefined && filters.isGraduated !== "" ? String(filters.isGraduated) : "all"
                        }
                        onValueChange={(value) =>
                            handleUpdateFilter({ key: "isGraduated", value: value === "all" ? undefined : value === "true" })
                        }
                    >
                        <SelectTrigger className="w-[120px] bg-background text-xs">
                            <SelectValue placeholder="¿Graduado?" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="all">¿Graduado?</SelectItem>
                                <SelectItem value="true">Sí</SelectItem>
                                <SelectItem value="false">No</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                {/**TODO: cear botones para mover entre las paginas de las consultas */}
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-primary/20">
                            <th className="px-5 py-3 text-left text-xs font-semibold text-primary-foreground uppercase tracking-wide">
                                Estudiante
                            </th>
                            <th className="px-5 py-3 text-left text-xs font-semibold text-primary-foreground uppercase tracking-wide">
                                Cedula
                            </th>
                            <th className="px-5 py-3 text-left text-xs font-semibold text-primary-foreground uppercase tracking-wide">
                                Certificado
                            </th>
                            <th className="px-5 py-3 text-left text-xs font-semibold text-primary-foreground uppercase tracking-wide">
                                Contrato
                            </th>
                            <th className="px-5 py-3 text-left text-xs font-semibold text-primary-foreground uppercase tracking-wide">
                                Progreso
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border/30">
                        {isLoading ? (
                            <tr>
                                <td colSpan={5} className="py-20 text-center">
                                    <div className="flex flex-col items-center justify-center text-muted-foreground gap-2">
                                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                                        <span className="text-sm">Cargando estudiantes...</span>
                                    </div>
                                </td>
                            </tr>
                        ) : students.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="py-20 text-center">
                                    <span className="text-sm text-muted-foreground">
                                        No se encontraron estudiantes con los filtros aplicados.
                                    </span>
                                </td>
                            </tr>
                        ) : (
                            students.map((student) => <StudentItem key={student.id} student={student} />)
                        )}
                    </tbody>
                </table>

                {meta && meta.totalPages > 1 && (
                    <div className="py-4 border-t border-border/50">
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious
                                        onClick={() => handleSetPage(Math.max(1, meta.currentPage - 1))}
                                        className={meta.currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                    />
                                </PaginationItem>
                                {Array.from({ length: meta.totalPages }).map((_, index) => (
                                    <PaginationItem key={index + 1}>
                                        <PaginationLink
                                            onClick={() => handleSetPage(index + 1)}
                                            isActive={meta.currentPage === index + 1}
                                            className="cursor-pointer"
                                        >
                                            {index + 1}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))}
                                <PaginationItem>
                                    <PaginationNext
                                        onClick={() => handleSetPage(Math.min(meta.totalPages, meta.currentPage + 1))}
                                        className={
                                            meta.currentPage === meta.totalPages
                                                ? "pointer-events-none opacity-50"
                                                : "cursor-pointer"
                                        }
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                )}
            </div>
        </div>
    );
}
