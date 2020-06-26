import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

enum EmitStrategy {
  onSelect = 'onSelect',
  onUpload = 'onUpload',
}

@Component({
  selector: 'soma-file-upload',
  templateUrl: './soma-file-upload.component.html',
  styleUrls: ['./soma-file-upload.component.scss'],
})
export class SomaFileUploadComponent implements OnInit {


  @Input() emitOn: EmitStrategy = EmitStrategy.onUpload;
  @Input() title: string;
  @Input() filesTypesAccepted: string;
  @Input() maxFileSize: number;
  @Input() chooseLabel: string = 'Selecionar Arquivo';
  @Input() uploadLabel: string = 'Enviar';
  @Input() uploadProgress: number;
  @Input() arquivoPadrao: any;
  @Input() request: Observable<any>;
  @Output() uploadProgressChange: EventEmitter<FormData> = new EventEmitter();
  @Output() uploadEvent: EventEmitter<FormData> = new EventEmitter();
  @Output() vincularEvent: EventEmitter<any> = new EventEmitter();

  // opcional
  @Input() required: boolean = false;

  isEmpty: boolean = true;
  showUploadButton: boolean = true;

  ngOnInit () {
    this.showUploadButton = this.emitOn === EmitStrategy.onUpload;
  }

  uploadHandler(event) {
    this.disparaEvent(event);
  }

  onSelectFile(event) {
    if (this.emitOn === EmitStrategy.onSelect) {
      this.disparaEvent(event);
    }
  }

  onRemoveFile(value) {

    if (this.emitOn === EmitStrategy.onUpload) {
      this.showUploadButton = true;
    } else {
      this.uploadEvent.emit(value);
    }

    this.uploadProgressChange.emit(value);
  }

  disparaEvent(event) {
    const formData = new FormData();
    formData.append('arquivo[]', event.files[0]);
    this.uploadEvent.emit(formData);
  }

  visualizar() {
    this.request.subscribe();
  }
}
