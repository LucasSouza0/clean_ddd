import { Either, left, right } from '@/core/either';
import { AnswerCommentsRepository } from '../repositories/answer-comments-repository';

interface DeleteAnswerCommentUseCaseProps {
  authorId: string;
  answerCommentId: string;
}

type DeleteAnswerCommentUseCaseResponse = Either<String, {}>

export class DeleteAnswerCommentUseCase {
  constructor(
    private answerCommentsRepository: AnswerCommentsRepository,
  ) { }

  async execute({
    authorId,
    answerCommentId,
  }: DeleteAnswerCommentUseCaseProps): Promise<DeleteAnswerCommentUseCaseResponse> {
    const comment = await this.answerCommentsRepository.findById(answerCommentId);

    if (!comment) {
      return left('Answer Comment not found.');
    }

    if (comment.authorId.toString() !== authorId) {
      return left('Not allowed.');
    }

    await this.answerCommentsRepository.delete(comment);

    return right({});
  }
}
