import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Progress } from './ui/progress';
import { CheckCircle, XCircle, Lightbulb } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { UserProfile } from '../types/user';
import { Language, useTranslation } from '../utils/translations';
import { DifficultyLevel, QuestionType, getRandomQuestion, MathQuestion } from '../utils/mathQuestions';

interface CurriculumGameProps {
  profile: UserProfile;
  level: DifficultyLevel;
  type: QuestionType;
  language: Language;
  onEnd: () => void;
  onUpdateProfile: (updates: Partial<UserProfile>) => void;
}

export function CurriculumGame({ profile, level, type, language, onEnd, onUpdateProfile }: CurriculumGameProps) {
  const t = useTranslation(language);
  const [question, setQuestion] = useState<MathQuestion | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [consecutiveCorrect, setConsecutiveCorrect] = useState(0);
  const totalQuestions = 10;

  useEffect(() => {
    loadNewQuestion();
  }, []);

  const loadNewQuestion = () => {
    try {
      const newQuestion = getRandomQuestion(level, type);
      setQuestion(newQuestion);
      setUserAnswer('');
      setShowFeedback(false);
      setShowHint(false);
    } catch (error) {
      console.error('Error loading question:', error);
      // Fallback to a simple question if curriculum questions aren't available
      setQuestion({
        question: 'Beräkna: 5 + 3',
        questionEn: 'Calculate: 5 + 3',
        answer: 8,
        type: 'quickmath',
        level: 'A'
      });
    }
  };

  const calculateXP = (correct: boolean): number => {
    if (!correct) return 0;
    
    let baseXP = 15;
    
    // Level multiplier
    switch (level) {
      case 'A': baseXP = 15; break;
      case 'B': baseXP = 25; break;
      case 'C': baseXP = 35; break;
      case 'University': baseXP = 50; break;
    }
    
    // Streak bonus
    if (consecutiveCorrect >= 3) {
      baseXP *= 1.5;
    }
    
    return Math.floor(baseXP);
  };

  const calculateCoins = (correct: boolean): number => {
    if (!correct) return 0;
    
    let baseCoins = 5;
    
    switch (level) {
      case 'A': baseCoins = 5; break;
      case 'B': baseCoins = 8; break;
      case 'C': baseCoins = 12; break;
      case 'University': baseCoins = 20; break;
    }
    
    return baseCoins;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!question || !userAnswer || showFeedback) return;

    const answerStr = String(question.answer).toLowerCase().trim();
    const userStr = userAnswer.toLowerCase().trim();
    const correct = answerStr === userStr || parseFloat(userStr) === parseFloat(answerStr);

    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      setScore(score + 1);
      setConsecutiveCorrect(consecutiveCorrect + 1);
      
      const xp = calculateXP(true);
      const coins = calculateCoins(true);
      
      // Update profile
      const newXP = profile.xp + xp;
      const newLevel = Math.floor(newXP / 100) + 1;
      
      onUpdateProfile({
        xp: newXP,
        level: newLevel,
        streak: profile.streak + 1,
        coins: profile.coins + coins,
        correctAnswers: profile.correctAnswers + 1,
        gamesPlayed: profile.gamesPlayed
      });
      
      toast.success(`${t.correct} +${xp} XP, +${coins} ${t.coins}`, { duration: 1500 });
    } else {
      setConsecutiveCorrect(0);
      onUpdateProfile({
        streak: 0
      });
      toast.error(t.incorrect, { duration: 1500 });
    }

    setTimeout(() => {
      const newQuestionsAnswered = questionsAnswered + 1;
      setQuestionsAnswered(newQuestionsAnswered);

      if (newQuestionsAnswered >= totalQuestions) {
        endGame();
      } else {
        loadNewQuestion();
      }
    }, 2000);
  };

  const endGame = () => {
    const finalXP = score * 50;
    const finalCoins = score * 10;
    
    onUpdateProfile({
      gamesPlayed: profile.gamesPlayed + 1
    });
    
    toast.success(`${t.gameComplete} ${score}/${totalQuestions}!`, {
      description: `${t.earnedXP} ${finalXP} XP ${language === 'sv' ? 'och' : 'and'} ${finalCoins} ${t.coins}!`
    });
    
    setTimeout(onEnd, 2000);
  };

  if (!question) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardContent className="py-12 text-center">
            <p>{language === 'sv' ? 'Laddar fråga...' : 'Loading question...'}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="bg-white shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>
              {language === 'sv' ? 'Nivå' : 'Level'} {level} - {
                type === 'algebra' ? t.algebra :
                type === 'geometry' ? t.geometry :
                type === 'calculus' ? t.calculus :
                t.statistics
              }
            </span>
            <span>{questionsAnswered}/{totalQuestions}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <span>{t.score}: {score}</span>
              {consecutiveCorrect >= 3 && (
                <span className="text-orange-600">
                  🔥 {language === 'sv' ? 'Streak' : 'Streak'}: {consecutiveCorrect}
                </span>
              )}
            </div>
            <Progress value={(questionsAnswered / totalQuestions) * 100} className="h-2" />
          </div>

          <div className="py-8">
            <div className="text-2xl mb-8 text-center">
              {language === 'sv' ? question.question : question.questionEn}
            </div>

            {!showFeedback ? (
              <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
                <div className="flex gap-4">
                  <Input
                    type="text"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder={language === 'sv' ? 'Ditt svar' : 'Your answer'}
                    className="text-xl text-center"
                    autoFocus
                  />
                  <Button type="submit" size="lg">
                    {t.submit}
                  </Button>
                </div>
                
                {question.hint && !showHint && (
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => setShowHint(true)}
                  >
                    <Lightbulb className="h-4 w-4 mr-2" />
                    {language === 'sv' ? 'Visa ledtråd' : 'Show hint'}
                  </Button>
                )}
                
                {showHint && question.hint && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-900">
                    💡 {language === 'sv' ? question.hint : (question.hintEn || question.hint)}
                  </div>
                )}
              </form>
            ) : (
              <div className="text-center">
                {isCorrect ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-center gap-2 text-green-600">
                      <CheckCircle className="h-12 w-12" />
                      <span className="text-3xl">{t.correct}</span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-center justify-center gap-2 text-red-600">
                      <XCircle className="h-12 w-12" />
                      <span className="text-3xl">{t.incorrect}</span>
                    </div>
                    <p className="text-slate-600">
                      {language === 'sv' ? 'Rätt svar var' : 'Correct answer was'}: {question.answer}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
