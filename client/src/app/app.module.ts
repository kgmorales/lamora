import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgBottomNavigationModule } from 'ng-bottom-navigation';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListComponent } from '@shared/components/list.component';
// import { AddTutorialComponent } from './features/recipes/components/search-recipe/search-recipe.component';
// import { TutorialDetailsComponent } from './features/recipes/components/tutorial-details/tutorial-details.component';
// import { TutorialsListComponent } from './features/recipes/components/tutorials-list/tutorials-list.component';
// import { SearchPipe } from './shared/pipes/search.pipe';

@NgModule({
  declarations: [AppComponent],
  providers: [],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    NgBottomNavigationModule,
    // SearchPipe,
    FontAwesomeModule,
    ListComponent,
  ],
})
export class AppModule {}
