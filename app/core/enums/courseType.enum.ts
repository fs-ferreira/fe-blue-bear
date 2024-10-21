export enum CourseType {
    BACHELOR = "BACHELOR",
    LICENTIATE = "LICENTIATE",
    TECHNOLOGIST = "TECHNOLOGIST"
}

export const courseTypeDisplayNames: { [key in CourseType]: string } = {
    [CourseType.BACHELOR]: 'Bacharelado',
    [CourseType.LICENTIATE]: 'Licenciatura',
    [CourseType.TECHNOLOGIST]: 'Tecnólogo',
  };