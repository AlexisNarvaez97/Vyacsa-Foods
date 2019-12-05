import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent implements OnInit {

  // tslint:disable-next-line: no-input-rename
  @Input('conceptos') conceptos;
  // tslint:disable-next-line: no-output-rename
  @Output('opcionSeleccionada') opcionSelect = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {}

  accion(evento) {
    const opcion = evento.detail.value;

    this.opcionSelect.emit(opcion);

    // console.log(evento.detail.value);
  }

}
