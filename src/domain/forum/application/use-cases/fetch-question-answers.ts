import { Either, right } from "@/core/either";
import { Answer } from "../../enterprise/entities/answer";
import { AnswerRepository } from "../repositories/answers-repository";

interface FetchQuestionAnswersUseCaseProps {
  questionId: string;
  page: number;
}

type FetchQuestionAnswersUseCaseResponse = Either<null, { answer: Answer[] }>;

export class FetchQuestionAnswersUseCase {
  constructor(private answerRepository: AnswerRepository) { }

  async execute({
    questionId,
    page
  }: FetchQuestionAnswersUseCaseProps): Promise<FetchQuestionAnswersUseCaseResponse> {
    const answers = await this.answerRepository.findManyByQuestionId(
      questionId,
      { page }
    );

    return right({
      answer: answers,
    });
  }
}
