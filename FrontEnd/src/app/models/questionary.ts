import { Question } from './question';

export class Questionary {
    id?: number;
    name: string;
    description: string;
    dateCreation?: Date;
    listQuestions: Question[];

    constructor(name: string, description: string, dateCreation: Date, listQuestions: Question[]) {
        this.name = name;
        this.description = description;
        this.dateCreation = dateCreation;
        this.listQuestions = listQuestions;
    }
}