import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Zap, Variable, Shapes, TrendingUp, BarChart3 } from 'lucide-react';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { GameType } from '../App';
import { Language, t } from '../utils/translations';
import { DifficultyLevel } from '../utils/questions';

interface GameSelectionProps {
  language: Language;
  difficulty: DifficultyLevel;
  onSelectGame: (game: GameType) => void;
  onChangeDifficulty: (difficulty: DifficultyLevel) => void;
}

export function GameSelection({ language, difficulty, onSelectGame, onChangeDifficulty }: GameSelectionProps) {
  const games = [
    {
      id: 'quickmath' as GameType,
      title: t('quickMath', language),
      description: t('quickMathDesc', language),
      icon: Zap,
      color: 'from-blue-600 to-cyan-600',
      xp: '10-25 XP'
    },
    {
      id: 'algebra' as GameType,
      title: t('algebraGame', language),
      description: t('algebraGameDesc', language),
      icon: Variable,
      color: 'from-purple-600 to-pink-600',
      xp: '15-30 XP'
    },
    {
      id: 'geometry' as GameType,
      title: t('geometryGame', language),
      description: t('geometryGameDesc', language),
      icon: Shapes,
      color: 'from-green-600 to-emerald-600',
      xp: '15-30 XP'
    },
    {
      id: 'calculus' as GameType,
      title: t('calculusGame', language),
      description: t('calculusGameDesc', language),
      icon: TrendingUp,
      color: 'from-orange-600 to-red-600',
      xp: '20-40 XP'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-slate-900 dark:text-white text-4xl mb-4">{t('mathQuest', language)}</h1>
        <p className="text-slate-600 dark:text-slate-300 text-lg mb-6">{t('chooseGame', language)}</p>
        
        <div className="flex items-center justify-center gap-3">
          <label className="text-sm text-slate-600 dark:text-slate-300">{t('difficulty', language)}:</label>
          <Select value={difficulty} onValueChange={(value) => onChangeDifficulty(value as DifficultyLevel)}>
            <SelectTrigger className="w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ma1">{t('ma1', language)}</SelectItem>
              <SelectItem value="ma2">{t('ma2', language)}</SelectItem>
              <SelectItem value="ma3">{t('ma3', language)}</SelectItem>
              <SelectItem value="ma4">{t('ma4', language)}</SelectItem>
              <SelectItem value="ma5">{t('ma5', language)}</SelectItem>
              <SelectItem value="university">{t('university', language)}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {games.map((game) => {
          const Icon = game.icon;
          return (
            <Card key={game.id} className="bg-white/90 backdrop-blur hover:shadow-lg transition-all cursor-pointer border border-slate-200">
              <CardHeader>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${game.color} flex items-center justify-center mb-3`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-lg">{game.title}</CardTitle>
                <CardDescription className="text-sm">{game.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-3">
                  <span className="text-xs text-slate-500">{game.xp}</span>
                </div>
                <Button
                  onClick={() => onSelectGame(game.id)}
                  className={`w-full bg-gradient-to-r ${game.color} text-white border-0 hover:opacity-90`}
                  size="sm"
                >
                  {t('playNow', language)}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
