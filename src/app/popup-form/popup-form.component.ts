import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Octokit } from 'octokit';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

interface Type {
  value: string;
  viewValue: string;
}

interface Client {
  value: string;
  viewValue: string;
}

interface Priority {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-popup-form',
  templateUrl: './popup-form.component.html',
  styleUrls: ['./popup-form.component.css']
})
export class PopupFormComponent implements OnInit {

  FormGroup!: FormGroup;
  selectedClient!: string;
  selectedPriority!: string;
  selectedType!: string;

  client: Client[] = [
    {value: 'cl-0', viewValue: 'C: Client ABC'},
    {value: 'cl-1', viewValue: 'C: Client XYZ'},
    {value: 'cl-2', viewValue: 'C: Client MNO'},

  ];

  priority: Priority[] = [
    {value: 'pl-0', viewValue: 'P: Low'},
    {value: 'pl-1', viewValue: 'P: Medium'},
    {value: 'pl-2', viewValue: 'P: High'},
 
  ];

  type: Type[] = [
    {value: 'tp-0', viewValue: 'T: Bug'},
    {value: 'tp-1', viewValue: 'T: Support'},
    {value: 'tp-2', viewValue: 'T: Enhancement'},
   
  ];

  constructor(private http: HttpClient, 
    private fb: FormBuilder,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
    ) 
    
    { 
    this.FormGroup = this.fb.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
      
      });
    }

  ngOnInit(): void {
  }

  async postdata(FormGroup: { value:{ title:any, body:any }}, _selectedClient: any, _selectedType: any, _selectedPriority:any)
  {

    const octokit = new Octokit({
      auth: environment.auth
    })

    const owner = environment.owner;

    try{
    await octokit.request('POST /repos/1-grid/GitIntegration/issues', {
      
      owner: 'OWNER',
      repo: 'REPO',
      headers: {
        "content-type": "application/json",
      },
      title: FormGroup.value.title,
      body: FormGroup.value.body,
      labels: [
      
      {name:this.selectedClient},
      {name:this.selectedPriority},
      {name:this.selectedType}
 
      ]
      
    })

    this.snackBar.open('Issue Successfuly added', 'Ok', {
      duration: 5000,
    });

  } catch(err){
    this.snackBar.open('Something went wrong', 'Ok', {
      duration: 5000,
    });
  }

    
  }

  close(){
    this.dialog.closeAll();
    window.location.reload();
  }


}
