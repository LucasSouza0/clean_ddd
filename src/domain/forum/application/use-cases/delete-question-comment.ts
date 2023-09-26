import { QuestionCommentsRepository } from '../repositories/question-comments-repository';

interface DeleteQuestionCommentUseCaseProps {
  authorId: string;
  questionCommentId: string;
}

interface DeleteQuestionCommentUseCaseResponse { }

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
      throw new Error('Question Comment not found.');
    }

    if (comment.authorId.toString() !== authorId) {
      throw new Error('Not allowed.');
    }

    await this.questionCommentsRepository.delete(comment);

    return {};
  }
}
