import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { NgProgress } from 'ngx-progressbar';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public path = '';

  @Output() click: EventEmitter<any> = new EventEmitter();
  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe((res) => {
      if (this.router.url === '/' || this.router.url === '/current') {
        console.log(this.router.url);
        this.path = '/current';
      } else {
        console.log(this.router.url);
        this.path = this.router.url;
      }
    });
  }

  onClick(path) {
    this.path = path;
    this.router.navigate([path]);
    this.click.emit();
  }

}
