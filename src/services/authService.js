import { supabase, isSupabaseConfigured } from './supabaseClient';

export const authService = {
  // Current user state fallback for seed demo mode
  currentUser: {
    id: 'admin-user-001',
    email: 'admin@tejasandcompany.in',
    full_name: 'Administrator',
    role: 'SUPER_ADMIN',
    department: 'Executive'
  },

  async login(email, password) {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      return data;
    }
    // Fallback seed mode
    return { user: this.currentUser, session: { access_token: 'demo-token-123' } };
  },

  async logout() {
    if (isSupabaseConfigured) {
      await supabase.auth.signOut();
    }
    return true;
  },

  async getCurrentUser() {
    if (isSupabaseConfigured) {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;
      const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();
      return profile || user;
    }
    return this.currentUser;
  }
};
