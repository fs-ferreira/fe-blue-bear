import { FND_EDU_URL } from "@/lib/utils";
import { Discipline } from "../entities/discipline/discipline";
import { BaseService } from "./base.service";

export class DisciplineService extends BaseService<Discipline> {
    constructor(session: any) {
        super(FND_EDU_URL || "", "disciplines", "disciplina", session);
    }
}
