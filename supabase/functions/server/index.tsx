import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import { logger } from 'npm:hono/logger';
import { createClient } from 'jsr:@supabase/supabase-js@2';
import * as kv from './kv_store.tsx';

const app = new Hono();

app.use('*', cors());
app.use('*', logger(console.log));

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

// Sign up with email
app.post('/make-server-27bf9193/signup', async (c) => {
  try {
    const { email, password, name } = await c.req.json();

    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name },
      email_confirm: true // Auto-confirm since email server not configured
    });

    if (error) {
      console.log('Signup error:', error);
      return c.json({ error: error.message }, 400);
    }

    // Initialize user profile
    await kv.set(`user:${data.user.id}:profile`, {
      xp: 0,
      level: 1,
      credits: 0,
      streak: 0,
      gamesPlayed: 0,
      correctAnswers: 0,
      achievements: [],
      purchasedItems: [],
      equippedItems: {
        frame: null,
        theme: null,
        title: null
      }
    });

    return c.json({ success: true, user: data.user });
  } catch (error) {
    console.log('Server error during signup:', error);
    return c.json({ error: 'Server error during signup' }, 500);
  }
});

// Get user profile
app.get('/make-server-27bf9193/profile', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    if (!accessToken) {
      return c.json({ error: 'No access token' }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    if (error || !user) {
      console.log('Auth error while getting profile:', error);
      return c.json({ error: 'Unauthorized' }, 401);
    }

    let profile = await kv.get(`user:${user.id}:profile`);
    
    // Initialize profile if it doesn't exist
    if (!profile) {
      profile = {
        xp: 0,
        level: 1,
        credits: 0,
        streak: 0,
        gamesPlayed: 0,
        correctAnswers: 0,
        achievements: [],
        purchasedItems: [],
        equippedItems: {
          frame: null,
          theme: null,
          title: null
        }
      };
      await kv.set(`user:${user.id}:profile`, profile);
    }

    return c.json({ profile, user: { id: user.id, email: user.email, name: user.user_metadata.name } });
  } catch (error) {
    console.log('Server error while getting profile:', error);
    return c.json({ error: 'Server error' }, 500);
  }
});

// Update user profile
app.post('/make-server-27bf9193/profile', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    if (!accessToken) {
      return c.json({ error: 'No access token' }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    if (error || !user) {
      console.log('Auth error while updating profile:', error);
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const updates = await c.req.json();
    const currentProfile = await kv.get(`user:${user.id}:profile`) || {
      xp: 0,
      level: 1,
      credits: 0,
      streak: 0,
      gamesPlayed: 0,
      correctAnswers: 0,
      achievements: [],
      purchasedItems: [],
      equippedItems: { frame: null, theme: null, title: null }
    };

    const updatedProfile = { ...currentProfile, ...updates };
    await kv.set(`user:${user.id}:profile`, updatedProfile);

    return c.json({ profile: updatedProfile });
  } catch (error) {
    console.log('Server error while updating profile:', error);
    return c.json({ error: 'Server error' }, 500);
  }
});

// Purchase item
app.post('/make-server-27bf9193/purchase', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    if (!accessToken) {
      return c.json({ error: 'No access token' }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    if (error || !user) {
      console.log('Auth error while purchasing item:', error);
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const { itemId, price } = await c.req.json();
    const profile = await kv.get(`user:${user.id}:profile`);

    if (!profile) {
      return c.json({ error: 'Profile not found' }, 404);
    }

    if (profile.credits < price) {
      return c.json({ error: 'Not enough credits' }, 400);
    }

    if (profile.purchasedItems.includes(itemId)) {
      return c.json({ error: 'Item already purchased' }, 400);
    }

    profile.credits -= price;
    profile.purchasedItems.push(itemId);

    await kv.set(`user:${user.id}:profile`, profile);

    return c.json({ success: true, profile });
  } catch (error) {
    console.log('Server error while purchasing item:', error);
    return c.json({ error: 'Server error' }, 500);
  }
});

// Equip item
app.post('/make-server-27bf9193/equip', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    if (!accessToken) {
      return c.json({ error: 'No access token' }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    if (error || !user) {
      console.log('Auth error while equipping item:', error);
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const { itemId, category } = await c.req.json();
    const profile = await kv.get(`user:${user.id}:profile`);

    if (!profile) {
      return c.json({ error: 'Profile not found' }, 404);
    }

    if (!profile.purchasedItems.includes(itemId)) {
      return c.json({ error: 'Item not purchased' }, 400);
    }

    profile.equippedItems[category] = itemId;
    await kv.set(`user:${user.id}:profile`, profile);

    return c.json({ success: true, profile });
  } catch (error) {
    console.log('Server error while equipping item:', error);
    return c.json({ error: 'Server error' }, 500);
  }
});

Deno.serve(app.fetch);
