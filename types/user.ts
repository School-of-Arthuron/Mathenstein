export interface UserProfile {
  id: string;
  email: string;
  name: string;
  xp: number;
  level: number;
  streak: number;
  coins: number;
  gamesPlayed: number;
  correctAnswers: number;
  achievements: string[];
  equippedItems: {
    avatar?: string;
    badge?: string;
    theme?: string;
  };
  ownedItems: string[];
  lastPlayed?: string;
}

export interface ShopItem {
  id: string;
  name: string;
  nameEn: string;
  nameSv: string;
  description: string;
  descriptionEn: string;
  descriptionSv: string;
  type: 'avatar' | 'badge' | 'theme';
  price: number;
  icon: string;
  color: string;
}

export const SHOP_ITEMS: ShopItem[] = [
  // Avatars
  {
    id: 'avatar_star',
    name: 'Stjärna',
    nameEn: 'Star',
    nameSv: 'Stjärna',
    description: 'En lysande stjärna',
    descriptionEn: 'A shining star',
    descriptionSv: 'En lysande stjärna',
    type: 'avatar',
    price: 100,
    icon: 'star',
    color: 'from-yellow-400 to-orange-500'
  },
  {
    id: 'avatar_brain',
    name: 'Hjärna',
    nameEn: 'Brain',
    nameSv: 'Hjärna',
    description: 'För de smarta',
    descriptionEn: 'For the smart ones',
    descriptionSv: 'För de smarta',
    type: 'avatar',
    price: 150,
    icon: 'brain',
    color: 'from-purple-400 to-pink-500'
  },
  {
    id: 'avatar_rocket',
    name: 'Raket',
    nameEn: 'Rocket',
    nameSv: 'Raket',
    description: 'Snabb som en raket',
    descriptionEn: 'Fast as a rocket',
    descriptionSv: 'Snabb som en raket',
    type: 'avatar',
    price: 200,
    icon: 'rocket',
    color: 'from-blue-400 to-cyan-500'
  },
  {
    id: 'avatar_crown',
    name: 'Krona',
    nameEn: 'Crown',
    nameSv: 'Krona',
    description: 'För mästarna',
    descriptionEn: 'For the masters',
    descriptionSv: 'För mästarna',
    type: 'avatar',
    price: 500,
    icon: 'crown',
    color: 'from-yellow-300 to-yellow-600'
  },
  // Badges
  {
    id: 'badge_fire',
    name: 'Eld Emblem',
    nameEn: 'Fire Badge',
    nameSv: 'Eld Emblem',
    description: 'Brinnande passion',
    descriptionEn: 'Burning passion',
    descriptionSv: 'Brinnande passion',
    type: 'badge',
    price: 150,
    icon: 'flame',
    color: 'from-red-500 to-orange-500'
  },
  {
    id: 'badge_diamond',
    name: 'Diamant Emblem',
    nameEn: 'Diamond Badge',
    nameSv: 'Diamant Emblem',
    description: 'Värdefull prestation',
    descriptionEn: 'Valuable achievement',
    descriptionSv: 'Värdefull prestation',
    type: 'badge',
    price: 300,
    icon: 'gem',
    color: 'from-cyan-400 to-blue-500'
  },
  {
    id: 'badge_lightning',
    name: 'Blixt Emblem',
    nameEn: 'Lightning Badge',
    nameSv: 'Blixt Emblem',
    description: 'Överljudshastighet',
    descriptionEn: 'Supersonic speed',
    descriptionSv: 'Överljudshastighet',
    type: 'badge',
    price: 250,
    icon: 'zap',
    color: 'from-yellow-400 to-yellow-600'
  },
  // Themes
  {
    id: 'theme_dark',
    name: 'Mörkt Tema',
    nameEn: 'Dark Theme',
    nameSv: 'Mörkt Tema',
    description: 'Elegant mörkläge',
    descriptionEn: 'Elegant dark mode',
    descriptionSv: 'Elegant mörkläge',
    type: 'theme',
    price: 300,
    icon: 'moon',
    color: 'from-slate-700 to-slate-900'
  },
  {
    id: 'theme_ocean',
    name: 'Hav Tema',
    nameEn: 'Ocean Theme',
    nameSv: 'Hav Tema',
    description: 'Lugnande havsfärger',
    descriptionEn: 'Calming ocean colors',
    descriptionSv: 'Lugnande havsfärger',
    type: 'theme',
    price: 400,
    icon: 'waves',
    color: 'from-blue-500 to-teal-500'
  },
  {
    id: 'theme_forest',
    name: 'Skog Tema',
    nameEn: 'Forest Theme',
    nameSv: 'Skog Tema',
    description: 'Naturliga skogens färger',
    descriptionEn: 'Natural forest colors',
    descriptionSv: 'Naturliga skogens färger',
    type: 'theme',
    price: 400,
    icon: 'tree-pine',
    color: 'from-green-600 to-emerald-700'
  }
];
