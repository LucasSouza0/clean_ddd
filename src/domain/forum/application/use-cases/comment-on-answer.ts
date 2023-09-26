import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { AnswerRepository } from '../repositories/answers-repository';
import { AnswerComment } from '../../enterprise/entities/answer-comment';
import { AnswerCommentsRepository } from '../repositories/answer-comments-repository';

interface CommentOnAnswerUseCaseProps {
  authorId: string;
  answerId: string;
  content: string;
}

interface CommentOnAnswerUseCaseResponse {
  answerComment: AnswerComment;
}

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
      throw new Error('Answer not found.');
    }

    const answerComment = AnswerComment.create({
      authorId: new UniqueEntityId(authorId),
      answerId: new UniqueEntityId(answerId),
      content: content,
    });

    await this.answerCommentsRepository.create(answerComment);

    return {
      answerComment: answerComment,
    }
  }
}
