import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { AdminGuard } from './guards/admin.guard';
import { NormalGuard } from './guards/normal.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { ViewCategoryComponent } from './pages/admin/view-category/view-category.component';
import { AddCategoryComponent } from './pages/admin/add-category/add-category.component';
import { ViewQuizComponent } from './pages/admin/view-quiz/view-quiz.component';

const routes: Routes = [
    {
        path:'',
        component:HomeComponent,
        pathMatch:'full'
    },
    {
        path: 'signup',
        component: SignupComponent,
        pathMatch: 'full',
    },
    {
        path: 'login',
        component: LoginComponent,
        pathMatch: 'full'
    },
    {
        path: 'admin',
        component: DashboardComponent,
        canActivate: [AdminGuard],
        children: [
            {
                path: '',
                component: WelcomeComponent,
            },
            {
                path: 'profile',
                component: ProfileComponent,
            },
            {
                path: 'categories',
                component: ViewCategoryComponent,
            },
            {
                path: 'add-category',
                component: AddCategoryComponent,
            },
            {
                path: 'quizzes',
                component: ViewQuizComponent,
            },
        ]
    },
    {
        path: 'user-dashboard',
        component: UserDashboardComponent,
        pathMatch: 'full',
        canActivate: [NormalGuard],
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
