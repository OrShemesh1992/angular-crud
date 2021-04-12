import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
import {TodoItem} from '../interfaces/todo-item';
import {NgxSpinnerService} from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {

  constructor(private firestore: AngularFirestore, private spinner: NgxSpinnerService) {
  }

  getTodoItems() {
    return this.firestore.collection('TodoList').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data: any = a.payload.doc.data();
          const id = a.payload.doc.id;
          this.spinner.hide();
          return {id, name: data.name};
        });
      })
    );
  }

  createTodoItem(todoItem: TodoItem) {
    this.spinner.show();
    return this.firestore.collection('TodoList').add(todoItem).then(() => this.spinner.hide());
  }

  updateTodoItem(todoItem: TodoItem, todoItemId: string) {
    this.spinner.show();
    return this.firestore.doc(`TodoList/${todoItemId}`).update(todoItem).then(() => this.spinner.hide());
  }

  deleteTodoItem(todoItemId: string) {
    this.spinner.show();
    return this.firestore.doc(`TodoList/${todoItemId}`).delete().then(() => this.spinner.hide());
  }
}
