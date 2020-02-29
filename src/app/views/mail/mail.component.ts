import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Mail} from "../../model/Mail";
import {DataService} from "../../services/data.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.css']
})
export class MailComponent implements OnInit {

  constructor(private dataService: DataService) {
  }

  messageSuccess = '';
  messageError = '';
  isSending = false;
  messageSent = false;

  ngOnInit() {
  }

  public mailForm: FormGroup = new FormGroup({
    mailFrom: new FormControl(''),
    mailSubject: new FormControl(''),
    mailContent: new FormControl('')
  });

  sendMail() {
    this.clearMessages();
    this.isSending = true;
    const mail = new Mail();
    mail.to = 'examples123.dk@gmail.com';
    mail.replyTo = this.mailForm.get('mailFrom').value;
    mail.from = this.mailForm.get('mailFrom').value;
    mail.subject = this.mailForm.get('mailSubject').value;
    mail.content = this.mailForm.get('mailContent').value;
    this.dataService.sendMail(mail).subscribe(
      mail => {
        this.messageSuccess = 'Pomyślnie wysłano wiadomość';
        this.isSending = false;
        this.messageSent = true;
      }, error => {
        this.messageError = 'Nieoczekiwany bład podczas wysyłania wiadomości';
        this.isSending = false;
        this.messageSent = true;
      }
    );
  }

  clearMessages() {
    this.messageSuccess = '';
    this.messageError = '';
  }


}
