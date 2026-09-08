import { Injectable, signal, effect } from '@angular/core';
import { SupabaseService } from '../supabase/supabase.service';
import { AuthService } from '../auth/auth.service';

export interface UserProfile {
  id: string;
  fullName: string;
  role: 'user' | 'admin';
  createdAt: string;
}

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private readonly _profile = signal<UserProfile | null>(null);
  readonly profile = this._profile.asReadonly();

  constructor(
    private readonly supabase: SupabaseService,
    private readonly auth: AuthService
  ) {
    effect(async () => {
      const session = this.auth.session();
      if (session?.user) {
        await this.loadProfile(session.user.id);
      } else {
        this._profile.set(null);
      }
    });
  }

  isAdmin(): boolean {
    return this._profile()?.role === 'admin';
  }

  private async loadProfile(userId: string): Promise<void> {
    try {
      const { data, error } = await this.supabase.client
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;

      this._profile.set({
        id: data.id,
        fullName: data.full_name,
        role: data.role,
        createdAt: data.created_at,
      });
    } catch (error) {
      console.error('Error loading profile:', error);
      this._profile.set(null);
    }
  }
}
