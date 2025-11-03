import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { ShoppingBag, Check } from 'lucide-react';
import { UserProfile } from '../App';
import { Language, t } from '../utils/translations';
import { shopItems, getItemsByCategory, ShopItem } from '../utils/shopItems';
import { toast } from 'sonner@2.0.3';
import { projectId } from '../utils/supabase/info';

interface ItemShopProps {
  userProfile: UserProfile;
  language: Language;
  accessToken: string | null;
  onBack: () => void;
  onProfileUpdate: (profile: UserProfile) => void;
}

export function ItemShop({ userProfile, language, accessToken, onBack, onProfileUpdate }: ItemShopProps) {
  const [purchasing, setPurchasing] = useState<string | null>(null);
  const [equipping, setEquipping] = useState<string | null>(null);

  const handlePurchase = async (item: ShopItem) => {
    if (!accessToken) return;
    
    setPurchasing(item.id);

    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-27bf9193/purchase`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ itemId: item.id, price: item.price })
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || (language === 'sv' ? 'Köpet misslyckades' : 'Purchase failed'));
        setPurchasing(null);
        return;
      }

      onProfileUpdate(data.profile);
      toast.success(language === 'sv' ? 'Köpt!' : 'Purchased!', {
        description: language === 'sv' 
          ? `Du köpte ${item.nameSv}!` 
          : `You purchased ${item.name}!`
      });
    } catch (error) {
      console.error('Purchase error:', error);
      toast.error(language === 'sv' ? 'Köpet misslyckades' : 'Purchase failed');
    }

    setPurchasing(null);
  };

  const handleEquip = async (item: ShopItem) => {
    if (!accessToken) return;
    
    setEquipping(item.id);

    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-27bf9193/equip`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ itemId: item.id, category: item.category })
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || (language === 'sv' ? 'Misslyckades att utrusta' : 'Failed to equip'));
        setEquipping(null);
        return;
      }

      onProfileUpdate(data.profile);
      toast.success(language === 'sv' ? 'Utrustad!' : 'Equipped!');
    } catch (error) {
      console.error('Equip error:', error);
      toast.error(language === 'sv' ? 'Misslyckades att utrusta' : 'Failed to equip');
    }

    setEquipping(null);
  };

  const isPurchased = (itemId: string) => userProfile.purchasedItems.includes(itemId);
  const isEquipped = (itemId: string, category: ShopItem['category']) => 
    userProfile.equippedItems[category] === itemId;

  const getRarityColor = (rarity: ShopItem['rarity']) => {
    switch (rarity) {
      case 'common': return 'bg-slate-500';
      case 'rare': return 'bg-blue-500';
      case 'epic': return 'bg-purple-500';
      case 'legendary': return 'bg-orange-500';
    }
  };

  const renderItems = (items: ShopItem[]) => {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => {
          const purchased = isPurchased(item.id);
          const equipped = isEquipped(item.id, item.category);

          return (
            <Card key={item.id} className="bg-white/90 backdrop-blur border-slate-200">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div 
                    className="w-16 h-16 rounded-lg flex items-center justify-center text-2xl border-4"
                    style={item.color ? {
                      background: item.color,
                      borderColor: item.color
                    } : {
                      background: '#ddd',
                      borderColor: '#ddd'
                    }}
                  >
                    {item.category === 'frame' && '🖼️'}
                    {item.category === 'theme' && '🎨'}
                    {item.category === 'title' && '👑'}
                  </div>
                  <Badge className={getRarityColor(item.rarity)}>
                    {item.rarity}
                  </Badge>
                </div>
                <CardTitle className="text-lg">
                  {language === 'sv' ? item.nameSv : item.name}
                </CardTitle>
                <CardDescription className="text-sm">
                  {language === 'sv' ? item.descriptionSv : item.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="h-4 w-4 text-yellow-600" />
                    <span className="text-sm">{item.price} {t('credits', language)}</span>
                  </div>
                  
                  {!purchased ? (
                    <Button
                      onClick={() => handlePurchase(item)}
                      disabled={purchasing === item.id || userProfile.credits < item.price}
                      size="sm"
                      className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white"
                    >
                      {purchasing === item.id 
                        ? '...' 
                        : t('purchase', language)}
                    </Button>
                  ) : equipped ? (
                    <Badge className="bg-green-500">
                      <Check className="h-3 w-3 mr-1" />
                      {t('equipped', language)}
                    </Badge>
                  ) : (
                    <Button
                      onClick={() => handleEquip(item)}
                      disabled={equipping === item.id}
                      size="sm"
                      variant="outline"
                    >
                      {equipping === item.id 
                        ? '...' 
                        : t('equip', language)}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-slate-900 text-4xl mb-2">{t('itemShop', language)}</h2>
        <p className="text-slate-600 mb-4">{t('shopDescription', language)}</p>
        <div className="flex items-center gap-2">
          <ShoppingBag className="h-5 w-5 text-yellow-600" />
          <span className="text-lg">{t('yourCredits', language)}: {userProfile.credits}</span>
        </div>
      </div>

      <Tabs defaultValue="frames" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="frames">{t('avatarFrames', language)}</TabsTrigger>
          <TabsTrigger value="themes">{t('themes', language)}</TabsTrigger>
          <TabsTrigger value="titles">{t('titles', language)}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="frames">
          {renderItems(getItemsByCategory('frame'))}
        </TabsContent>
        
        <TabsContent value="themes">
          {renderItems(getItemsByCategory('theme'))}
        </TabsContent>
        
        <TabsContent value="titles">
          {renderItems(getItemsByCategory('title'))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
