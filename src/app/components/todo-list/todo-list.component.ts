import {Component, OnInit} from '@angular/core';
import {TodoListService} from '../../services/todo-list.service';
import {TodoItem} from '../../interfaces/todo-item';
import {TodoModalComponent} from '../todo-modal/todo-modal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  public todoItems: TodoItem[] = [];

  constructor(private todoListService: TodoListService, private modalService: NgbModal, private spinner: NgxSpinnerService) {
  }

  ngOnInit(): void {
    this.getTodoListItems();
  }

  openTodoModal() {
    this.modalService.open(TodoModalComponent);
  }

  private getTodoListItems() {
    this.spinner.show();
    return this.todoListService.getTodoItems().subscribe((data: TodoItem[]) => {
      this.todoItems = data;
      this.spinner.hide();
    });
  }
}
