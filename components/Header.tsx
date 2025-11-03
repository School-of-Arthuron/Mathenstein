import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { GraduationCap, ShoppingBag, Award, User, LogOut, Flame, Coins } from 'lucide-react';
import { createClient } from '../utils/supabase/client';
import { UserProfile } from '../types/user';
import { Language, useTranslation } from '../utils/translations';
import { getAvatarIcon } from '../utils/icons';

interface HeaderProps {
  profile: UserProfile;
  currentView: string;
  onViewChange: (view: 'home' | 'shop' | 'achievements' | 'profile') => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

export function Header({ profile, currentView, onViewChange, language, onLanguageChange }: HeaderProps) {
  const t = useTranslation(language);
  const xpForNextLevel = profile.level * 100;
  const xpProgress = (profile.xp % xpForNextLevel) / xpForNextLevel * 100;

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
  };

  const AvatarIcon = getAvatarIcon(profile.equippedItems.avatar);

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo and Navigation */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => onViewChange('home')}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-slate-700 to-slate-900 rounded-xl flex items-center justify-center">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl hidden sm:inline">{t.mathQuest}</span>
            </button>

            <nav className="hidden md:flex gap-2">
              <Button
                variant={currentView === 'home' ? 'default' : 'ghost'}
                onClick={() => onViewChange('home')}
              >
                {t.home}
              </Button>
              <Button
                variant={currentView === 'shop' ? 'default' : 'ghost'}
                onClick={() => onViewChange('shop')}
              >
                <ShoppingBag className="h-4 w-4 mr-2" />
                {t.shop}
              </Button>
              <Button
                variant={currentView === 'achievements' ? 'default' : 'ghost'}
                onClick={() => onViewChange('achievements')}
              >
                <Award className="h-4 w-4 mr-2" />
                {t.achievements}
              </Button>
              <Button
                variant={currentView === 'profile' ? 'default' : 'ghost'}
                onClick={() => onViewChange('profile')}
              >
                <User className="h-4 w-4 mr-2" />
                {t.profile}
              </Button>
            </nav>
          </div>

          {/* User Info */}
          <div className="flex items-center gap-4">
            {/* Coins */}
            <div className="flex items-center gap-2 bg-amber-50 rounded-full px-3 py-1.5 border border-amber-200">
              <Coins className="h-4 w-4 text-amber-600" />
              <span className="text-sm">{profile.coins}</span>
            </div>

            {/* Streak */}
            <div className="hidden sm:flex items-center gap-2 bg-orange-50 rounded-full px-3 py-1.5 border border-orange-200">
              <Flame className="h-4 w-4 text-orange-600" />
              <span className="text-sm">{profile.streak}</span>
            </div>

            {/* Level & XP */}
            <div className="hidden lg:flex items-center gap-2">
              <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${AvatarIcon.color} flex items-center justify-center`}>
                <AvatarIcon.icon className="h-5 w-5 text-white" />
              </div>
              <div className="min-w-[120px]">
                <div className="text-sm">{t.level} {profile.level}</div>
                <Progress value={xpProgress} className="h-1.5" />
              </div>
            </div>

            {/* Language Switcher */}
            <div className="hidden sm:flex gap-1 bg-slate-100 rounded-lg p-1">
              <button
                onClick={() => onLanguageChange('sv')}
                className={`px-2 py-1 rounded text-xs transition-colors ${
                  language === 'sv' ? 'bg-white shadow-sm' : 'hover:bg-slate-200'
                }`}
              >
                SV
              </button>
              <button
                onClick={() => onLanguageChange('en')}
                className={`px-2 py-1 rounded text-xs transition-colors ${
                  language === 'en' ? 'bg-white shadow-sm' : 'hover:bg-slate-200'
                }`}
              >
                EN
              </button>
            </div>

            {/* Sign Out */}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSignOut}
              className="hidden sm:flex"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className="md:hidden flex gap-2 pb-3 overflow-x-auto">
          <Button
            size="sm"
            variant={currentView === 'home' ? 'default' : 'ghost'}
            onClick={() => onViewChange('home')}
          >
            {t.home}
          </Button>
          <Button
            size="sm"
            variant={currentView === 'shop' ? 'default' : 'ghost'}
            onClick={() => onViewChange('shop')}
          >
            <ShoppingBag className="h-4 w-4 mr-1" />
            {t.shop}
          </Button>
          <Button
            size="sm"
            variant={currentView === 'achievements' ? 'default' : 'ghost'}
            onClick={() => onViewChange('achievements')}
          >
            <Award className="h-4 w-4 mr-1" />
            {t.achievements}
          </Button>
          <Button
            size="sm"
            variant={currentView === 'profile' ? 'default' : 'ghost'}
            onClick={() => onViewChange('profile')}
          >
            <User className="h-4 w-4 mr-1" />
            {t.profile}
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={handleSignOut}
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </nav>
      </div>
    </header>
  );
}
