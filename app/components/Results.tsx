'use client';

import { useState } from 'react';
import { PersonalityType, personalities } from '../quizData';

interface ResultData {
  type: PersonalityType;
  percentage: number;
}

interface ResultsProps {
  nickname: string;
  answers: PersonalityType[];
  onRestart: () => void;
}

export default function Results({ nickname, answers, onRestart }: ResultsProps) {
  const [email, setEmail] = useState('');
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [couponReceived, setCouponReceived] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculate personality percentages
  const results = calculateResults(answers);
  const primaryResult = results[0];
  const otherResults = results.slice(1);

  const handleCouponSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    if (!marketingConsent) {
      setValidationError('마케팅 수신 동의가 필요합니다');
      return;
    }

    if (!email.trim()) {
      setValidationError('연락처를 입력해주세요');
      return;
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setValidationError('올바른 이메일 형식을 입력해주세요');
      return;
    }

    // Send to Google Sheets
    setIsSubmitting(true);
    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbwL1FH1uFKQTAGvjN4Y9gLby8Td6zmBudQEC-jgDZ7qBk2U_ZXrxHmXPuOWVLMV-Oq_/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nickname: nickname,
          email: email,
          personalityType: personalities[primaryResult.type].name,
          percentage: primaryResult.percentage + '%'
        })
      });

      // no-cors mode doesn't allow reading response, so we assume success
      setCouponReceived(true);
    } catch (error) {
      console.error('Error submitting coupon:', error);
      setValidationError('전송 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
          {nickname}님의 커피 성격은...
        </h1>

        <div className="bg-white p-8 rounded-lg shadow-sm border-2 border-[#e3d5ca] mb-6">
          <p className="text-sm text-[#9d7c5f] font-medium mb-2">주요 타입</p>
          <h2 className="text-2xl md:text-3xl font-bold text-[#6b4423] mb-3">
            {personalities[primaryResult.type].name} ({primaryResult.percentage}%)
          </h2>
          <p className="text-lg text-gray-700 mb-2">
            추천 커피: <span className="font-semibold">{personalities[primaryResult.type].coffee}</span>
          </p>
          <p className="text-base text-gray-600 italic">
            "{personalities[primaryResult.type].tagline}"
          </p>
        </div>

        {otherResults.length > 0 && (
          <div className="text-left mb-12">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">당신의 다른 면모들:</h3>
            <ul className="space-y-2">
              {otherResults.map((result) => (
                <li key={result.type} className="text-gray-700">
                  • {result.percentage}% {personalities[result.type].name} → {personalities[result.type].coffee}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="bg-gradient-to-br from-[#f5f0eb] to-[#e3d5ca] p-8 rounded-lg mb-8">
        <h3 className="text-2xl font-bold text-[#6b4423] mb-2 text-center">
          ✨ 추천 커피 주문 시 10% 할인!
        </h3>
        <p className="text-center text-gray-700 mb-6">
          지금 쿠폰을 받고 {personalities[primaryResult.type].coffee}를 특별 가격으로 즐기세요
        </p>

        {!couponReceived ? (
          <form onSubmit={handleCouponSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="이메일 주소를 입력해주세요"
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-[#9d7c5f] focus:outline-none focus:ring-2 focus:ring-[#9d7c5f] focus:ring-offset-2"
              />
            </div>

            <div className="flex items-start">
              <input
                type="checkbox"
                id="marketing"
                checked={marketingConsent}
                onChange={(e) => setMarketingConsent(e.target.checked)}
                className="mt-1 mr-3 h-4 w-4 text-[#9d7c5f] border-gray-300 rounded focus:ring-[#9d7c5f]"
              />
              <label htmlFor="marketing" className="text-sm text-gray-700">
                마케팅 정보 수신에 동의합니다 (필수)
              </label>
            </div>

            {validationError && (
              <p className="text-red-600 text-sm">{validationError}</p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-[#6b4423] text-white font-semibold rounded-lg hover:bg-[#5a3a1e] disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#9d7c5f] focus:ring-offset-2"
            >
              {isSubmitting ? '전송 중...' : '쿠폰 받기'}
            </button>
          </form>
        ) : (
          <div className="text-center py-6">
            <p className="text-xl font-semibold text-[#6b4423] mb-2">
              🎉 쿠폰이 발송되었습니다!
            </p>
            <p className="text-gray-700">
              {email}로 10% 할인 쿠폰을 보내드렸어요
            </p>
          </div>
        )}
      </div>

      <button
        onClick={onRestart}
        className="w-full py-3 bg-white border-2 border-gray-300 text-gray-800 font-medium rounded-lg hover:bg-[#e3d5ca] hover:border-[#d4c4b8] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#9d7c5f] focus:ring-offset-2"
      >
        다시 시작하기
      </button>
    </div>
  );
}

function calculateResults(answers: PersonalityType[]): ResultData[] {
  const counts: Partial<Record<PersonalityType, number>> = {};

  answers.forEach((answer) => {
    counts[answer] = (counts[answer] || 0) + 1;
  });

  const total = answers.length;
  const results: ResultData[] = Object.entries(counts).map(([type, count]) => ({
    type: type as PersonalityType,
    percentage: Math.round((count / total) * 100)
  }));

  // Sort by percentage (highest first)
  results.sort((a, b) => b.percentage - a.percentage);

  return results;
}
