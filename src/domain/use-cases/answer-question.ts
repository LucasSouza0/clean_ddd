import { Answer } from "../entities/answer";
import { AnswerRepository } from "../repositories/answer-repository";

interface AnswerQuestionUseCaseProps {
  instructorId: string;
  questionId: string;
  content: string;
}

export class AnswerQuestionUseCase {
  constructor(
    private answerRepository: AnswerRepository,
  ) {}
  
  async execute({ instructorId, questionId, content }: AnswerQuestionUseCaseProps) {
    const answer = new Answer({
      content: content,
      authorId: instructorId,
      questionId: questionId,
    });

    await this.answerRepository.create(answer);

    return answer;
  }
}
