import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { ProfileService } from '../../../core/services/profile.service';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { CardComponent } from '../../../shared/ui/card/card.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, ButtonComponent, CardComponent],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  constructor(
    readonly authService: AuthService,
    readonly profileService: ProfileService,
    private readonly router: Router
  ) {}

  async signOut(): Promise<void> {
    await this.authService.signOut();
    this.router.navigateByUrl('/');
  }
}
