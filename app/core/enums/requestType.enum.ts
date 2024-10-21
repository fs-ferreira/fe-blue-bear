export enum RequestType {
    GRADE_REVIEW = "GRADE_REVIEW",
    COURSE_CHANGE = "COURSE_CHANGE",
    ABSENCE_JUSTIFICATION = "ABSENCE_JUSTIFICATION",
    SCHOLARSHIP_REQUEST = "SCHOLARSHIP_REQUEST",
    DOCUMENT_REQUEST = "DOCUMENT_REQUEST",
    WITHDRAWAL_REQUEST = "WITHDRAWAL_REQUEST",
}

export const requestTypeDisplayNames: { [key in RequestType]: string } = {
    [RequestType.GRADE_REVIEW]: 'Revisão de nota',
    [RequestType.COURSE_CHANGE]: 'Mudança de curso',
    [RequestType.ABSENCE_JUSTIFICATION]: 'Justificar falta',
    [RequestType.SCHOLARSHIP_REQUEST]: 'Atestado de escolaridade',
    [RequestType.DOCUMENT_REQUEST]: 'Requisição de documento',
    [RequestType.WITHDRAWAL_REQUEST]: 'Cancelamento de matrícula',
};