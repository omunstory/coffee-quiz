'use client';

import { useState } from 'react';
import { questions, PersonalityType } from './quizData';
import Question from './components/Question';
import Results from './components/Results';

type Screen = 'start' | 'quiz' | 'results';

export default function Home() {
  const [screen, setScreen] = useState<Screen>('start');
  const [nickname, setNickname] = useState('');
  const [nicknameInput, setNicknameInput] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<PersonalityType[]>([]);

  const handleStart = () => {
    if (nicknameInput.trim().length === 0) {
      return;
    }
    setNickname(nicknameInput.trim());
    setScreen('quiz');
  };

  const handleAnswer = (personalityType: PersonalityType) => {
    const newAnswers = [...answers, personalityType];
    setAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setScreen('results');
    }
  };

  const handleRestart = () => {
    setScreen('start');
    setNickname('');
    setNicknameInput('');
    setCurrentQuestionIndex(0);
    setAnswers([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      {screen === 'start' && (
        <div className="w-full max-w-md mx-auto px-6 py-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            커피 성격 퀴즈
          </h1>
          <p className="text-lg text-gray-600 mb-12">
            간단한 질문으로 당신에게 딱 맞는 커피를 찾아보세요
          </p>

          <div className="mb-8">
            <input
              type="text"
              value={nicknameInput}
              onChange={(e) => setNicknameInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleStart();
                }
              }}
              placeholder="닉네임을 입력해주세요"
              className="w-full px-5 py-3 text-lg border-2 border-gray-300 rounded-lg focus:border-[#9d7c5f] focus:outline-none focus:ring-2 focus:ring-[#9d7c5f] focus:ring-offset-2"
            />
          </div>

          <button
            onClick={handleStart}
            disabled={nicknameInput.trim().length === 0}
            className="w-full py-4 text-lg font-semibold bg-[#6b4423] text-white rounded-lg hover:bg-[#5a3a1e] disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#9d7c5f] focus:ring-offset-2"
          >
            시작하기
          </button>
        </div>
      )}

      {screen === 'quiz' && (
        <Question
          question={questions[currentQuestionIndex]}
          currentIndex={currentQuestionIndex}
          totalQuestions={questions.length}
          onAnswer={handleAnswer}
        />
      )}

      {screen === 'results' && (
        <Results
          nickname={nickname}
          answers={answers}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}
