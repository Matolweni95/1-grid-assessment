import { Component, Input, OnInit } from '@angular/core';
import { Profile, SupabaseService } from '../supabase.service'
import { Session } from '@supabase/supabase-js';
import { PopupFormComponent } from '../popup-form/popup-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {
  loading = false
  profile: Profile | undefined

  @Input() session: Session | undefined

  constructor(private readonly supabase: SupabaseService, public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(PopupFormComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  data:any = [];

  ngOnInit() {
    this.fetch()
  }

  counter(i: number) {
    return new Array(i);
}

  fetch(){
    this.supabase.getIssues()
    .subscribe((response: any)=> {
      this.data = response;
    });
  }

  async signOut() {
    await this.supabase.signOut()
  }
  

}
