import { Either, right } from "@/core/either";
import { Question } from "../../enterprise/entities/question";
import { QuestionsRepository } from "../repositories/questions-repository";

interface FetchRecentQuestionsUseCaseProps {
  page: number;
}

type FetchRecentQuestionsUseCaseResponse = Either<null, { questions: Question[] }>;

export class FetchRecentQuestionsUseCase {
  constructor(private questionRepository: QuestionsRepository) { }

  async execute({
    page
  }: FetchRecentQuestionsUseCaseProps): Promise<FetchRecentQuestionsUseCaseResponse> {
    const questions = await this.questionRepository.findManyRecent({ page });

    return right({
      questions: questions,
    });
  }
}
