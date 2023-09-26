import { Either, left, right } from '@/core/either';
import { QuestionCommentsRepository } from '../repositories/question-comments-repository';
import { ResourceNotFoundError } from './errors/resource-not-found-error';
import { NotAllowedError } from './errors/not-allowed-error';

interface DeleteQuestionCommentUseCaseProps {
  authorId: string;
  questionCommentId: string;
}

type DeleteQuestionCommentUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {}
>;

export class DeleteQuestionCommentUseCase {
  constructor(
    private questionCommentsRepository: QuestionCommentsRepository,
  ) { }

  async execute({
    authorId,
    questionCommentId,
  }: DeleteQuestionCommentUseCaseProps): Promise<DeleteQuestionCommentUseCaseResponse> {
    const comment = await this.questionCommentsRepository.findById(questionCommentId);

    if (!comment) {
      return left(new ResourceNotFoundError());
    }

    if (comment.authorId.toString() !== authorId) {
      return left(new NotAllowedError());
    }

    await this.questionCommentsRepository.delete(comment);

    return right({});
  }
}
