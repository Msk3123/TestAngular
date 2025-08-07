import {Injectable, signal} from '@angular/core';

export interface Player{
    fistName: string;
    lastName: string;
    nickname: string;
    level: number;
    averageAccuracy: number;
}

@Injectable({
    providedIn: 'root'
})
export class PlayerService {
    private players = signal<Player[]>([]);
    private curentPlayer = signal<Player | null>(null);
    readonly allPlayers = this.players.asReadonly();
    readonly getCurrentPlayer = this.curentPlayer.asReadonly();

    addPlayer(player: Player): boolean {
        this.players.set([...this.players(), player]);
        this.curentPlayer.set(player);
        return true;
    }

    isNicknameExists(nickname: string): boolean {
        return this.players().some(player => player.nickname === nickname);
    }
    
    updatatePlayerStats(level: number, averageAccuracy: number): void {
        const currentPlayer = this.getCurrentPlayer();
        if (currentPlayer) {
            const updatedPlayer: Player = {
                ...currentPlayer,
                level: level,
                averageAccuracy: averageAccuracy
            };
            this.players.set(this.players().map(player => 
                player.nickname === currentPlayer.nickname ? updatedPlayer : player
            ));
            this.curentPlayer.set(updatedPlayer);
        }
    }
}