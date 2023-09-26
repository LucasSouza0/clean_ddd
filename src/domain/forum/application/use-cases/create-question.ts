import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { Question } from '../../enterprise/entities/question';
import { QuestionsRepository } from '../repositories/questions-repository';
import { Either, right } from '@/core/either';

interface CreateQuestionUseCaseProps {
  authorId: string;
  title: string;
  content: string;
}

type CreateQuestionUseCaseResponse = Either<null, { question: Question }>;

export class CreateQuestionUseCase {
  constructor(private questionRepository: QuestionsRepository) { }

  async execute({
    authorId,
    content,
    title
  }: CreateQuestionUseCaseProps): Promise<CreateQuestionUseCaseResponse> {
    const question = Question.create({
      authorId: new UniqueEntityId(authorId),
      content,
      title
    });

    await this.questionRepository.create(question);

    return right({
      question: question,
    });
  }
}
