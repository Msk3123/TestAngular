import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerService, Player } from '../../Service/player.service';

@Component({
    selector: 'app-scores-table',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './scores-table.component.html',
    styleUrls: ['./scores-table.component.css']
})
export class ScoresTableComponent {
    private playerService = inject(PlayerService);

    allPlayers = computed(() => {
        return this.playerService.allPlayers()
            .sort((a, b) => a.nickname.localeCompare(b.nickname));
    });
}
