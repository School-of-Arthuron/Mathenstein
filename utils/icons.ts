import {
  Trophy,
  Star,
  Brain,
  Rocket,
  Crown,
  Flame,
  Gem,
  Zap,
  Moon,
  Waves,
  TreePine
} from 'lucide-react';

export function getAvatarIcon(avatarId?: string) {
  switch (avatarId) {
    case 'avatar_star':
      return { icon: Star, color: 'from-yellow-400 to-orange-500' };
    case 'avatar_brain':
      return { icon: Brain, color: 'from-purple-400 to-pink-500' };
    case 'avatar_rocket':
      return { icon: Rocket, color: 'from-blue-400 to-cyan-500' };
    case 'avatar_crown':
      return { icon: Crown, color: 'from-yellow-300 to-yellow-600' };
    default:
      return { icon: Trophy, color: 'from-slate-600 to-slate-800' };
  }
}

export function getBadgeIcon(badgeId?: string) {
  switch (badgeId) {
    case 'badge_fire':
      return { icon: Flame, color: 'from-red-500 to-orange-500' };
    case 'badge_diamond':
      return { icon: Gem, color: 'from-cyan-400 to-blue-500' };
    case 'badge_lightning':
      return { icon: Zap, color: 'from-yellow-400 to-yellow-600' };
    default:
      return null;
  }
}

export function getThemeIcon(themeId?: string) {
  switch (themeId) {
    case 'theme_dark':
      return { icon: Moon, color: 'from-slate-700 to-slate-900' };
    case 'theme_ocean':
      return { icon: Waves, color: 'from-blue-500 to-teal-500' };
    case 'theme_forest':
      return { icon: TreePine, color: 'from-green-600 to-emerald-700' };
    default:
      return null;
  }
}

export function getItemIcon(itemId: string) {
  if (itemId.startsWith('avatar_')) {
    return getAvatarIcon(itemId);
  } else if (itemId.startsWith('badge_')) {
    return getBadgeIcon(itemId);
  } else if (itemId.startsWith('theme_')) {
    return getThemeIcon(itemId);
  }
  return { icon: Star, color: 'from-slate-400 to-slate-600' };
}
