import { FND_EDU_URL } from "@/lib/utils";
import { Discipline } from "../entities/disciplines/discipline";
import { BaseService } from "./baseService";

export class DisciplineService extends BaseService<Discipline> {
    constructor(session: any) {
        super(FND_EDU_URL || "", "disciplines", "disciplina", session);
    }
}
