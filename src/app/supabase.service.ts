import { Injectable } from '@angular/core';
import {
  AuthChangeEvent,
  createClient,
  Session,
  SupabaseClient,
} from '@supabase/supabase-js';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment'

export interface Profile {
  username: string
  website: string
  avatar_url: string
}

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient

  constructor( private http: HttpClient) {
    this.supabase = createClient(
      environment.superbaseUrl,
      environment.sperbaseKey,
      
    )
  }

  private baseUrl = environment.baseUrl;
  
  getIssues() {
    return this.http.get(this.baseUrl)
  }

  get user() {
    return this.supabase.auth.user()
  }

  get session() {
    return this.supabase.auth.session()
  }

  fetchData(){
    console.log(environment.baseUrl)
    return environment.baseUrl;
  
  }


  authChanges(
    callback: (event: AuthChangeEvent, session: Session | null) => void
  ) {
    return this.supabase.auth.onAuthStateChange(callback)
  }

  async signIn() {
    const { user, session, error } = await this.supabase.auth.signIn({
      provider: 'github',
    })
  }

  async signOut() {
    const { error } = await this.supabase.auth.signOut()
  }
  

}
