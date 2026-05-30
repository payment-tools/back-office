/* eslint-disable */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id      : 'gestion',
        type    : 'group',
        title   : 'Gestion',
        children: [
            {
                id   : 'enterprises',
                title: 'Entreprises',
                type : 'basic',
                icon : 'heroicons_outline:office-building',
                link : '/enterprises/new'
            },
            {
                id   : 'sales',
                title: 'Commerces',
                type : 'basic',
                icon : 'heroicons_outline:shopping-bag',
                link : '/sales/new'
            },
            {
                id   : 'partnerships',
                title: 'Partenariats',
                type : 'basic',
                icon : 'heroicons_outline:link',
                link : '/partnerships/new'
            },
        ]
    },
    {
        id      : 'profils',
        type    : 'group',
        title   : 'Profils',
        children: [
            {
                id   : 'profiles.enterprise',
                title: 'Profil Entreprise',
                type : 'basic',
                icon : 'heroicons_outline:user',
                link : '/profiles/enterprise/new'
            },
            {
                id   : 'profiles.sales',
                title: 'Profil Commerce',
                type : 'basic',
                icon : 'heroicons_outline:user',
                link : '/profiles/sales/new'
            },
            {
                id   : 'admins',
                title: 'Administrateurs',
                type : 'basic',
                icon : 'heroicons_outline:shield-check',
                link : '/admins/new'
            },
        ]
    },
    {
        id      : 'configurations',
        type    : 'group',
        title   : 'Configurations',
        children: [
            {
                id   : 'configurations.enterprise',
                title: 'Config. Entreprise',
                type : 'basic',
                icon : 'heroicons_outline:cog',
                link : '/configurations/enterprise/new'
            },
            {
                id   : 'configurations.sales',
                title: 'Config. Commerce',
                type : 'basic',
                icon : 'heroicons_outline:adjustments',
                link : '/configurations/sales/new'
            },
        ]
    },
];

export const compactNavigation: FuseNavigationItem[] = [
    {
        id      : 'gestion',
        title   : 'Gestion',
        tooltip : 'Gestion',
        type    : 'aside',
        icon    : 'heroicons_outline:office-building',
        children: []
    },
    {
        id      : 'profils',
        title   : 'Profils',
        tooltip : 'Profils',
        type    : 'aside',
        icon    : 'heroicons_outline:users',
        children: []
    },
    {
        id      : 'configurations',
        title   : 'Configurations',
        tooltip : 'Configurations',
        type    : 'aside',
        icon    : 'heroicons_outline:cog',
        children: []
    },
];

export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id      : 'gestion',
        title   : 'GESTION',
        type    : 'group',
        children: []
    },
    {
        id      : 'profils',
        title   : 'PROFILS',
        type    : 'group',
        children: []
    },
    {
        id      : 'configurations',
        title   : 'CONFIGURATIONS',
        type    : 'group',
        children: []
    },
];

export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id      : 'gestion',
        title   : 'Gestion',
        type    : 'group',
        icon    : 'heroicons_outline:office-building',
        children: []
    },
    {
        id      : 'profils',
        title   : 'Profils',
        type    : 'group',
        icon    : 'heroicons_outline:users',
        children: []
    },
    {
        id      : 'configurations',
        title   : 'Configurations',
        type    : 'group',
        icon    : 'heroicons_outline:cog',
        children: []
    },
];