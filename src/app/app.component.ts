import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
    @ViewChild('navbar') navbar: NavbarComponent;

    constructor(private renderer: Renderer2, private el: ElementRef) { }

    ngAfterViewInit() {
        if (this.navbar) {
            const navbarHeightVh = (this.navbar.getHeight() / window.innerHeight) * 100;

            const contentContainer = this.el.nativeElement.querySelector('.content-container');
            this.renderer.setStyle(contentContainer, 'height', `calc(100vh - ${navbarHeightVh}vh)`);
        }
    }
}
