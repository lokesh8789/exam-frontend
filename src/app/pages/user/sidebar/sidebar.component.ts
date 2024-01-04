import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';

@Component({
    selector: 'app-sidebar-user',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

    categories;
    constructor(private category: CategoryService) { }

    ngOnInit(): void {
        this.category.categories().subscribe({
            next: (data:any)=>{
                this.categories=data;
            },
            error: (e)=>{
                console.log(e);
            }
        })
    }

}
