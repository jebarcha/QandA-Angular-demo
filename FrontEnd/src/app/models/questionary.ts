import { Question } from './question';

export class Questionary {
    id?: number;
    name: string;
    description: string;
    create?: Date;
    listQuestions: Question[];

    constructor(name: string, description: string, create: Date, listQuestions: Question[]) {
        this.name = name;
        this.description = description;
        this.create = create;
        this.listQuestions = listQuestions;
    }
}