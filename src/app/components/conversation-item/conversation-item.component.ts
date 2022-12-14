import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/typings';

@Component({
  selector: 'app-conversation-item',
  templateUrl: './conversation-item.component.html',
  styleUrls: ['./conversation-item.component.scss'],
})
export class ConversationItemComponent implements OnInit {

  @Input() firstname?: string;
  @Input() lastname?: string;
  @Input() user?: User;


  constructor() { }

  ngOnInit() {}

}
