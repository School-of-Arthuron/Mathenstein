import { useState, useEffect } from 'react';
import { createClient } from './utils/supabase/client';
import { AuthScreen } from './components/AuthScreen';
import { GameSelection } from './components/GameSelection';
import { QuickMathGame } from './components/QuickMathGame';
import { AlgebraGame } from './components/AlgebraGame';
import { GeometryGame } from './components/GeometryGame';
import { CalculusGame } from './components/CalculusGame';
import { ProfileHeader } from './components/ProfileHeader';
import { AchievementsPanel } from './components/AchievementsPanel';
import { ItemShop } from './components/ItemShop';
import { Toaster } from './components/ui/sonner';
import { Language } from './utils/translations';
import { DifficultyLevel } from './utils/questions';
import { projectId, publicAnonKey } from './utils/supabase/info';

export interface UserProfile {
  xp: number;
  level: number;
  credits: number;
  streak: number;
  gamesPlayed: number;
  correctAnswers: number;
  achievements: string[];
  purchasedItems: string[];
  equippedItems: {
    frame: string | null;
    theme: string | null;
    title: string | null;
  };
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export type GameType = 'selection' | 'quickmath' | 'algebra' | 'geometry' | 'calculus' | 'achievements' | 'shop';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [currentGame, setCurrentGame] = useState<GameType>('selection');
  const [language, setLanguage] = useState<Language>('sv');
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('ma1');
  const [loading, setLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    const supabase = createClient();
    const { data: { session } } = await supabase.auth.getSession();
    
    if (session) {
      setAccessToken(session.access_token);
      await loadUserProfile(session.access_token);
    }
    setLoading(false);
  };

  const loadUserProfile = async (token: string) => {
    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-27bf9193/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setUserProfile(data.profile);
        setUser(data.user);
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!accessToken) return;

    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-27bf9193/profile`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updates)
      });

      if (response.ok) {
        const data = await response.json();
        setUserProfile(data.profile);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleSignIn = async (token: string) => {
    setAccessToken(token);
    await loadUserProfile(token);
  };

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setUser(null);
    setUserProfile(null);
    setAccessToken(null);
    setCurrentGame('selection');
  };

  const addXP = (amount: number) => {
    if (!userProfile) return;
    
    const newXP = userProfile.xp + amount;
    const xpForNextLevel = userProfile.level * 100;
    const newLevel = newXP >= xpForNextLevel ? userProfile.level + 1 : userProfile.level;
    
    updateProfile({
      xp: newXP,
      level: newLevel
    });
  };

  const addCredits = (amount: number) => {
    if (!userProfile) return;
    
    updateProfile({
      credits: userProfile.credits + amount
    });
  };

  const incrementStreak = () => {
    if (!userProfile) return;
    
    updateProfile({
      streak: userProfile.streak + 1
    });
  };

  const resetStreak = () => {
    if (!userProfile) return;
    
    updateProfile({
      streak: 0
    });
  };

  const incrementGamesPlayed = () => {
    if (!userProfile) return;
    
    updateProfile({
      gamesPlayed: userProfile.gamesPlayed + 1
    });
  };

  const incrementCorrectAnswers = () => {
    if (!userProfile) return;
    
    updateProfile({
      correctAnswers: userProfile.correctAnswers + 1
    });
  };

  const unlockAchievement = (achievementId: string) => {
    if (!userProfile || userProfile.achievements.includes(achievementId)) return;
    
    updateProfile({
      achievements: [...userProfile.achievements, achievementId]
    });
  };

  const renderGame = () => {
    if (!userProfile) return null;

    switch (currentGame) {
      case 'quickmath':
        return (
          <QuickMathGame
            difficulty={difficulty}
            language={language}
            onBack={() => setCurrentGame('selection')}
            onAddXP={addXP}
            onAddCredits={addCredits}
            onIncrementStreak={incrementStreak}
            onResetStreak={resetStreak}
            onIncrementGamesPlayed={incrementGamesPlayed}
            onIncrementCorrectAnswers={incrementCorrectAnswers}
            onUnlockAchievement={unlockAchievement}
          />
        );
      case 'algebra':
        return (
          <AlgebraGame
            difficulty={difficulty}
            language={language}
            onBack={() => setCurrentGame('selection')}
            onAddXP={addXP}
            onAddCredits={addCredits}
            onIncrementStreak={incrementStreak}
            onResetStreak={resetStreak}
            onIncrementGamesPlayed={incrementGamesPlayed}
            onIncrementCorrectAnswers={incrementCorrectAnswers}
            onUnlockAchievement={unlockAchievement}
          />
        );
      case 'geometry':
        return (
          <GeometryGame
            difficulty={difficulty}
            language={language}
            onBack={() => setCurrentGame('selection')}
            onAddXP={addXP}
            onAddCredits={addCredits}
            onIncrementStreak={incrementStreak}
            onResetStreak={resetStreak}
            onIncrementGamesPlayed={incrementGamesPlayed}
            onIncrementCorrectAnswers={incrementCorrectAnswers}
            onUnlockAchievement={unlockAchievement}
          />
        );
      case 'calculus':
        return (
          <CalculusGame
            difficulty={difficulty}
            language={language}
            onBack={() => setCurrentGame('selection')}
            onAddXP={addXP}
            onAddCredits={addCredits}
            onIncrementStreak={incrementStreak}
            onResetStreak={resetStreak}
            onIncrementGamesPlayed={incrementGamesPlayed}
            onIncrementCorrectAnswers={incrementCorrectAnswers}
            onUnlockAchievement={unlockAchievement}
          />
        );
      case 'achievements':
        return (
          <AchievementsPanel
            userProfile={userProfile}
            language={language}
            onBack={() => setCurrentGame('selection')}
          />
        );
      case 'shop':
        return (
          <ItemShop
            userProfile={userProfile}
            language={language}
            accessToken={accessToken}
            onBack={() => setCurrentGame('selection')}
            onProfileUpdate={(profile) => setUserProfile(profile)}
          />
        );
      default:
        return (
          <GameSelection
            language={language}
            difficulty={difficulty}
            onSelectGame={setCurrentGame}
            onChangeDifficulty={setDifficulty}
          />
        );
    }
  };

  const getThemeClasses = () => {
    if (!userProfile?.equippedItems.theme) {
      return 'bg-gradient-to-br from-slate-50 to-slate-100';
    }

    const themeMap: Record<string, string> = {
      'theme_dark': 'bg-gradient-to-br from-slate-900 to-slate-800',
      'theme_ocean': 'bg-gradient-to-br from-blue-900 to-cyan-900',
      'theme_forest': 'bg-gradient-to-br from-green-900 to-emerald-900',
      'theme_sunset': 'bg-gradient-to-br from-orange-900 to-red-900'
    };

    return themeMap[userProfile.equippedItems.theme] || 'bg-gradient-to-br from-slate-50 to-slate-100';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-2xl">Laddar...</div>
      </div>
    );
  }

  if (!user || !userProfile) {
    return <AuthScreen onSignIn={handleSignIn} language={language} onChangeLanguage={setLanguage} />;
  }

  return (
    <div className={`min-h-screen ${getThemeClasses()}`}>
      <ProfileHeader
        user={user}
        userProfile={userProfile}
        language={language}
        onViewAchievements={() => setCurrentGame('achievements')}
        onViewShop={() => setCurrentGame('shop')}
        onChangeLanguage={setLanguage}
        onSignOut={handleSignOut}
        showBackButton={currentGame !== 'selection'}
        onBack={() => setCurrentGame('selection')}
      />
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {renderGame()}
      </main>
      <Toaster />
    </div>
  );
}
