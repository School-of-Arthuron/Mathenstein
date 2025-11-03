// Swedish curriculum-based math questions (Matematik 5000 A-C and university level)

export type DifficultyLevel = 'A' | 'B' | 'C' | 'University';
export type QuestionType = 'algebra' | 'geometry' | 'calculus' | 'statistics' | 'quickmath';

export interface MathQuestion {
  question: string;
  questionEn: string;
  answer: number | string;
  options?: (number | string)[];
  type: QuestionType;
  level: DifficultyLevel;
  hint?: string;
  hintEn?: string;
}

// Level A - Grundläggande (Basic)
export const levelAQuestions: MathQuestion[] = [
  // Algebra A
  {
    question: 'Lös ekvationen: x + 7 = 15',
    questionEn: 'Solve the equation: x + 7 = 15',
    answer: 8,
    type: 'algebra',
    level: 'A',
    hint: 'Subtrahera 7 från båda sidor'
  },
  {
    question: 'Lös ekvationen: 3x = 21',
    questionEn: 'Solve the equation: 3x = 21',
    answer: 7,
    type: 'algebra',
    level: 'A',
    hint: 'Dela båda sidor med 3'
  },
  {
    question: 'Förenkla: 2x + 5x',
    questionEn: 'Simplify: 2x + 5x',
    answer: '7x',
    type: 'algebra',
    level: 'A'
  },
  {
    question: 'Lös ekvationen: x - 12 = 8',
    questionEn: 'Solve: x - 12 = 8',
    answer: 20,
    type: 'algebra',
    level: 'A'
  },
  // Geometry A
  {
    question: 'Beräkna arean av en rektangel med längd 8 cm och bredd 5 cm (i cm²)',
    questionEn: 'Calculate the area of a rectangle with length 8 cm and width 5 cm (in cm²)',
    answer: 40,
    type: 'geometry',
    level: 'A'
  },
  {
    question: 'En triangel har bas 10 cm och höjd 6 cm. Vad är arean? (i cm²)',
    questionEn: 'A triangle has base 10 cm and height 6 cm. What is the area? (in cm²)',
    answer: 30,
    type: 'geometry',
    level: 'A',
    hint: 'Area = (bas × höjd) / 2'
  },
  {
    question: 'Omkretsen av en kvadrat är 24 cm. Vad är sidan? (i cm)',
    questionEn: 'The perimeter of a square is 24 cm. What is the side? (in cm)',
    answer: 6,
    type: 'geometry',
    level: 'A'
  }
];

// Level B - Mellannivå (Intermediate)
export const levelBQuestions: MathQuestion[] = [
  // Algebra B
  {
    question: 'Lös ekvationen: 2x + 5 = 17',
    questionEn: 'Solve: 2x + 5 = 17',
    answer: 6,
    type: 'algebra',
    level: 'B'
  },
  {
    question: 'Lös ekvationen: 5(x - 3) = 20',
    questionEn: 'Solve: 5(x - 3) = 20',
    answer: 7,
    type: 'algebra',
    level: 'B'
  },
  {
    question: 'Förenkla: (x + 3)(x + 2). Vilket värde har koefficienten för x?',
    questionEn: 'Expand: (x + 3)(x + 2). What is the coefficient of x?',
    answer: 5,
    type: 'algebra',
    level: 'B',
    hint: 'x² + 5x + 6, koefficienten för x är 5'
  },
  {
    question: 'Lös ekvationen: x² - 9 = 0. Vad är den positiva lösningen?',
    questionEn: 'Solve: x² - 9 = 0. What is the positive solution?',
    answer: 3,
    type: 'algebra',
    level: 'B'
  },
  // Geometry B
  {
    question: 'Beräkna volymen av en kub med sidan 4 cm (i cm³)',
    questionEn: 'Calculate the volume of a cube with side 4 cm (in cm³)',
    answer: 64,
    type: 'geometry',
    level: 'B'
  },
  {
    question: 'En cirkel har radie 5 cm. Vad är arean? (Använd π ≈ 3.14, avrunda till heltal)',
    questionEn: 'A circle has radius 5 cm. What is the area? (Use π ≈ 3.14, round to integer)',
    answer: 79,
    type: 'geometry',
    level: 'B',
    hint: 'Area = πr²'
  },
  {
    question: 'Pythagoras: En rätvinklig triangel har kateterna 3 och 4. Vad är hypotenusan?',
    questionEn: 'Pythagoras: A right triangle has legs 3 and 4. What is the hypotenuse?',
    answer: 5,
    type: 'geometry',
    level: 'B'
  },
  // Statistics B
  {
    question: 'Beräkna medelvärdet av talen: 4, 8, 12, 16',
    questionEn: 'Calculate the mean of: 4, 8, 12, 16',
    answer: 10,
    type: 'statistics',
    level: 'B'
  }
];

