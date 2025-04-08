import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { TodoAppComponent } from './components/todo_app/todo_app.component';
import { ToastrModule } from 'ngx-toastr';
import { SimpleCalculatorComponent } from './components/simple_calculator/simple_calculator.component';
import { ContactListComponent } from './components/contact_list/contact_list.component';
import { HttpClientModule } from '@angular/common/http';
import { WeatherAppComponent } from './components/weather_app/weather_app.component';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './components/form/register/register.component';
import { LoginComponent } from './components/form/login/login.component';
import { GuessNumberComponent } from './components/guess-number/guess_number.component';
import { MemoryComponent } from './components/memory_card_games/memory.component';
import { MazeComponent } from './components/maze_runner/maze.component';
import { CaroChessComponent } from './components/caro_chess/caro_chess.component';
import { SnakeGameComponent } from './components/snake_games/snake_game.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoAppComponent,
    SimpleCalculatorComponent,
    ContactListComponent,
    WeatherAppComponent,
    RegisterComponent,
    LoginComponent,
    GuessNumberComponent,
    MemoryComponent,
    MazeComponent,
    CaroChessComponent,
    SnakeGameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
