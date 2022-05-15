import { Component,TemplateRef } from '@angular/core';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Hospitalclient';
  closeResult = '';
 constructor(private modalService: NgbModal){}
 
}
