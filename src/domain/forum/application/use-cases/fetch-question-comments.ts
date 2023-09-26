import { Either, right } from "@/core/either";
import { QuestionComment } from "../../enterprise/entities/question-comment";
import { QuestionCommentsRepository } from "../repositories/question-comments-repository";

interface FetchQuestionCommentsUseCaseProps {
  questionId: string;
  page: number;
}

type FetchQuestionCommentsUseCaseResponse = Either<null, { questionComments: QuestionComment[] }>;

export class FetchQuestionCommentsUseCase {
  constructor(private questionCommentRepository: QuestionCommentsRepository) { }

  async execute({
    questionId,
    page
  }: FetchQuestionCommentsUseCaseProps): Promise<FetchQuestionCommentsUseCaseResponse> {
    const questionComments = await this.questionCommentRepository.findManyByQuestionId(
      questionId,
      { page }
    );

    return right({
      questionComments,
    });
  }
}
