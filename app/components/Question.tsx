import { Question as QuestionType } from '../quizData';

interface QuestionProps {
  question: QuestionType;
  currentIndex: number;
  totalQuestions: number;
  onAnswer: (personalityType: string) => void;
}

export default function Question({ question, currentIndex, totalQuestions, onAnswer }: QuestionProps) {
  return (
    <div className="w-full max-w-2xl mx-auto px-6 py-12">
      <div className="mb-8">
        <p className="text-sm text-gray-500 mb-2">
          {currentIndex + 1} / {totalQuestions}
        </p>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#9d7c5f] transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-8 leading-relaxed">
        {question.question}
      </h2>

      <div className="space-y-4">
        {question.answers.map((answer, index) => (
          <button
            key={index}
            onClick={() => onAnswer(answer.personality)}
            className="w-full p-5 text-left text-base md:text-lg bg-white border-2 border-gray-300 rounded-lg transition-all duration-200 hover:bg-[#e3d5ca] hover:border-[#d4c4b8] active:bg-[#d4c4b8] focus:outline-none focus:ring-2 focus:ring-[#9d7c5f] focus:ring-offset-2"
          >
            {answer.text}
          </button>
        ))}
      </div>
    </div>
  );
}
