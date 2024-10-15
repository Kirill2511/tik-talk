import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProfileCardComponent } from './common-ui/profile-card/profile-card.component';
import { ProfileService } from './data/services/profile-service';
import { JsonPipe } from '@angular/common';

@Component({
  standalone: true,
  imports: [RouterModule, ProfileCardComponent, JsonPipe],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  profileService = inject(ProfileService);
  profiles: any = [];

  constructor() {
    this.profileService.getTestAccounts().subscribe((value) => {
      this.profiles = value;
    });
  }
}
