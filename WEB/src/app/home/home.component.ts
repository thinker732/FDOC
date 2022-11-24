import { Component, OnInit,Input} from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})


export class HomeComponent implements OnInit {

  research=false
  doctors2=[
    {
      "_id": "60b64cc45ec5f18bf5ae97b3",
      "name": "savitar",
      "email": "baedsavitar1@gmail.com",
      "specialite":"ophtamologue",
      "lieu":"logbessou",
      "service":"clinique saint paul",
      "precision":"IUC",
      "createdAt": "2021-06-01T15:05:40.659Z",
      "updatedAt": "2021-06-01T15:05:40.681Z",
      "__v": 1
  }
  ]

  doctors=[
    
{
    "_id": "60b64cc45ec5f18bf5ae97b3",
    "name": "Landry George",
    "email": "baedsavitar1@gmail.com",
    "specialite":"ophtamologue",
    "lieu":"logbessou",
    "service":"clinique saint paul",
    "precision":"IUC",
    "createdAt": "2021-06-01T15:05:40.659Z",
    "updatedAt": "2021-06-01T15:05:40.681Z",
    "__v": 1
},
{
  "_id": "60b64cc45ec5f18bf5ae97b3",
  "name": "Jean  Francois",
  "email": "jfdoctor@gmail.com",
  "specialite":"dentiste",
  "lieu":"logbessou",
  "service":"clinique saint paul",
  "precision":"IUC",
  "createdAt": "2021-06-01T15:05:40.659Z",
  "updatedAt": "2021-06-01T15:05:40.681Z",
  "__v": 1
},
{
  "_id": "60b64cc45ec5f18bf5ae97b3",
  "name": "Jean claude",
  "email": "doctortheking@gmail.com",
  "specialite":"dentiste",
  "lieu":"Makepe",
  "service":"Hopital st Tropez",
  "precision":"face marché",
  "createdAt": "2021-06-01T15:05:40.659Z",
  "updatedAt": "2021-06-01T15:05:40.681Z",
  "__v": 1
},
{
  "_id": "60b64cc45ec5f18bf5ae97b3",
  "name": "Lionel kevin",
  "email": "doctorfamous@gmail.com",
  "specialite":"chirugien",
  "lieu":"Village",
  "service":"clinique saint Jean",
  "precision":" ",
  "createdAt": "2021-06-01T15:05:40.659Z",
  "updatedAt": "2021-06-01T15:05:40.681Z",
  "__v": 1
},
  ]

speciality:string=" ";


  getfromserver(){
    this.httpClient
      .get<any[]>('http://localhost:3000/doctors')
      .subscribe(
       (response) => {
         this.doctors = response;
       },
       (error) => {
         console.log('Erreur ! : ' + error);
       }
     );
 }


  onSearch() {
    this.research=false
    let locality="logbessou"

      
     this.doctors2=this.doctors.filter(doc=>doc.specialite===this.speciality.toLocaleLowerCase().trim())
     
     console.log(this.speciality)
      console.log(this.doctors2)
     console.log(this.doctors)
  }

  ngOnInit(): void {
    this.research=true
  }

}
