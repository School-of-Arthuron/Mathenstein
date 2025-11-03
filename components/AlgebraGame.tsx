import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { CheckCircle, XCircle, Variable } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { Language, t } from '../utils/translations';
import { DifficultyLevel, getRandomQuestion, Question } from '../utils/questions';

interface AlgebraGameProps {
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

export function AlgebraGame({
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
}: AlgebraGameProps) {
  const [question, setQuestion] = useState<Question | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const totalQuestions = 10;

  const startGame = () => {
    setGameActive(true);
    setScore(0);
    setQuestionsAnswered(0);
    setQuestion(getRandomQuestion(difficulty, 'algebra'));
    setUserAnswer('');
    setShowFeedback(false);
  };

  const endGame = () => {
    setGameActive(false);
    onIncrementGamesPlayed();
    
    const xpEarned = score * 20;
    const creditsEarned = score * 3;
    onAddXP(xpEarned);
    onAddCredits(creditsEarned);
    
    toast.success(t('gameComplete', language), {
      description: t('earnedXP', language, { xp: xpEarned }) + ' ' + t('earnedCredits', language, { credits: creditsEarned })
    });

    if (score === totalQuestions) {
      onUnlockAchievement('algebra_perfect');
    }
    if (score >= 8) {
      onUnlockAchievement('algebra_master');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!question || !userAnswer || showFeedback) return;

    const correctAnswer = typeof question.answer === 'number' ? question.answer : parseFloat(question.answer);
    const userAnswerNum = parseFloat(userAnswer);
    const correct = Math.abs(userAnswerNum - correctAnswer) < 0.01;

    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      setScore(score + 1);
      onIncrementStreak();
      onIncrementCorrectAnswers();
      onAddXP(20);
      toast.success('+20 XP', { duration: 1000 });
    } else {
      onResetStreak();
    }

    setTimeout(() => {
      const newQuestionsAnswered = questionsAnswered + 1;
      setQuestionsAnswered(newQuestionsAnswered);

      if (newQuestionsAnswered >= totalQuestions) {
        endGame();
      } else {
        setQuestion(getRandomQuestion(difficulty, 'algebra'));
        setUserAnswer('');
        setShowFeedback(false);
      }
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="bg-white/90 backdrop-blur border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{t('algebraGame', language)}</span>
            {gameActive && (
              <span className="flex items-center gap-2">
                <Variable className="h-5 w-5 text-purple-500" />
                {questionsAnswered}/{totalQuestions}
              </span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!gameActive ? (
            <div className="text-center py-12">
              <h3 className="text-2xl mb-4">{language === 'sv' ? 'Lös algebraproblem!' : 'Solve algebra problems!'}</h3>
              <p className="text-slate-600 mb-8">
                {language === 'sv' 
                  ? `Svara på ${totalQuestions} algebrafrågor och tjäna upp till ${totalQuestions * 20} XP!` 
                  : `Answer ${totalQuestions} algebra questions and earn up to ${totalQuestions * 20} XP!`}
              </p>
              <Button
                onClick={startGame}
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white"
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
                    className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all"
                    style={{ width: `${(questionsAnswered / totalQuestions) * 100}%` }}
                  />
                </div>
              </div>

              {question && (
                <div className="text-center py-8">
                  <div className="text-4xl mb-2 font-mono">
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
