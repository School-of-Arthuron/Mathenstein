import { useState, useEffect } from 'react';
import { Header } from './Header';
import { GameSelection } from './GameSelection';
import { Shop } from './Shop';
import { AchievementsPanel } from './AchievementsPanel';
import { ProfileView } from './ProfileView';
import { CurriculumGame } from './CurriculumGame';
import { UserProfile } from '../types/user';
import { Language } from '../utils/translations';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { DifficultyLevel, QuestionType } from '../utils/mathQuestions';

interface MainAppProps {
  user: any;
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

type View = 'home' | 'shop' | 'achievements' | 'profile' | 'game';

export function MainApp({ user, language, onLanguageChange }: MainAppProps) {
  const [currentView, setCurrentView] = useState<View>('home');
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [gameConfig, setGameConfig] = useState<{
    level: DifficultyLevel;
    type: QuestionType;
  } | null>(null);

  useEffect(() => {
    fetchProfile();
  }, [user]);

  const fetchProfile = async () => {
    try {
      const { data: { session } } = await (await import('../utils/supabase/client')).createClient().auth.getSession();
      
      if (!session) return;

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-27bf9193/profile`,
        {
          headers: {
            'Authorization': `Bearer ${session.access_token}`
          }
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch profile');
      }

      const data = await response.json();
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    try {
      const { data: { session } } = await (await import('../utils/supabase/client')).createClient().auth.getSession();
      
      if (!session) return;

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-27bf9193/profile/update`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updates)
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const data = await response.json();
      setProfile(data.profile);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const startGame = (level: DifficultyLevel, type: QuestionType) => {
    setGameConfig({ level, type });
    setCurrentView('game');
  };

  const endGame = () => {
    setGameConfig(null);
    setCurrentView('home');
    fetchProfile(); // Refresh profile after game
  };

  if (loading || !profile) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-2xl text-slate-600">
          {language === 'sv' ? 'Laddar...' : 'Loading...'}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header
        profile={profile}
        currentView={currentView}
        onViewChange={setCurrentView}
        language={language}
        onLanguageChange={onLanguageChange}
      />
      <main className="container mx-auto px-4 py-8">
        {currentView === 'home' && (
          <GameSelection
            language={language}
            onStartGame={startGame}
          />
        )}
        {currentView === 'shop' && (
          <Shop
            profile={profile}
            language={language}
            onProfileUpdate={setProfile}
          />
        )}
        {currentView === 'achievements' && (
          <AchievementsPanel
            profile={profile}
            language={language}
          />
        )}
        {currentView === 'profile' && (
          <ProfileView
            profile={profile}
            language={language}
          />
        )}
        {currentView === 'game' && gameConfig && (
          <CurriculumGame
            profile={profile}
            level={gameConfig.level}
            type={gameConfig.type}
            language={language}
            onEnd={endGame}
            onUpdateProfile={updateProfile}
          />
        )}
      </main>
    </div>
  );
}
