import {Component, Input, OnInit} from '@angular/core';
import {TodoItem} from '../../interfaces/todo-item';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TodoModalComponent} from '../todo-modal/todo-modal.component';
import {TodoListService} from '../../services/todo-list.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  @Input() todoItem: TodoItem;

  constructor(private modalService: NgbModal, private todoListService: TodoListService, private toastr: ToastrService) {
  }

  ngOnInit(): void {
  }

  public openTodoModal(data) {
    const modalRef = this.modalService.open(TodoModalComponent);
    modalRef.componentInstance.todoItem = data;
  }

  public async deleteTodo(todoItemId: string) {
    try {
      const res = await this.todoListService.deleteTodoItem(todoItemId);
      res ? this.toastr.success('Delete successfully!', '') : this.toastr.error('Please try again', 'Error');
    } catch (e) {
      this.toastr.error('Something went wrong, please try again', 'oops...');
    }
  }
}
