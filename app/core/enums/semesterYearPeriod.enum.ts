export enum SemesterYearPeriod {
    FIRST = "FIRST",
    SECOND = "SECOND",
}

export const semesterYearPeriodDisplayNames: { [key in SemesterYearPeriod]: string } = {
    [SemesterYearPeriod.FIRST]: '1º - Fevereiro a Junho',
    [SemesterYearPeriod.SECOND]: '2º - Agosto a Dezembro',
};

export const semesterYearPeriodSummaryDisplayNames: { [key in SemesterYearPeriod]: string } = {
    [SemesterYearPeriod.FIRST]: '1º período',
    [SemesterYearPeriod.SECOND]: '2º período',
};