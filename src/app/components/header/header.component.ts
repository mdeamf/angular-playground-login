import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() subtitle: String; // Subtítulo para exibir no componente de cabeçalho.
  @Input() uranus = false; // Indica se deve exibir a imagem de Urano. Caso contrário, exibirá Saturno.

  constructor() { }

  ngOnInit(): void {
  }

}
