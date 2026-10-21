import type { IDisposable } from '@univerjs/presets';
import type { Observable } from 'rxjs';
import { createIdentifier } from '@univerjs/presets';

export interface IURLService extends IDisposable {
    getParam: (key: string) => string | undefined;
    setParam: (key: string, value: string, useReplace?: boolean) => void;
    removeParam: (key: string, useReplace?: boolean) => void;
    readonly urlChange$: Observable<void>;
}

export const IURLService = createIdentifier<IURLService>('demo.custom-url-load.url-service');
