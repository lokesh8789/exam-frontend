import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-view-category',
    templateUrl: './view-category.component.html',
    styleUrls: ['./view-category.component.css']
})
export class ViewCategoryComponent implements OnInit {

    categories = []
    constructor(private category : CategoryService) { }

    ngOnInit(): void {
        this.category.categories().subscribe({
            next: (data : any) => {
                this.categories = data;
            },
            error: (error) => {
                console.log("Category Error");
                Swal.fire("Error","",'error');
            }
        });
    }

}
