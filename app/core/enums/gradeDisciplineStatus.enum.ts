export enum GradeDisciplineStatus {
    IN_PROGRESS = "IN_PROGRESS",
    FAILED = "FAILED",
    PASSED = "PASSED",

}

export const gradeStatusDisplayNames: { [key in GradeDisciplineStatus]: string } = {
    [GradeDisciplineStatus.IN_PROGRESS]: 'Em curso',
    [GradeDisciplineStatus.FAILED]: 'Reprovado',
    [GradeDisciplineStatus.PASSED]: 'Aprovado',
};