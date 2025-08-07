import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PlayerService, Player } from '../../Service/player.service';
import { ScoresTableComponent } from '../Leaderboard/scores-table.component';
import { NameFieldsComponent } from '../name-fields/name-fields.component';
import { MessageComponent } from '../message/message.component';

@Component({
    selector: 'app-registration',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, ScoresTableComponent, NameFieldsComponent, MessageComponent],
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
            nameFields: ['', [Validators.required, Validators.minLength(5)]],
            nickName: ['', [Validators.required, Validators.minLength(3)]]
        });
    }

    StartGame(): void {
        if (this.fg.valid) {
            const formData = this.fg.value as {
                nameFields: string;
                nickName: string;
            };

            if (this.playerService.isNicknameExists(formData.nickName)) {
                this.errorMessage.set('Упс! Цей нікнейм вже зайнятий. Спробуй щось більш креативне!');
                this.successMessage.set('');
                return;
            }

            const names = formData.nameFields.split(' ');
            const newPlayer: Player = {
                fistName: names[0] || '',
                lastName: names.slice(1).join(' ') || '',
                nickname: formData.nickName,
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