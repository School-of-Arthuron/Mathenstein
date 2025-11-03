import { useState } from 'react';
import { createClient } from '../utils/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Github } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { Language, t } from '../utils/translations';
import { projectId } from '../utils/supabase/info';

interface AuthScreenProps {
  onSignIn: (token: string) => void;
  language: Language;
  onChangeLanguage: (lang: Language) => void;
}

export function AuthScreen({ onSignIn, language, onChangeLanguage }: AuthScreenProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        // Sign up
        const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-27bf9193/signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password, name })
        });

        const data = await response.json();

        if (!response.ok) {
          toast.error(data.error || 'Sign up failed');
          setLoading(false);
          return;
        }

        // Now sign in
        const supabase = createClient();
        const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password
        });

        if (signInError) {
          toast.error(signInError.message);
          setLoading(false);
          return;
        }

        if (signInData.session) {
          toast.success(language === 'sv' ? 'Välkommen!' : 'Welcome!');
          onSignIn(signInData.session.access_token);
        }
      } else {
        // Sign in
        const supabase = createClient();
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        });

        if (error) {
          toast.error(error.message);
          setLoading(false);
          return;
        }

        if (data.session) {
          toast.success(language === 'sv' ? 'Välkommen tillbaka!' : 'Welcome back!');
          onSignIn(data.session.access_token);
        }
      }
    } catch (error) {
      console.error('Auth error:', error);
      toast.error('Authentication failed');
    }

    setLoading(false);
  };

  const handleSocialAuth = async (provider: 'google' | 'github') => {
    setLoading(true);
    
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: window.location.origin
        }
      });

      if (error) {
        toast.error(error.message);
      } else {
        toast.info(language === 'sv' ? 'Följ instruktionerna för att slutföra inloggningen' : 'Follow the instructions to complete sign in');
      }
    } catch (error) {
      console.error('Social auth error:', error);
      toast.error('Authentication failed');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="w-full max-w-md space-y-4">
        <div className="text-center mb-8">
          <h1 className="text-5xl mb-2">📐</h1>
          <h1 className="text-4xl mb-2">{t('mathQuest', language)}</h1>
          <p className="text-muted-foreground">{t('chooseGame', language)}</p>
        </div>

        <div className="flex justify-center gap-2 mb-4">
          <Button
            variant={language === 'sv' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onChangeLanguage('sv')}
          >
            Svenska
          </Button>
          <Button
            variant={language === 'en' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onChangeLanguage('en')}
          >
            English
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{isSignUp ? t('signUp', language) : t('signIn', language)}</CardTitle>
            <CardDescription>
              {isSignUp 
                ? (language === 'sv' ? 'Skapa ett konto för att börja lära dig matematik' : 'Create an account to start learning math')
                : (language === 'sv' ? 'Logga in för att fortsätta din matematikresa' : 'Sign in to continue your math journey')
              }
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleEmailAuth} className="space-y-4">
              {isSignUp && (
                <div className="space-y-2">
                  <Label htmlFor="name">{t('name', language)}</Label>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required={isSignUp}
                    placeholder={language === 'sv' ? 'Ditt namn' : 'Your name'}
                  />
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="email">{t('email', language)}</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="exempel@email.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">{t('password', language)}</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (language === 'sv' ? 'Laddar...' : 'Loading...') : (isSignUp ? t('signUp', language) : t('signIn', language))}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  {t('orSignInWith', language)}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => handleSocialAuth('google')}
                disabled={loading}
              >
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                {t('signInWithGoogle', language)}
              </Button>

              <Button
                variant="outline"
                className="w-full"
                onClick={() => handleSocialAuth('github')}
                disabled={loading}
              >
                <Github className="mr-2 h-4 w-4" />
                {t('signInWithGithub', language)}
              </Button>
            </div>

            <div className="text-center text-sm">
              {isSignUp ? t('alreadyHaveAccount', language) : t('dontHaveAccount', language)}{' '}
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-primary underline-offset-4 hover:underline"
              >
                {isSignUp ? t('signIn', language) : t('signUp', language)}
              </button>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground">
          {language === 'sv' 
            ? 'För social inloggning: Följ instruktionerna på ' 
            : 'For social login: Follow instructions at '}
          <a 
            href="https://supabase.com/docs/guides/auth/social-login" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Supabase Docs
          </a>
        </p>
      </div>
    </div>
  );
}
