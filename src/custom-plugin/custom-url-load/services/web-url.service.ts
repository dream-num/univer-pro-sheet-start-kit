import { RxDisposable } from '@univerjs/presets';
import { fromEvent, map, shareReplay, takeUntil } from 'rxjs';
import type { IURLService } from './url.service';

export class WebURLService extends RxDisposable implements IURLService {
    readonly urlChange$ = fromEvent(window, 'popstate').pipe(
        map(() => undefined),
        takeUntil(this.dispose$),
        shareReplay({ bufferSize: 1, refCount: true })
    );

    getParam(key: string): string | undefined {
        return new URL(window.location.href).searchParams.get(key) ?? undefined;
    }

    setParam(key: string, value: string, useReplace = false): void {
        const url = new URL(window.location.href);
        url.searchParams.set(key, value);
        this._updateUrl(url, useReplace);
    }

    removeParam(key: string, useReplace = false): void {
        const url = new URL(window.location.href);
        url.searchParams.delete(key);
        this._updateUrl(url, useReplace);
    }

    private _updateUrl(url: URL, useReplace: boolean): void {
        if (useReplace) {
            window.history.replaceState(window.history.state, '', url.toString());
        } else {
            window.history.pushState(window.history.state, '', url.toString());
        }
    }
}
