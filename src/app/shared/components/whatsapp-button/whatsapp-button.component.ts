import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-whatsapp-button',
  templateUrl: './whatsapp-button.component.html',
  styleUrls: ['./whatsapp-button.component.scss'],
})
export class WhatsappButtonComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  goToWhatsapp(): void {
    window.open('https://api.whatsapp.com/send?phone=+5511978689779', '_blank');
  }
}
