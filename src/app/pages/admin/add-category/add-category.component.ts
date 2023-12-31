import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-add-category',
    templateUrl: './add-category.component.html',
    styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

    category = {
        title:'',
        description:''
    }
    constructor(private categoryService : CategoryService,private snack : MatSnackBar) { }

    ngOnInit(): void {
    }

    formSubmit() {
        if(this.category.title.trim() == '' || this.category.title == null) {
            this.snack.open("Title Required",'OK',{
                duration:2000
            });
            return;
        }
        this.categoryService.addCategory(this.category).subscribe({
            next: (data : any) => {
                this.category.title='';
                this.category.description='';
                Swal.fire("Success !!","Category Added Successfully",'success');
            },
            error: (error) => {
                Swal.fire("Error !!","Server Error !!","error");
            }
        })
    }

}