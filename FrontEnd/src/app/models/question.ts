import { Answer } from "./answer";

export class Question {
    description: string;
    listAnswers: Answer[];
    hide?: boolean;

    constructor(description: string, listAnswers: Answer[]) {
        this.description = description;
        this.listAnswers = listAnswers;
        this.hide = true;
    }
}