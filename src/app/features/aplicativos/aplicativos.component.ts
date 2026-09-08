import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { CardComponent } from '../../shared/ui/card/card.component';

@Component({
  selector: 'app-aplicativos',
  standalone: true,
  imports: [CommonModule, RouterLink, CardComponent],
  templateUrl: './aplicativos.component.html',
})
export class AplicativosComponent {
  constructor(readonly authService: AuthService) {}
}
