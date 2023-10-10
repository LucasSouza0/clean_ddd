import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { Either, left, right } from '@/core/either';
import { AnswerRepository } from '../repositories/answers-repository';
import { AnswerComment } from '../../enterprise/entities/answer-comment';
import { AnswerCommentsRepository } from '../repositories/answer-comments-repository';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error';

interface CommentOnAnswerUseCaseProps {
  authorId: string;
  answerId: string;
  content: string;
}

type CommentOnAnswerUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    answerComment: AnswerComment;
  }
>;

export class CommentOnAnswerUseCase {
  constructor(
    private answerRepository: AnswerRepository,
    private answerCommentsRepository: AnswerCommentsRepository,
  ) { }

  async execute({
    authorId,
    answerId,
    content,
  }: CommentOnAnswerUseCaseProps): Promise<CommentOnAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId);

    if (!answer) {
      return left(new ResourceNotFoundError());
    }

    const answerComment = AnswerComment.create({
      authorId: new UniqueEntityId(authorId),
      answerId: new UniqueEntityId(answerId),
      content: content,
    });

    await this.answerCommentsRepository.create(answerComment);

    return right({
      answerComment: answerComment,
    });
  }
}
