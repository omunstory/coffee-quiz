export type PersonalityType = 'cozyClassic' | 'healthNut' | 'indulgentTreat';

export interface Personality {
  id: PersonalityType;
  name: string;
  coffee: string;
  tagline: string;
  description: string;
}

export interface Answer {
  text: string;
  personality: PersonalityType;
}

export interface Question {
  id: number;
  question: string;
  answers: Answer[];
}

export const personalities: Record<PersonalityType, Personality> = {
  cozyClassic: {
    id: 'cozyClassic',
    name: 'Cozy Classic',
    coffee: 'Medium Roast Drip',
    tagline: '모든 잔에 편안함을',
    description: '편안함, 안정감, 클래식한 취향'
  },
  healthNut: {
    id: 'healthNut',
    name: 'Health Nut',
    coffee: 'Oat Milk Americano',
    tagline: '모든 한 모금에 웰니스를',
    description: '건강 지향, 활동적, 균형 추구'
  },
  indulgentTreat: {
    id: 'indulgentTreat',
    name: 'Indulgent Treat',
    coffee: 'Mocha with Whip',
    tagline: '커피는 디저트다',
    description: '즐거움 추구, 달콤함 선호, 삶을 즐김'
  }
};

export const questions: Question[] = [
  {
    id: 1,
    question: '주말 아침, 당신의 이상적인 시작은?',
    answers: [
      { text: '일찍 일어나서 조용히 책 읽기', personality: 'cozyClassic' },
      { text: '상쾌한 아침 운동으로 하루 시작', personality: 'healthNut' },
      { text: '늦잠 자고 브런치 즐기기', personality: 'indulgentTreat' }
    ]
  },
  {
    id: 2,
    question: '여행을 간다면 어떤 스타일을 선호하나요?',
    answers: [
      { text: '편안한 리조트에서 휴식', personality: 'cozyClassic' },
      { text: '하이킹이나 요가 리트릿', personality: 'healthNut' },
      { text: '미식 투어와 파인 다이닝', personality: 'indulgentTreat' }
    ]
  },
  {
    id: 3,
    question: '스트레스를 풀 때 당신의 방법은?',
    answers: [
      { text: '따뜻한 차 한 잔과 좋아하는 드라마', personality: 'cozyClassic' },
      { text: '명상이나 조깅으로 마음 정리', personality: 'healthNut' },
      { text: '맛있는 디저트와 와인', personality: 'indulgentTreat' }
    ]
  },
  {
    id: 4,
    question: '친구들이 당신을 뭐라고 설명할까요?',
    answers: [
      { text: '믿음직하고 편안한 사람', personality: 'cozyClassic' },
      { text: '에너지 넘치고 활동적인 사람', personality: 'healthNut' },
      { text: '삶을 즐길 줄 아는 사람', personality: 'indulgentTreat' }
    ]
  },
  {
    id: 5,
    question: '저녁 식사 후 당신의 선택은?',
    answers: [
      { text: '집에서 편하게 영화 보기', personality: 'cozyClassic' },
      { text: '산책하며 소화시키기', personality: 'healthNut' },
      { text: '디저트 카페에서 달콤한 마무리', personality: 'indulgentTreat' }
    ]
  }
];
