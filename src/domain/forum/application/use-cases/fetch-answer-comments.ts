import { Either, right } from "@/core/either";
import { AnswerComment } from "../../enterprise/entities/answer-comment";
import { AnswerCommentsRepository } from "../repositories/answer-comments-repository";

interface FetchAnswerCommentsUseCaseProps {
  answerId: string;
  page: number;
}

type FetchAnswerCommentsUseCaseResponse = Either<null, { answerComments: AnswerComment[] }>;

export class FetchAnswerCommentsUseCase {
  constructor(private answerCommentRepository: AnswerCommentsRepository) { }

  async execute({
    answerId,
    page
  }: FetchAnswerCommentsUseCaseProps): Promise<FetchAnswerCommentsUseCaseResponse> {
    const answerComments = await this.answerCommentRepository.findManyByAnswerId(
      answerId,
      { page }
    );

    return right({
      answerComments,
    });
  }
}
