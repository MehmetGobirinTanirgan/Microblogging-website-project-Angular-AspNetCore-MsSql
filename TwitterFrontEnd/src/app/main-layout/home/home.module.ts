import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { TweetEditorComponent } from './tweet-editor/tweet-editor.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgCircleProgressModule } from 'ng-circle-progress';

@NgModule({
  declarations: [HomeComponent, TweetEditorComponent],
  imports: [SharedModule, ReactiveFormsModule, NgCircleProgressModule],
})
export class HomeModule {}
