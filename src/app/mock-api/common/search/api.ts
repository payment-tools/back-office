import { Injectable } from '@angular/core';
import { cloneDeep } from 'lodash-es';
import { FuseNavigationItem, FuseNavigationService } from '@fuse/components/navigation';
import { FuseMockApiService } from '@fuse/lib/mock-api';
import { defaultNavigation } from 'app/mock-api/common/navigation/data';

@Injectable({
    providedIn: 'root'
})
export class SearchMockApi
{
    private readonly _defaultNavigation: FuseNavigationItem[] = defaultNavigation;

    constructor(
        private _fuseMockApiService: FuseMockApiService,
        private _fuseNavigationService: FuseNavigationService
    )
    {
        this.registerHandlers();
    }

    registerHandlers(): void
    {
        const flatNavigation = this._fuseNavigationService.getFlatNavigation(this._defaultNavigation);

        this._fuseMockApiService
            .onPost('api/common/search')
            .reply(({request}) => {

                const query = cloneDeep(request.body.query.toLowerCase());

                if ( query === '' )
                {
                    return [200, {results: []}];
                }

                const pagesResults = cloneDeep(flatNavigation)
                    .filter(page => (page.title?.toLowerCase().includes(query) || (page.subtitle && page.subtitle.includes(query))));

                const results = [];

                if ( pagesResults.length > 0 )
                {
                    pagesResults.forEach((result: any) => {
                        result.value = result.title;
                    });

                    results.push({
                        id     : 'pages',
                        label  : 'Pages',
                        results: pagesResults
                    });
                }

                return [200, results];
            });
    }
}