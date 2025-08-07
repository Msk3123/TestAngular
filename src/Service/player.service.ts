import {Injectable, signal} from '@angular/core';


export interface Player{
    firstName: string;
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
}