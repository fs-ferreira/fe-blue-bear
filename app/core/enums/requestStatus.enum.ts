export enum RequestStatus {
    OPEN = 'OPEN',
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED',
    UNDER_REVIEW = 'UNDER_REVIEW',
    GRANTED = 'GRANTED',
    DISMISSED = 'DISMISSED',
}

export const requestStatusDisplayNames: { [key in RequestStatus]: string } = {
    [RequestStatus.OPEN]: 'Aberto',
    [RequestStatus.APPROVED]: 'Aprovado',
    [RequestStatus.REJECTED]: 'Rejeitado',
    [RequestStatus.UNDER_REVIEW]: 'Em revisão',
    [RequestStatus.GRANTED]: 'Deferido',
    [RequestStatus.DISMISSED]: 'Indeferido',
  };