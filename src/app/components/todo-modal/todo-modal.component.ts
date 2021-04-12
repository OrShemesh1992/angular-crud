import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TodoListService} from '../../services/todo-list.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-todo-modal',
  templateUrl: './todo-modal.component.html',
  styleUrls: ['./todo-modal.component.css']
})
export class TodoModalComponent implements OnInit {

  @Input() todoItem;
  public form: FormGroup;
  public title: string;

  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder, private todoListService: TodoListService, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.initForm();
    this.initModalTitle();
  }

  public async createOrUpdateTodoItem() {
    try {
      const formData = this.form.value;
      delete formData.id;
      if (this.todoItem) {
        const res = await this.todoListService.updateTodoItem(formData, this.todoItem.id);
        res ? this.toastr.success('Update successfully!', '') : this.toastr.error('Please try again', 'Error');
        this.activeModal.close();
      } else {
        const res = await this.todoListService.createTodoItem(formData);
        res ? this.toastr.success('Save successfully!', '') : this.toastr.error('Please try again', 'Error');
        this.activeModal.close();
      }
    } catch (e) {
      this.toastr.error('Something went wrong, please try again', 'oops...');
    }
  }

  private initForm() {
    this.form = this.fb.group({
      id: [''],
      name: ['', Validators.required]
    });

    if (this.todoItem) {
      this.form.patchValue(this.todoItem);
    }
  }

  private initModalTitle() {
    this.title = this.todoItem ? 'Edit Todo Item' : 'New Todo Item';
  }
}
