import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoAppComponent } from './components/todo_app/todo_app.component';
import { SimpleCalculatorComponent } from './components/simple_calculator/simple_calculator.component';
import { ContactListComponent } from './components/contact_list/contact_list.component';
import { WeatherAppComponent } from './components/weather_app/weather_app.component';
import { LoginComponent } from './components/form/login/login.component';
import { RegisterComponent } from './components/form/register/register.component';
import { GuessNumberComponent } from './components/guess-number/guess_number.component';
import { MemoryComponent } from './components/memory_card_games/memory.component';
import { MazeComponent } from './components/maze_runner/maze.component';
import { CaroChessComponent } from './components/caro_chess/caro_chess.component';
import { SnakeGameComponent } from './components/snake_games/snake_game.component';

const routes: Routes = [
  {
    component: TodoAppComponent,
    path: 'todo',
    title: 'todo-app'
  },
  {
    component: SimpleCalculatorComponent,
    path: 'SC',
    title: 'Simple_Calculator'
  },
  {
    component: ContactListComponent,
    path: 'contact',
    title: 'Contact_list'
  },
  {
    component: WeatherAppComponent,
    path: 'weather',
    title: 'weather_app'
  },
  {
    component: LoginComponent,
    path: 'login',
    title: 'login'
  },
  {
    component: RegisterComponent,
    path: 'register',
    title: 'register'
  },
  {
    component: GuessNumberComponent,
    path: 'guess',
    title: 'guess_number'
  },
  {
    component: MemoryComponent,
    path: 'memory',
    title: 'memory_card_games'
  },
  {
    component: MazeComponent,
    path: 'maze',
    title: 'maze_runner'
  },
  {
    component: CaroChessComponent,
    path: 'caro',
    title: 'caro_chess'
  },
  {
    component: SnakeGameComponent,
    path: 'snake',
    title: 'snake_game'
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
