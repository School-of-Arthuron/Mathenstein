import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Trophy, Star, Flame, Coins, Target, Award } from 'lucide-react';
import { UserProfile } from '../types/user';
import { Language, useTranslation } from '../utils/translations';
import { getAvatarIcon, getBadgeIcon } from '../utils/icons';

interface ProfileViewProps {
  profile: UserProfile;
  language: Language;
}

export function ProfileView({ profile, language }: ProfileViewProps) {
  const t = useTranslation(language);
  const xpForNextLevel = profile.level * 100;
  const xpInCurrentLevel = profile.xp % xpForNextLevel;
  const xpProgress = (xpInCurrentLevel / xpForNextLevel) * 100;

  const AvatarIcon = getAvatarIcon(profile.equippedItems.avatar);
  const BadgeIcon = getBadgeIcon(profile.equippedItems.badge);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Card */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-6">
            <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${AvatarIcon.color} flex items-center justify-center relative`}>
              <AvatarIcon.icon className="h-12 w-12 text-white" />
              {BadgeIcon && (
                <div className={`absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-gradient-to-br ${BadgeIcon.color} flex items-center justify-center border-4 border-white`}>
                  <BadgeIcon.icon className="h-5 w-5 text-white" />
                </div>
              )}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl mb-1">{profile.name}</h2>
              <p className="text-slate-600 mb-3">{profile.email}</p>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">{t.level} {profile.level}</span>
                  <span className="text-sm text-slate-600">
                    {xpInCurrentLevel} / {xpForNextLevel} {t.xp}
                  </span>
                </div>
                <Progress value={xpProgress} className="h-2" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Trophy className="h-4 w-4 text-amber-600" />
              {t.xp}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl">{profile.xp}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Coins className="h-4 w-4 text-amber-600" />
              {t.coins}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl">{profile.coins}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Flame className="h-4 w-4 text-orange-600" />
              {t.streak}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl">{profile.streak}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Star className="h-4 w-4 text-purple-600" />
              {t.level}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl">{profile.level}</div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Stats */}
      <Card>
        <CardHeader>
          <CardTitle>{t.yourStats}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-3 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-5 w-5 text-blue-600" />
                <span className="text-sm text-slate-600">{t.gamesPlayed}</span>
              </div>
              <div className="text-2xl">{profile.gamesPlayed}</div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <Award className="h-5 w-5 text-green-600" />
                <span className="text-sm text-slate-600">{t.correctAnswers}</span>
              </div>
              <div className="text-2xl">{profile.correctAnswers}</div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <Trophy className="h-5 w-5 text-amber-600" />
                <span className="text-sm text-slate-600">{t.achievements}</span>
              </div>
              <div className="text-2xl">{profile.achievements.length}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
