import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  public LinkHome: string = 'https://gestionmagnum.com/en/home/';
  public LinkGallery: string = 'https://gestionmagnum.com/en/gallery/';

  constructor() { }

  ngOnInit(): void {
  }

}
