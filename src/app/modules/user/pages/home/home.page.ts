import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  noteForm: FormGroup;
  constructor(
    private formBuilder:FormBuilder,
  ) { }

  ngOnInit() {
    this.noteForm = this.formBuilder.group({
      title: [''],
      note: [''],
      pinNote: [Boolean]
    })
  }

}
