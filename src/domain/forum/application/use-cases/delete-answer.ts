import { Either, left, right } from '@/core/either';
import { AnswerRepository } from '../repositories/answers-repository';
import { ResourceNotFoundError } from './errors/resource-not-found-error';
import { NotAllowedError } from './errors/not-allowed-error';

interface DeleteAnswerUseCaseProps {
  authorId: string;
  answerId: string;
}

type DeleteAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {}
>;

export class DeleteAnswerUseCase {
  constructor(private answerRepository: AnswerRepository) { }

  async execute({
    authorId,
    answerId
  }: DeleteAnswerUseCaseProps): Promise<DeleteAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId);

    if (!answer) {
      return left(new ResourceNotFoundError());
    }

    if (authorId !== answer.authorId.toString()) {
      return left(new NotAllowedError());
    }

    await this.answerRepository.delete(answer);

    return right({});
  }
}