// Level C - Avancerad (Advanced)
export const levelCQuestions: MathQuestion[] = [
  // Algebra C
  {
    question: 'Lös ekvationen: x² - 5x + 6 = 0. Vad är summan av lösningarna?',
    questionEn: 'Solve: x² - 5x + 6 = 0. What is the sum of the solutions?',
    answer: 5,
    type: 'algebra',
    level: 'C',
    hint: 'Lösningarna är x = 2 och x = 3'
  },
  {
    question: 'Lös ekvationen: 2^x = 16. Vad är x?',
    questionEn: 'Solve: 2^x = 16. What is x?',
    answer: 4,
    type: 'algebra',
    level: 'C'
  },
  {
    question: 'För funktionen f(x) = x² + 4x + 3, vad är x-koordinaten för symmetrilinjen?',
    questionEn: 'For the function f(x) = x² + 4x + 3, what is the x-coordinate of the line of symmetry?',
    answer: -2,
    type: 'algebra',
    level: 'C',
    hint: 'x = -b/(2a)'
  },
  {
    question: 'Lös ekvationen: log₂(x) = 5. Vad är x?',
    questionEn: 'Solve: log₂(x) = 5. What is x?',
    answer: 32,
    type: 'algebra',
    level: 'C'
  },
  // Geometry C
  {
    question: 'En kon har radie 3 cm och höjd 4 cm. Vad är volymen? (Använd π ≈ 3.14, avrunda till heltal)',
    questionEn: 'A cone has radius 3 cm and height 4 cm. What is the volume? (Use π ≈ 3.14, round to integer)',
    answer: 38,
    type: 'geometry',
    level: 'C',
    hint: 'V = (1/3)πr²h'
  },
  {
    question: 'En sfär har radie 3 cm. Vad är volymen? (Använd π ≈ 3.14, avrunda till heltal)',
    questionEn: 'A sphere has radius 3 cm. What is the volume? (Use π ≈ 3.14, round to integer)',
    answer: 113,
    type: 'geometry',
    level: 'C',
    hint: 'V = (4/3)πr³'
  },
  // Statistics C
  {
    question: 'Sannolikheten att få två sexor i rad med en tärning är 1/x. Vad är x?',
    questionEn: 'The probability of rolling two sixes in a row with a die is 1/x. What is x?',
    answer: 36,
    type: 'statistics',
    level: 'C',
    hint: '(1/6) × (1/6) = 1/36'
  }
];

// University Level
export const universityQuestions: MathQuestion[] = [
  // Calculus
  {
    question: 'Derivera f(x) = x³. Vad är f\'(2)?',
    questionEn: 'Differentiate f(x) = x³. What is f\'(2)?',
    answer: 12,
    type: 'calculus',
    level: 'University',
    hint: 'f\'(x) = 3x²'
  },
  {
    question: 'Derivera f(x) = 2x² + 3x. Vad är f\'(1)?',
    questionEn: 'Differentiate f(x) = 2x² + 3x. What is f\'(1)?',
    answer: 7,
    type: 'calculus',
    level: 'University',
    hint: 'f\'(x) = 4x + 3'
  },
  {
    question: 'Beräkna integralen av f(x) = x från 0 till 2. Vad är resultatet?',
    questionEn: 'Calculate the integral of f(x) = x from 0 to 2. What is the result?',
    answer: 2,
    type: 'calculus',
    level: 'University',
    hint: '∫x dx = x²/2'
  },
  {
    question: 'Derivera f(x) = sin(x). Vad är f\'(0)?',
    questionEn: 'Differentiate f(x) = sin(x). What is f\'(0)?',
    answer: 1,
    type: 'calculus',
    level: 'University',
    hint: 'f\'(x) = cos(x), cos(0) = 1'
  },
  {
    question: 'Vad är gränsvärdet av (x² - 4)/(x - 2) när x går mot 2?',
    questionEn: 'What is the limit of (x² - 4)/(x - 2) as x approaches 2?',
    answer: 4,
    type: 'calculus',
    level: 'University',
    hint: 'Förkorta: (x-2)(x+2)/(x-2) = x+2'
  }
];

export function getQuestionsByLevel(level: DifficultyLevel): MathQuestion[] {
  switch (level) {
    case 'A':
      return levelAQuestions;
    case 'B':
      return levelBQuestions;
    case 'C':
      return levelCQuestions;
    case 'University':
      return universityQuestions;
    default:
      return levelAQuestions;
  }
}

export function getQuestionsByTypeAndLevel(type: QuestionType, level: DifficultyLevel): MathQuestion[] {
  const questions = getQuestionsByLevel(level);
  return questions.filter(q => q.type === type);
}

export function getRandomQuestion(level: DifficultyLevel, type?: QuestionType): MathQuestion {
  let questions = getQuestionsByLevel(level);
  if (type) {
    questions = questions.filter(q => q.type === type);
  }
  return questions[Math.floor(Math.random() * questions.length)];
}
