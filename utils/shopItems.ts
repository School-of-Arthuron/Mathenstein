export interface ShopItem {
  id: string;
  name: string;
  nameSv: string;
  description: string;
  descriptionSv: string;
  price: number;
  category: 'frame' | 'theme' | 'title';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  color?: string;
}

export const shopItems: ShopItem[] = [
  // Avatar Frames
  {
    id: 'frame_bronze',
    name: 'Bronze Frame',
    nameSv: 'Bronsram',
    description: 'A simple bronze frame',
    descriptionSv: 'En enkel bronsram',
    price: 100,
    category: 'frame',
    rarity: 'common',
    color: '#CD7F32'
  },
  {
    id: 'frame_silver',
    name: 'Silver Frame',
    nameSv: 'Silverram',
    description: 'A shiny silver frame',
    descriptionSv: 'En glänsande silverram',
    price: 250,
    category: 'frame',
    rarity: 'rare',
    color: '#C0C0C0'
  },
  {
    id: 'frame_gold',
    name: 'Gold Frame',
    nameSv: 'Guldram',
    description: 'A prestigious gold frame',
    descriptionSv: 'En prestigefylld guldram',
    price: 500,
    category: 'frame',
    rarity: 'epic',
    color: '#FFD700'
  },
  {
    id: 'frame_diamond',
    name: 'Diamond Frame',
    nameSv: 'Diamantram',
    description: 'The ultimate diamond frame',
    descriptionSv: 'Den ultimata diamantramen',
    price: 1000,
    category: 'frame',
    rarity: 'legendary',
    color: '#B9F2FF'
  },
  {
    id: 'frame_rainbow',
    name: 'Rainbow Frame',
    nameSv: 'Regnbågsram',
    description: 'A colorful rainbow frame',
    descriptionSv: 'En färgglad regnbågsram',
    price: 750,
    category: 'frame',
    rarity: 'epic',
    color: 'linear-gradient(45deg, red, orange, yellow, green, blue, indigo, violet)'
  },
  
  // Themes
  {
    id: 'theme_dark',
    name: 'Dark Mode',
    nameSv: 'Mörkt läge',
    description: 'Sleek dark theme',
    descriptionSv: 'Elegant mörkt tema',
    price: 200,
    category: 'theme',
    rarity: 'common',
    color: '#1a1a1a'
  },
  {
    id: 'theme_ocean',
    name: 'Ocean Theme',
    nameSv: 'Havstema',
    description: 'Cool ocean blues',
    descriptionSv: 'Svala havsblå toner',
    price: 300,
    category: 'theme',
    rarity: 'rare',
    color: '#006994'
  },
  {
    id: 'theme_forest',
    name: 'Forest Theme',
    nameSv: 'Skogstema',
    description: 'Natural forest greens',
    descriptionSv: 'Naturliga skogsgröna toner',
    price: 300,
    category: 'theme',
    rarity: 'rare',
    color: '#228B22'
  },
  {
    id: 'theme_sunset',
    name: 'Sunset Theme',
    nameSv: 'Solnedgångstema',
    description: 'Warm sunset colors',
    descriptionSv: 'Varma solnedgångsfärger',
    price: 400,
    category: 'theme',
    rarity: 'epic',
    color: '#FF6B35'
  },
  
  // Titles
  {
    id: 'title_beginner',
    name: 'Beginner',
    nameSv: 'Nybörjare',
    description: 'Just starting out',
    descriptionSv: 'Precis börjat',
    price: 50,
    category: 'title',
    rarity: 'common'
  },
  {
    id: 'title_mathematician',
    name: 'Mathematician',
    nameSv: 'Matematiker',
    description: 'Math expert',
    descriptionSv: 'Matematikexpert',
    price: 300,
    category: 'title',
    rarity: 'rare'
  },
  {
    id: 'title_professor',
    name: 'Professor',
    nameSv: 'Professor',
    description: 'Teaching mastery',
    descriptionSv: 'Undervisningsmästare',
    price: 600,
    category: 'title',
    rarity: 'epic'
  },
  {
    id: 'title_genius',
    name: 'Math Genius',
    nameSv: 'Matematikgeni',
    description: 'Ultimate math master',
    descriptionSv: 'Ultimat matematikmästare',
    price: 1200,
    category: 'title',
    rarity: 'legendary'
  },
];

export function getItemsByCategory(category: ShopItem['category']): ShopItem[] {
  return shopItems.filter(item => item.category === category);
}

export function getItemById(id: string): ShopItem | undefined {
  return shopItems.find(item => item.id === id);
}
