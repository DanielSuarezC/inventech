import { Injectable, signal } from '@angular/core';
import { Session, User } from '@supabase/supabase-js';
import { SupabaseService } from '../supabase/supabase.service';

export interface AuthResult {
  success: boolean;
  error?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly _session = signal<Session | null>(null);
  private readonly _loading = signal<boolean>(true);

  readonly session = this._session.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly user = signal<User | null>(null);

  constructor(private readonly supabase: SupabaseService) {
    this.supabase.client.auth.getSession().then(({ data }) => {
      this._session.set(data.session);
      this.user.set(data.session?.user ?? null);
      this._loading.set(false);
    });

    this.supabase.client.auth.onAuthStateChange((_event, session) => {
      this._session.set(session);
      this.user.set(session?.user ?? null);
    });
  }

  isAuthenticated(): boolean {
    return this._session() !== null;
  }

  async signUp(email: string, password: string, fullName: string): Promise<AuthResult> {
    const { error } = await this.supabase.client.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    });
    return error ? { success: false, error: error.message } : { success: true };
  }

  async signIn(email: string, password: string): Promise<AuthResult> {
    const { error } = await this.supabase.client.auth.signInWithPassword({ email, password });
    return error ? { success: false, error: error.message } : { success: true };
  }

  async signOut(): Promise<void> {
    await this.supabase.client.auth.signOut();
  }

  async resetPassword(email: string): Promise<AuthResult> {
    const { error } = await this.supabase.client.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/acceso/restablecer`,
    });
    return error ? { success: false, error: error.message } : { success: true };
  }

  async updatePassword(newPassword: string): Promise<AuthResult> {
    const { error } = await this.supabase.client.auth.updateUser({ password: newPassword });
    return error ? { success: false, error: error.message } : { success: true };
  }
}
