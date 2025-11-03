import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { CheckCircle, XCircle, TrendingUp } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { Language, t } from '../utils/translations';
import { DifficultyLevel, getRandomQuestion, Question } from '../utils/questions';

interface CalculusGameProps {
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

export function CalculusGame({
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
}: CalculusGameProps) {
  const [question, setQuestion] = useState<Question | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const totalQuestions = 8;

  const startGame = () => {
    setGameActive(true);
    setScore(0);
    setQuestionsAnswered(0);
    setQuestion(getRandomQuestion(difficulty, 'calculus'));
    setUserAnswer('');
    setShowFeedback(false);
  };

  const endGame = () => {
    setGameActive(false);
    onIncrementGamesPlayed();
    
    const xpEarned = score * 30;
    const creditsEarned = score * 5;
    onAddXP(xpEarned);
    onAddCredits(creditsEarned);
    
    toast.success(t('gameComplete', language), {
      description: t('earnedXP', language, { xp: xpEarned }) + ' ' + t('earnedCredits', language, { credits: creditsEarned })
    });

    if (score === totalQuestions) {
      onUnlockAchievement('calculus_perfect');
    }
    if (score >= 6) {
      onUnlockAchievement('calculus_genius');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!question || !userAnswer || showFeedback) return;

    const correctAnswer = typeof question.answer === 'number' ? question.answer : parseFloat(question.answer);
    const userAnswerNum = parseFloat(userAnswer);
    const correct = Math.abs(userAnswerNum - correctAnswer) < 0.1;

    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      setScore(score + 1);
      onIncrementStreak();
      onIncrementCorrectAnswers();
      onAddXP(30);
      toast.success('+30 XP', { duration: 1000 });
    } else {
      onResetStreak();
    }

    setTimeout(() => {
      const newQuestionsAnswered = questionsAnswered + 1;
      setQuestionsAnswered(newQuestionsAnswered);

      if (newQuestionsAnswered >= totalQuestions) {
        endGame();
      } else {
        setQuestion(getRandomQuestion(difficulty, 'calculus'));
        setUserAnswer('');
        setShowFeedback(false);
      }
    }, 2000);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="bg-white/90 backdrop-blur border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{t('calculusGame', language)}</span>
            {gameActive && (
              <span className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-orange-500" />
                {questionsAnswered}/{totalQuestions}
              </span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!gameActive ? (
            <div className="text-center py-12">
              <h3 className="text-2xl mb-4">{language === 'sv' ? 'Lös analysproblem!' : 'Solve calculus problems!'}</h3>
              <p className="text-slate-600 mb-8">
                {language === 'sv' 
                  ? `Svara på ${totalQuestions} analysfrågor och tjäna upp till ${totalQuestions * 30} XP!` 
                  : `Answer ${totalQuestions} calculus questions and earn up to ${totalQuestions * 30} XP!`}
              </p>
              <Button
                onClick={startGame}
                size="lg"
                className="bg-gradient-to-r from-orange-600 to-red-600 text-white"
              >
                {t('start', language)}
              </Button>
            </div>
          ) : (
            <div>
              <div className="mb-6">
                <div className="flex justify-between mb-2 text-sm">
                  <span>{t('score', language)}: {score}/{questionsAnswered}</span>
                  <span>{language === 'sv' ? 'Framsteg' : 'Progress'}: {questionsAnswered}/{totalQuestions}</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-orange-600 to-red-600 h-2 rounded-full transition-all"
                    style={{ width: `${(questionsAnswered / totalQuestions) * 100}%` }}
                  />
                </div>
              </div>

              {question && (
                <div className="text-center py-8">
                  <div className="text-3xl mb-2 font-mono">
                    {question.question}
                  </div>
                  <div className="text-sm text-slate-500 mb-8">{question.topic}</div>

                  {!showFeedback ? (
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
                  ) : (
                    <div className="mt-8">
                      {isCorrect ? (
                        <div className="space-y-2">
                          <div className="flex items-center justify-center gap-2 text-green-600">
                            <CheckCircle className="h-8 w-8" />
                            <span className="text-2xl">{t('correct', language)}</span>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <div className="flex items-center justify-center gap-2 text-red-600">
                            <XCircle className="h-8 w-8" />
                            <span className="text-2xl">{t('incorrect', language)}</span>
                          </div>
                          <p className="text-slate-600">
                            {language === 'sv' ? 'Rätt svar var' : 'The answer was'}: {question.answer}
                          </p>
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
