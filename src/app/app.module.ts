import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { UserTableComponent } from './user-table/user-table.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { CustomSelectComponent } from './custom-select/custom-select.component';
import { UsersPageComponent } from './users-page/users-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PostsChartComponent } from './posts-chart/posts-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    UserTableComponent,
    UserDetailsComponent,
    CustomSelectComponent,
    UsersPageComponent,
    PageNotFoundComponent,
    PostsChartComponent,
  ],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
