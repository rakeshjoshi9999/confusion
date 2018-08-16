import { Component, OnInit, Inject } from '@angular/core';
import { DishService } from '../services/dish.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { Dish } from '../shared/dish';


@Component({
  selector: 'app-dishdeatail',
  templateUrl: './dishdeatail.component.html',
  styleUrls: ['./dishdeatail.component.scss'],
  animations:[
    trigger('visibility',[
      state('shown',style({
        transform: 'scale(1.0)',
        opacity:1
      })),
      state('hidden',style({
        transform:'scale(0.5)',
        opacity:0
      })),
      transition('*=>*',animate('0.5s ease-in-out'))
    ])
  ]
})


export class DishdeatailComponent implements OnInit {

  dish : Dish;
  dishcopy = null;  
  dishIds: number[];
  dishservice: DishService;
  prev: number;
  next: number;
  comment:Comment;
  commentsForm: FormGroup;
  errMess:string;
  visibility = 'shown';

  constructor(private dishService: DishService,
  private route: ActivatedRoute,
  private location:Location,
  private foB: FormBuilder,
@Inject ('BaseURL') private BaseURL) 
{
  this.createForm();
 }

 createForm(){
   this.commentsForm = this.foB.group({
     author:['',[Validators.required,Validators.minLength(2),Validators.maxLength(25)]],
     rating:'5',
     comment:['',[Validators.required,Validators.minLength(2)]],
     date:new Date().toLocaleDateString()
   })
   this.commentsForm.valueChanges
   .subscribe(data => this.onValueChanged(data));

   this.onValueChanged();
 }

 onValueChanged(data?: any) {
  if (!this.commentsForm) { return; }
  const form = this.commentsForm;
  for (const field in this.formErrors) {
    // clear previous error message (if any)
    this.formErrors[field] = '';
    const control = form.get(field);
    if (control && control.dirty && !control.valid) {
      const messages = this.validationMessages[field];
      for (const key in control.errors) {
        this.formErrors[field] += messages[key] + ' ';
      }
    }
  }
}

formErrors = {
  'author': '',
  'comment': ''
};

validationMessages = {
  'author': {
    'required':      'Author Name is required.',
    'minlength':     'Author Name must be at least 2 characters long.',
    'maxlength':     'Author cannot be more than 25 characters long.'
  },
  'comment': {
    'required':      'Comment is required.',
    'minlength':     'Comment must be at least 2 characters long.'
  }
};

 ngOnInit() {
    this.dishService.getDishIds().subscribe(dishIds => {
      this.dishIds = dishIds;
    });
    this.route.params
      .switchMap((params: Params) => {
        this.visibility = 'hidden';
        return this.dishService.getDish(+params['id'])
      })
      .subscribe(dish => {
        this.dish = dish;
        this.dishcopy = dish;
        this.setPrevNext(dish.id);
        this.visibility = 'shown';
      },errmess => { this.dish = null; this.errMess = <any>errmess; });
  }

  setPrevNext(dishId: number): void {
    let index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[
      (this.dishIds.length + index - 1) % this.dishIds.length
    ];
    this.next = this.dishIds[
      (this.dishIds.length + index + 1) % this.dishIds.length
    ];
  }

  goBack(): void {
    this.location.back();
  }




  onSubmit():void {
    this.comment = this.commentsForm.value;
    this.dishcopy.comments.push(this.comment);
    this.dishcopy.save()
      .subscribe(dish => { this.dish = dish; console.log(this.dish); });
    // this.dish.comments.push(this.commentsForm.value);
    console.log(this.comment);
    this.commentsForm.reset({
      author: '',
      rating:'5',
      comment: ''
    });
  }

}
