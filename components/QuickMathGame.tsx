import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Progress } from './ui/progress';
import { CheckCircle, XCircle, Clock } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { Language, t } from '../utils/translations';
import { DifficultyLevel, getRandomQuestion, Question } from '../utils/questions';

interface QuickMathGameProps {
  difficulty: DifficultyLevel;
  language: Language;
  onBack: () => void;
  onAddXP: (amount: number) => void;
  onAddCredits: (amount: number) => void;
  onIncrementStreak: () => void;
  onResetStreak: () => void;
  onIncrementGamesPlayed: () => void;
  onIncrementCorrectAnswers: () => void;
  onUnlockAchievement: (id: string) => void;
}

export function QuickMathGame({
  difficulty,
  language,
  onBack,
  onAddXP,
  onAddCredits,
  onIncrementStreak,
  onResetStreak,
  onIncrementGamesPlayed,
  onIncrementCorrectAnswers,
  onUnlockAchievement
}: QuickMathGameProps) {
  const [question, setQuestion] = useState<Question | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameActive, setGameActive] = useState(false);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);

  const startGame = () => {
    setGameActive(true);
    setScore(0);
    setQuestionsAnswered(0);
    setTimeLeft(60);
    setQuestion(getRandomQuestion(difficulty, 'quickmath'));
    setUserAnswer('');
    setFeedback(null);
  };

  const endGame = () => {
    setGameActive(false);
    onIncrementGamesPlayed();
    
    const xpEarned = score * 15;
    const creditsEarned = score * 2;
    onAddXP(xpEarned);
    onAddCredits(creditsEarned);
    
    toast.success(t('gameOver', language), {
      description: t('earnedXP', language, { xp: xpEarned }) + ' ' + t('earnedCredits', language, { credits: creditsEarned })
    });

    if (score >= 10) {
      onUnlockAchievement('speed_demon');
    }
  };

  useEffect(() => {
    if (gameActive && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (gameActive && timeLeft === 0) {
      endGame();
    }
  }, [timeLeft, gameActive]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!question || !userAnswer) return;

    const correctAnswer = typeof question.answer === 'number' ? question.answer : parseFloat(question.answer);
    const userAnswerNum = parseFloat(userAnswer);
    const isCorrect = Math.abs(userAnswerNum - correctAnswer) < 0.01;

    if (isCorrect) {
      setScore(score + 1);
      setFeedback('correct');
      onIncrementStreak();
      onIncrementCorrectAnswers();
      onAddXP(15);
      toast.success('+15 XP', { duration: 1000 });
    } else {
      setFeedback('incorrect');
      onResetStreak();
      toast.error(t('incorrect', language), { duration: 1000 });
    }

    setQuestionsAnswered(questionsAnswered + 1);

    setTimeout(() => {
      setQuestion(getRandomQuestion(difficulty, 'quickmath'));
      setUserAnswer('');
      setFeedback(null);
    }, 800);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="bg-white/90 backdrop-blur border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{t('quickMath', language)}</span>
            {gameActive && (
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-orange-500" />
                <span className="text-2xl">{timeLeft}s</span>
              </div>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!gameActive ? (
            <div className="text-center py-12">
              <h3 className="text-2xl mb-4">{language === 'sv' ? 'Redo att testa din snabbhet?' : 'Ready to test your speed?'}</h3>
              <p className="text-slate-600 mb-8">
                {language === 'sv' 
                  ? 'Svara på så många frågor som möjligt på 60 sekunder!' 
                  : 'Answer as many questions as you can in 60 seconds!'}
              </p>
              <Button
                onClick={startGame}
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white"
              >
                {t('start', language)}
              </Button>
            </div>
          ) : (
            <div>
              <div className="mb-6">
                <div className="flex justify-between mb-2 text-sm">
                  <span>{t('score', language)}: {score}</span>
                  <span>{t('questions', language)}: {questionsAnswered}</span>
                </div>
                <Progress value={(timeLeft / 60) * 100} className="h-2" />
              </div>

              {question && (
                <div className="text-center py-8">
                  <div className="text-5xl mb-2 font-mono">
                    {question.question}
                  </div>
                  <div className="text-sm text-slate-500 mb-8">{question.topic}</div>

                  <form onSubmit={handleSubmit} className="max-w-xs mx-auto">
                    <div className="flex gap-4">
                      <Input
                        type="text"
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        placeholder={t('yourAnswer', language)}
                        className="text-2xl text-center"
                        autoFocus
                      />
                      <Button type="submit" size="lg">
                        {t('submit', language)}
                      </Button>
                    </div>
                  </form>

                  {feedback && (
                    <div className="mt-8">
                      {feedback === 'correct' ? (
                        <div className="flex items-center justify-center gap-2 text-green-600">
                          <CheckCircle className="h-8 w-8" />
                          <span className="text-2xl">{t('correct', language)}</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-2 text-red-600">
                          <XCircle className="h-8 w-8" />
                          <span className="text-2xl">{t('incorrect', language)}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
