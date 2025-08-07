import { Component, inject, signal, computed } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PlayerService, Player } from '../../Service/player.service';

@Component({
    selector: 'app-registration',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
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

    // Computed для топ гравців
    topPlayers = computed(() => {
        return this.playerService.allPlayers()
            .filter(player => player.level > 0) // Показуємо тільки тих, хто грав
            .sort((a, b) => {
                // Сортуємо за точністю, потім за рівнем
                if (b.averageAccuracy !== a.averageAccuracy) {
                    return b.averageAccuracy - a.averageAccuracy;
                }
                return b.level - a.level;
            })
            .slice(0, 10); // Показуємо топ 10
    });

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
                this.errorMessage.set('Нікнейм вже існує! Оберіть інший.');
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

            this.successMessage.set('Реєстрація успішна! Переходимо до гри...');
            this.errorMessage.set('');

            setTimeout(() => {
                this.router.navigate(['/game']);
            }, 1500);
        } else {
            this.errorMessage.set('Будь ласка, заповніть всі поля правильно!');
            this.successMessage.set('');
            this.markAllFieldsAsTouched();
        }
    }

    clear(): void {
        this.fg.reset();
        this.successMessage.set('');
        this.errorMessage.set('');
    }

    getMedal(index: number): string {
        const medals = ['🥇', '🥈', '🥉'];
        return medals[index] || '';
    }

    private markAllFieldsAsTouched(): void {
        Object.keys(this.fg.controls).forEach(key => {
            this.fg.get(key)?.markAsTouched();
        });
    }
}