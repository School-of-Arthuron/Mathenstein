import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Coins, Check, Lock } from 'lucide-react';
import { UserProfile, SHOP_ITEMS } from '../types/user';
import { Language, useTranslation } from '../utils/translations';
import { projectId } from '../utils/supabase/info';
import { createClient } from '../utils/supabase/client';
import { toast } from 'sonner@2.0.3';
import { getItemIcon } from '../utils/icons';

interface ShopProps {
  profile: UserProfile;
  language: Language;
  onProfileUpdate: (profile: UserProfile) => void;
}

export function Shop({ profile, language, onProfileUpdate }: ShopProps) {
  const t = useTranslation(language);
  const [loading, setLoading] = useState(false);

  const handlePurchase = async (itemId: string, price: number) => {
    if (profile.coins < price) {
      toast.error(t.notEnoughCoins);
      return;
    }

    setLoading(true);
    try {
      const { data: { session } } = await createClient().auth.getSession();
      
      if (!session) throw new Error('Not authenticated');

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-27bf9193/shop/purchase`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ itemId, price })
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Purchase failed');
      }

      const data = await response.json();
      onProfileUpdate(data.profile);
      toast.success(t.purchaseSuccess);
    } catch (error: any) {
      console.error('Purchase error:', error);
      toast.error(error.message || (language === 'sv' ? 'Något gick fel' : 'Something went wrong'));
    } finally {
      setLoading(false);
    }
  };

  const handleEquip = async (itemId: string, itemType: string) => {
    setLoading(true);
    try {
      const { data: { session } } = await createClient().auth.getSession();
      
      if (!session) throw new Error('Not authenticated');

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-27bf9193/shop/equip`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ itemId, itemType })
        }
      );

      if (!response.ok) {
        throw new Error('Equip failed');
      }

      const data = await response.json();
      onProfileUpdate(data.profile);
      toast.success(language === 'sv' ? 'Utrustades!' : 'Equipped!');
    } catch (error: any) {
      console.error('Equip error:', error);
      toast.error(error.message || (language === 'sv' ? 'Något gick fel' : 'Something went wrong'));
    } finally {
      setLoading(false);
    }
  };

  const isOwned = (itemId: string) => profile.ownedItems.includes(itemId);
  const isEquipped = (itemId: string) => Object.values(profile.equippedItems).includes(itemId);

  const renderItem = (item: typeof SHOP_ITEMS[0]) => {
    const owned = isOwned(item.id);
    const equipped = isEquipped(item.id);
    const itemIcon = getItemIcon(item.id);

    return (
      <Card key={item.id} className="hover:shadow-md transition-shadow">
        <CardHeader>
          <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${itemIcon.color} flex items-center justify-center mb-3`}>
            <itemIcon.icon className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-lg">
            {language === 'sv' ? item.nameSv : item.nameEn}
          </CardTitle>
          <CardDescription>
            {language === 'sv' ? item.descriptionSv : item.descriptionEn}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-amber-600">
              <Coins className="h-4 w-4" />
              <span>{item.price}</span>
            </div>

            {!owned ? (
              <Button
                size="sm"
                onClick={() => handlePurchase(item.id, item.price)}
                disabled={loading || profile.coins < item.price}
              >
                {profile.coins < item.price ? (
                  <><Lock className="h-3 w-3 mr-1" /> {t.buy}</>
                ) : (
                  t.buy
                )}
              </Button>
            ) : equipped ? (
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                <Check className="h-3 w-3 mr-1" />
                {t.equipped}
              </Badge>
            ) : (
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleEquip(item.id, item.type)}
                disabled={loading}
              >
                {t.equip}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl mb-2">{t.shopTitle}</h2>
        <p className="text-slate-600">{t.shopDesc}</p>
        <div className="flex items-center gap-2 mt-4 bg-amber-50 rounded-lg px-4 py-3 border border-amber-200 inline-flex">
          <Coins className="h-5 w-5 text-amber-600" />
          <span className="text-lg">{profile.coins} {t.coins}</span>
        </div>
      </div>

      <Tabs defaultValue="avatars" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="avatars">{t.avatars}</TabsTrigger>
          <TabsTrigger value="badges">{t.badges}</TabsTrigger>
          <TabsTrigger value="themes">{t.themes}</TabsTrigger>
        </TabsList>

        <TabsContent value="avatars">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SHOP_ITEMS.filter(item => item.type === 'avatar').map(renderItem)}
          </div>
        </TabsContent>

        <TabsContent value="badges">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SHOP_ITEMS.filter(item => item.type === 'badge').map(renderItem)}
          </div>
        </TabsContent>

        <TabsContent value="themes">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SHOP_ITEMS.filter(item => item.type === 'theme').map(renderItem)}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
