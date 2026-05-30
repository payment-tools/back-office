import { Route } from '@angular/router';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';
import { InitialDataResolver } from 'app/app.resolvers';

export const appRoutes: Route[] = [

    { path: '', pathMatch: 'full', redirectTo: 'enterprises/new' },

    // Auth routes for guests
    {
        path: '',
        canMatch: [NoAuthGuard],
        component: LayoutComponent,
        data: { layout: 'empty' },
        children: [
            { path: 'confirmation-required', loadChildren: () => import('app/modules/auth/confirmation-required/confirmation-required.module').then(m => m.AuthConfirmationRequiredModule) },
            { path: 'forgot-password',       loadChildren: () => import('app/modules/auth/forgot-password/forgot-password.module').then(m => m.AuthForgotPasswordModule) },
            { path: 'reset-password',        loadChildren: () => import('app/modules/auth/reset-password/reset-password.module').then(m => m.AuthResetPasswordModule) },
            { path: 'sign-in',               loadChildren: () => import('app/modules/auth/sign-in/sign-in.module').then(m => m.AuthSignInModule) },
            { path: 'sign-up',               loadChildren: () => import('app/modules/auth/sign-up/sign-up.module').then(m => m.AuthSignUpModule) },
        ]
    },

    // Auth routes for authenticated users
    {
        path: '',
        canMatch: [AuthGuard],
        component: LayoutComponent,
        data: { layout: 'empty' },
        children: [
            { path: 'sign-out',       loadChildren: () => import('app/modules/auth/sign-out/sign-out.module').then(m => m.AuthSignOutModule) },
            { path: 'unlock-session', loadChildren: () => import('app/modules/auth/unlock-session/unlock-session.module').then(m => m.AuthUnlockSessionModule) },
        ]
    },

    // OnePay routes
    {
        path: '',
        canMatch: [AuthGuard],
        component: LayoutComponent,
        resolve: { initialData: InitialDataResolver },
        children: [

            // Entreprises
            {
                path: 'enterprises', children: [
                    { path: 'new', loadChildren: () => import('app/onepay/add-enterprise-form/add-enterprise-form.module').then(m => m.AddEnterpriseFormModule) },
                ]
            },

            // Commerces (Sales)
            {
                path: 'sales', children: [
                    { path: 'new', loadChildren: () => import('app/onepay/add-sales-form/add-sales-form.module').then(m => m.AddSalesFormModule) },
                ]
            },

            // Partenariats
            {
                path: 'partnerships', children: [
                    { path: 'new', loadChildren: () => import('app/onepay/add-partnership-form/add-partnership-form.module').then(m => m.AddPartnershipFormModule) },
                ]
            },

            // Profils
            {
                path: 'profiles', children: [
                    {
                        path: 'enterprise', children: [
                            { path: 'new', loadChildren: () => import('app/onepay/add-enterprise-profile-form/add-enterprise-profile-form.module').then(m => m.AddEnterpriseProfileFormModule) },
                        ]
                    },
                    {
                        path: 'sales', children: [
                            { path: 'new', loadChildren: () => import('app/onepay/add-sales-profile-form/add-sales-profile-form.module').then(m => m.AddSalesProfileFormModule) },
                        ]
                    },
                ]
            },

            // Configurations
            {
                path: 'configurations', children: [
                    {
                        path: 'enterprise', children: [
                            { path: 'new', loadChildren: () => import('app/onepay/add-enterprise-configuration-form/add-enterprise-configuration-form.module').then(m => m.AddEnterpriseConfigurationFormModule) },
                        ]
                    },
                    {
                        path: 'sales', children: [
                            { path: 'new', loadChildren: () => import('app/onepay/add-sales-configuration-form/add-sales-configuration-form.module').then(m => m.AddSalesConfigurationFormModule) },
                        ]
                    },
                ]
            },

            // Administrateurs
            {
                path: 'admins', children: [
                    { path: 'new', loadChildren: () => import('app/onepay/admin-form/admin-form.module').then(m => m.AdminFormModule) },
                ]
            },

            // 404
            { path: '404-not-found', pathMatch: 'full', loadChildren: () => import('app/modules/admin/pages/error/error-404/error-404.module').then(m => m.Error404Module) },
            { path: '**', redirectTo: '404-not-found' }
        ]
    }
];