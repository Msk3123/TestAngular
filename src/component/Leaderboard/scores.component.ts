import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerService, Player } from '../../Service/player.service';

@Component({
    selector: 'app-scores',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './scores.component.html',
    styleUrls: ['./scores.component.css']
})
export class ScoresComponent {
    private playerService = inject(PlayerService);

    allPlayers = computed(() => {
        return this.playerService.allPlayers()
            .sort((a, b) => a.nickname.localeCompare(b.nickname));
    });
}
