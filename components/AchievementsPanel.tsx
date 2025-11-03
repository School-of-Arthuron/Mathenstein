import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Trophy, Star, Zap, Target, Award, Lock } from 'lucide-react';
import { UserProfile } from '../App';
import { Language, t } from '../utils/translations';

interface AchievementsPanelProps {
  userProfile: UserProfile;
  language: Language;
  onBack: () => void;
}

interface Achievement {
  id: string;
  title: string;
  titleSv: string;
  description: string;
  descriptionSv: string;
  icon: any;
  xpReward: number;
}

export function AchievementsPanel({ userProfile, language }: AchievementsPanelProps) {
  const achievements: Achievement[] = [
    {
      id: 'speed_demon',
      title: 'Speed Demon',
      titleSv: 'Hastighetsdemon',
      description: 'Answer 10 questions correctly in Quick Math',
      descriptionSv: 'Svara rätt på 10 frågor i Snabb Matte',
      icon: Zap,
      xpReward: 50
    },
    {
      id: 'algebra_master',
      title: 'Algebra Master',
      titleSv: 'Algebramästare',
      description: 'Get 8 or more correct in Algebra game',
      descriptionSv: 'Få 8 eller fler rätt i Algebraspelet',
      icon: Star,
      xpReward: 75
    },
    {
      id: 'algebra_perfect',
      title: 'Perfect Algebra',
      titleSv: 'Perfekt Algebra',
      description: 'Get all 10 correct in Algebra game',
      descriptionSv: 'Få alla 10 rätt i Algebraspelet',
      icon: Trophy,
      xpReward: 150
    },
    {
      id: 'geometry_expert',
      title: 'Geometry Expert',
      titleSv: 'Geometriexpert',
      description: 'Get 8 or more correct in Geometry game',
      descriptionSv: 'Få 8 eller fler rätt i Geometrispelet',
      icon: Target,
      xpReward: 75
    },
    {
      id: 'geometry_perfect',
      title: 'Perfect Geometry',
      titleSv: 'Perfekt Geometri',
      description: 'Get all 10 correct in Geometry game',
      descriptionSv: 'Få alla 10 rätt i Geometrispelet',
      icon: Trophy,
      xpReward: 150
    },
    {
      id: 'calculus_genius',
      title: 'Calculus Genius',
      titleSv: 'Analysgeni',
      description: 'Get 6 or more correct in Calculus game',
      descriptionSv: 'Få 6 eller fler rätt i Analysspelet',
      icon: Award,
      xpReward: 100
    },
    {
      id: 'calculus_perfect',
      title: 'Perfect Calculus',
      titleSv: 'Perfekt Analys',
      description: 'Get all 8 correct in Calculus game',
      descriptionSv: 'Få alla 8 rätt i Analysspelet',
      icon: Trophy,
      xpReward: 200
    }
  ];

  const isUnlocked = (achievementId: string) => {
    return userProfile.achievements.includes(achievementId);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-slate-900 text-4xl mb-2">{t('achievementsTitle', language)}</h2>
        <p className="text-slate-600">
          {userProfile.achievements.length} {language === 'sv' ? 'av' : 'of'} {achievements.length} {language === 'sv' ? 'upplåsta' : 'unlocked'}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {achievements.map((achievement) => {
          const Icon = achievement.icon;
          const unlocked = isUnlocked(achievement.id);

          return (
            <Card
              key={achievement.id}
              className={`${
                unlocked
                  ? 'bg-white/90 backdrop-blur border-slate-200'
                  : 'bg-slate-100/50 backdrop-blur border-slate-300'
              }`}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div
                    className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                      unlocked
                        ? 'bg-gradient-to-br from-yellow-400 to-orange-500'
                        : 'bg-slate-400'
                    }`}
                  >
                    {unlocked ? (
                      <Icon className="h-7 w-7 text-white" />
                    ) : (
                      <Lock className="h-7 w-7 text-white" />
                    )}
                  </div>
                  {unlocked && (
                    <Badge className="bg-green-500 text-white">
                      {t('unlocked', language)}
                    </Badge>
                  )}
                </div>
                <CardTitle className={unlocked ? '' : 'text-slate-500'}>
                  {language === 'sv' ? achievement.titleSv : achievement.title}
                </CardTitle>
                <CardDescription className={unlocked ? '' : 'text-slate-400'}>
                  {language === 'sv' ? achievement.descriptionSv : achievement.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Trophy className={`h-4 w-4 ${unlocked ? 'text-yellow-600' : 'text-slate-400'}`} />
                  <span className={unlocked ? 'text-sm' : 'text-sm text-slate-500'}>
                    {achievement.xpReward} XP {language === 'sv' ? 'Belöning' : 'Reward'}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="mt-8 bg-white/90 backdrop-blur border-slate-200">
        <CardHeader>
          <CardTitle>{language === 'sv' ? 'Din Statistik' : 'Your Stats'}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-3xl mb-1">{userProfile.gamesPlayed}</div>
              <div className="text-sm text-slate-600">{t('gamesPlayed', language)}</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-3xl mb-1">{userProfile.correctAnswers}</div>
              <div className="text-sm text-slate-600">{t('correctAnswers', language)}</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-3xl mb-1">{userProfile.level}</div>
              <div className="text-sm text-slate-600">{t('level', language)}</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-3xl mb-1">{userProfile.streak}</div>
              <div className="text-sm text-slate-600">{t('currentStreak', language)}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
