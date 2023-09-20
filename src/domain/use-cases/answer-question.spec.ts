import { AnswerQuestionUseCase } from './answer-question'
import { AnswerRepository } from '../repositories/answer-repository'
import { Answer } from '../entities/answer'

const fakeAnswerRepository: AnswerRepository = {
  // eslint-disable-next-line
  create: async (answer: Answer) => { },
}

test('create an answer', async () => {
  const answerQuestion = new AnswerQuestionUseCase(fakeAnswerRepository)

  const answer = await answerQuestion.execute({
    content: 'Nova Resposta',
    instructorId: '1',
    questionId: '1',
  })

  expect(answer.content).toEqual('Nova Resposta')
})
