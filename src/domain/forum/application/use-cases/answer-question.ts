import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Either, right } from '@/core/either'
import { Answer } from '../../enterprise/entities/answer'
import { AnswerRepository } from '../repositories/answers-repository'

interface AnswerQuestionUseCaseProps {
  instructorId: string
  questionId: string
  content: string
}

type AnswerQuestionUseCaseResponse = Either<null, { answer: Answer }>;

export class AnswerQuestionUseCase {
  constructor(private answerRepository: AnswerRepository) { }

  async execute({
    instructorId,
    questionId,
    content,
  }: AnswerQuestionUseCaseProps): Promise<AnswerQuestionUseCaseResponse> {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityId(instructorId),
      questionId: new UniqueEntityId(questionId),
    })

    await this.answerRepository.create(answer)

    return right({
      answer
    });
  }
}
