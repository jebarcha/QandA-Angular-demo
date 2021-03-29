import { AnswerQuestionaryDetail } from './answerQuestionaryDetail';

export class AnswerQuestionary {
    questionaryId: number;
    participant: string;
    //create: Date;
    listAnsQuestionaryDetail: AnswerQuestionaryDetail[];
}