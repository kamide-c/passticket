import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SafePipe} from "./safe.pipe";



@NgModule({
  exports: [
    SafePipe
  ],
  declarations: [
    SafePipe
  ],
  imports: [
    CommonModule
  ]
})
export class SafeModule { }
