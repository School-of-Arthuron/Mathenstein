// Swedish high school mathematics curriculum questions
// Based on Matematik 5000+ series (A-C level) and university level

export type DifficultyLevel = 'ma1' | 'ma2' | 'ma3' | 'ma4' | 'ma5' | 'university';
export type QuestionType = 'quickmath' | 'algebra' | 'geometry' | 'calculus' | 'statistics';

export interface Question {
  question: string;
  answer: number | string;
  options?: (number | string)[];
  type: QuestionType;
  difficulty: DifficultyLevel;
  topic: string;
}

// Matematik 1 (Kurs A) - Grundläggande aritmetik, algebra, geometri
export const ma1Questions: Question[] = [
  {
    question: 'Beräkna: 15 + 28',
    answer: 43,
    type: 'quickmath',
    difficulty: 'ma1',
    topic: 'Aritmetik'
  },
  {
    question: 'Lös ekvationen: x + 7 = 15',
    answer: 8,
    type: 'algebra',
    difficulty: 'ma1',
    topic: 'Ekvationer'
  },
  {
    question: 'Beräkna arean av en rektangel med sidor 5 cm och 8 cm',
    answer: 40,
    type: 'geometry',
    difficulty: 'ma1',
    topic: 'Area'
  },
  {
    question: 'Vad är 20% av 150?',
    answer: 30,
    type: 'quickmath',
    difficulty: 'ma1',
    topic: 'Procent'
  },
];

// Matematik 2 (Kurs B) - Funktioner, andragradsekvationer, geometri
export const ma2Questions: Question[] = [
  {
    question: 'Lös ekvationen: x² - 5x + 6 = 0. Ge det minsta värdet.',
    answer: 2,
    type: 'algebra',
    difficulty: 'ma2',
    topic: 'Andragradsekvationer'
  },
  {
    question: 'Om f(x) = 2x + 3, vad är f(5)?',
    answer: 13,
    type: 'algebra',
    difficulty: 'ma2',
    topic: 'Funktioner'
  },
  {
    question: 'Beräkna volymen av en cylinder med radie 3 cm och höjd 10 cm. Avrunda till närmaste heltal. (π ≈ 3.14)',
    answer: 283,
    type: 'geometry',
    difficulty: 'ma2',
    topic: 'Volym'
  },
  {
    question: 'Förenkla: 3x + 5x - 2x. Ange koefficienten.',
    answer: 6,
    type: 'algebra',
    difficulty: 'ma2',
    topic: 'Förenkling'
  },
];

// Matematik 3 (Kurs C) - Trigonometri, exponentialfunktioner, derivata
export const ma3Questions: Question[] = [
  {
    question: 'Vad är sin(90°)?',
    answer: 1,
    type: 'algebra',
    difficulty: 'ma3',
    topic: 'Trigonometri'
  },
  {
    question: 'Lös ekvationen: 2^x = 8. Vad är x?',
    answer: 3,
    type: 'algebra',
    difficulty: 'ma3',
    topic: 'Exponentialfunktioner'
  },
  {
    question: 'Derivera f(x) = x². Vad är f\'(3)?',
    answer: 6,
    type: 'calculus',
    difficulty: 'ma3',
    topic: 'Derivata'
  },
  {
    question: 'Om log₁₀(x) = 2, vad är x?',
    answer: 100,
    type: 'algebra',
    difficulty: 'ma3',
    topic: 'Logaritmer'
  },
];

// Matematik 4 - Avancerad analys och sannolikhet
export const ma4Questions: Question[] = [
  {
    question: 'Beräkna integralen: ∫x dx från 0 till 2',
    answer: 2,
    type: 'calculus',
    difficulty: 'ma4',
    topic: 'Integraler'
  },
  {
    question: 'Om en tärning kastas två gånger, vad är sannolikheten att få summan 7? Ge svaret som decimal (avrunda till 2 decimaler).',
    answer: 0.17,
    type: 'statistics',
    difficulty: 'ma4',
    topic: 'Sannolikhet'
  },
  {
    question: 'Derivera f(x) = e^x vid x = 0',
    answer: 1,
    type: 'calculus',
    difficulty: 'ma4',
    topic: 'Exponentialderivata'
  },
  {
    question: 'Lös differentialekvationen: dy/dx = 2x. Om y(0) = 0, vad är y(1)?',
    answer: 1,
    type: 'calculus',
    difficulty: 'ma4',
    topic: 'Differentialekvationer'
  },
];

// Matematik 5 - Linjär algebra och vektoranalys
export const ma5Questions: Question[] = [
  {
    question: 'Beräkna skalärprodukten av vektorerna (2,3) och (4,1)',
    answer: 11,
    type: 'algebra',
    difficulty: 'ma5',
    topic: 'Vektorer'
  },
  {
    question: 'Beräkna determinanten av matrisen [[2, 1], [4, 3]]',
    answer: 2,
    type: 'algebra',
    difficulty: 'ma5',
    topic: 'Matriser'
  },
  {
    question: 'Om v = (3, 4), vad är |v| (längden av vektorn)?',
    answer: 5,
    type: 'algebra',
    difficulty: 'ma5',
    topic: 'Vektorlängd'
  },
];

// University level - Advanced calculus and analysis
export const universityQuestions: Question[] = [
  {
    question: 'Beräkna lim(x→0) (sin(x)/x)',
    answer: 1,
    type: 'calculus',
    difficulty: 'university',
    topic: 'Gränsvärden'
  },
  {
    question: 'Beräkna ∫(1/x)dx från 1 till e. (Naturliga logaritmen)',
    answer: 1,
    type: 'calculus',
    difficulty: 'university',
    topic: 'Integraler'
  },
  {
    question: 'Taylor-expansion av e^x runt x=0, vad är koefficienten för x²? (Använd 1/n!)',
    answer: 0.5,
    type: 'calculus',
    difficulty: 'university',
    topic: 'Taylor-serier'
  },
];

export function getQuestionsByDifficulty(difficulty: DifficultyLevel): Question[] {
  switch (difficulty) {
    case 'ma1':
      return ma1Questions;
    case 'ma2':
      return ma2Questions;
    case 'ma3':
      return ma3Questions;
    case 'ma4':
      return ma4Questions;
    case 'ma5':
      return ma5Questions;
    case 'university':
      return universityQuestions;
    default:
      return ma1Questions;
  }
}

export function getRandomQuestion(difficulty: DifficultyLevel, type?: QuestionType): Question {
  const questions = getQuestionsByDifficulty(difficulty);
  const filteredQuestions = type 
    ? questions.filter(q => q.type === type)
    : questions;
  
  if (filteredQuestions.length === 0) {
    return questions[Math.floor(Math.random() * questions.length)];
  }
  
  return filteredQuestions[Math.floor(Math.random() * filteredQuestions.length)];
}

export function generateOptionsForQuestion(question: Question): (number | string)[] {
  const correctAnswer = typeof question.answer === 'number' ? question.answer : parseFloat(question.answer);
  const options = [correctAnswer];
  
  while (options.length < 4) {
    const offset = Math.floor(Math.random() * 20) - 10;
    const wrongAnswer = correctAnswer + offset;
    if (!options.includes(wrongAnswer) && wrongAnswer !== correctAnswer) {
      options.push(wrongAnswer);
    }
  }
  
  return options.sort(() => Math.random() - 0.5);
}
