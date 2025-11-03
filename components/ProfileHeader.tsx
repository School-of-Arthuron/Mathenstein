import { Trophy, Award, Flame, ArrowLeft, ShoppingBag, LogOut, Globe } from 'lucide-react';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { UserProfile, User } from '../App';
import { Language, t } from '../utils/translations';
import { getItemById } from '../utils/shopItems';

interface ProfileHeaderProps {
  user: User;
  userProfile: UserProfile;
  language: Language;
  onViewAchievements: () => void;
  onViewShop: () => void;
  onChangeLanguage: (lang: Language) => void;
  onSignOut: () => void;
  showBackButton?: boolean;
  onBack?: () => void;
}

export function ProfileHeader({ 
  user, 
  userProfile, 
  language, 
  onViewAchievements, 
  onViewShop,
  onChangeLanguage,
  onSignOut,
  showBackButton, 
  onBack 
}: ProfileHeaderProps) {
  const xpForNextLevel = userProfile.level * 100;
  const xpProgress = (userProfile.xp / xpForNextLevel) * 100;

  const frameItem = userProfile.equippedItems.frame ? getItemById(userProfile.equippedItems.frame) : null;
  const titleItem = userProfile.equippedItems.title ? getItemById(userProfile.equippedItems.title) : null;

  const isDarkTheme = userProfile.equippedItems.theme && 
    ['theme_dark', 'theme_ocean', 'theme_forest', 'theme_sunset'].includes(userProfile.equippedItems.theme);

  const textColor = isDarkTheme ? 'text-white' : 'text-slate-900';
  const mutedTextColor = isDarkTheme ? 'text-slate-300' : 'text-slate-600';

  return (
    <header className="bg-white/10 backdrop-blur-lg border-b border-white/20">
      <div className="container mx-auto px-4 py-4 max-w-7xl">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            {showBackButton && (
              <Button
                onClick={onBack}
                variant="ghost"
                size="icon"
                className={`${textColor} hover:bg-white/20`}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            )}
            <div className="flex items-center gap-3">
              <div 
                className="w-14 h-14 rounded-full flex items-center justify-center text-2xl relative"
                style={frameItem?.color ? {
                  background: frameItem.color,
                  border: '3px solid',
                  borderColor: frameItem.color
                } : {
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                }}
              >
                {user.name ? user.name.charAt(0).toUpperCase() : '👤'}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className={textColor}>{user.name}</h2>
                  {titleItem && (
                    <span className={`text-sm ${mutedTextColor}`}>
                      • {language === 'sv' ? titleItem.nameSv : titleItem.name}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <span className={`text-sm ${mutedTextColor}`}>{t('level', language)} {userProfile.level}</span>
                    <Progress value={xpProgress} className="w-24 h-1.5" />
                    <span className={`text-xs ${mutedTextColor}`}>{userProfile.xp}/{xpForNextLevel}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <div className={`flex items-center gap-2 bg-white/10 rounded-lg px-3 py-1.5 ${textColor}`}>
              <Flame className="h-4 w-4 text-orange-400" />
              <span className="text-sm">{userProfile.streak}</span>
            </div>
            
            <div className={`flex items-center gap-2 bg-white/10 rounded-lg px-3 py-1.5 ${textColor}`}>
              <ShoppingBag className="h-4 w-4 text-yellow-400" />
              <span className="text-sm">{userProfile.credits} {t('credits', language)}</span>
            </div>

            <Button
              onClick={onViewAchievements}
              variant="ghost"
              size="sm"
              className={`${textColor} hover:bg-white/20`}
            >
              <Award className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">{t('achievements', language)}</span>
            </Button>

            <Button
              onClick={onViewShop}
              variant="ghost"
              size="sm"
              className={`${textColor} hover:bg-white/20`}
            >
              <ShoppingBag className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">{t('shop', language)}</span>
            </Button>

            <Button
              onClick={() => onChangeLanguage(language === 'sv' ? 'en' : 'sv')}
              variant="ghost"
              size="sm"
              className={`${textColor} hover:bg-white/20`}
            >
              <Globe className="h-4 w-4" />
            </Button>

            <Button
              onClick={onSignOut}
              variant="ghost"
              size="sm"
              className={`${textColor} hover:bg-white/20`}
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
