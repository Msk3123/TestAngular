import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PlayerService, Player } from '../../Service/player.service';
import { ScoresComponent } from '../Leaderboard/scores.component';

@Component({
    selector: 'app-registration',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, ScoresComponent],
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
    private playerService = inject(PlayerService);
    private fb = inject(FormBuilder);
    private router = inject(Router);

    fg: FormGroup;
    successMessage = signal<string>('');
    errorMessage = signal<string>('');

    constructor() {
        this.fg = this.fb.group({
            fistName: ['', [Validators.required, Validators.minLength(2)]],
            lastName: ['', [Validators.required, Validators.minLength(2)]],
            nickname: ['', [Validators.required, Validators.minLength(3)]]
        });
    }

    startGame(): void {
        if (this.fg.valid) {
            const formData = this.fg.value as {
                fistName: string;
                lastName: string;
                nickname: string;
            };

            if (this.playerService.isNicknameExists(formData.nickname)) {
                this.errorMessage.set('Упс! Цей нікнейм вже зайнятий. Спробуй щось більш креативне!');
                this.successMessage.set('');
                return;
            }

            const newPlayer: Player = {
                fistName: formData.fistName,
                lastName: formData.lastName,
                nickname: formData.nickname,
                level: 0,
                averageAccuracy: 0
            };

            this.playerService.addPlayer(newPlayer);

            this.successMessage.set('Вітаю! Ти готовий до гри! Зараз запускаємо...');
            this.errorMessage.set('');

            setTimeout(() => {
                this.router.navigate(['/game']);
            }, 1500);
        } else {
            this.errorMessage.set('Гей, заповни всі поля! Без цього не зможемо тебе зареєструвати 😊');
            this.successMessage.set('');
            this.markAllFieldsAsTouched();
        }
    }

    clear(): void {
        this.fg.reset();
        this.successMessage.set('');
        this.errorMessage.set('');
    }


    private markAllFieldsAsTouched(): void {
        Object.keys(this.fg.controls).forEach(key => {
            this.fg.get(key)?.markAsTouched();
        });
    }
}