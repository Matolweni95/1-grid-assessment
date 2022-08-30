import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../supabase.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  
})
export class AuthComponent {

  session = this.supabase.session

  constructor(private readonly supabase: SupabaseService) {}

  ngOnInit() {
    this.supabase.authChanges((_, session) => (this.session = session))
  }


  onclick(){
    this.supabase.signIn()
  }

  onclicks(){
    this.supabase.signOut()
  }
}
