import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PlayerService, Player } from '../../Service/player.service';

@Component({
    selector: 'app-registration',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './leaderbord.component.html',
    styleUrls: ['./leaderbord.component.css']
})

export class LeaderbordComponent {
    
    
    
}