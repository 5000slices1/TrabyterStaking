import type {b} from 'vite/dist/node/moduleRunnerTransport.d-DJ_mE5sf';

export class sessionStorage {
    IsFullScreen: boolean = false;
    currentUrl: string = '';

    constructor() {
        this.currentUrl = '';
        this.IsFullScreen = false;

        // if (typeof window !== 'undefined') {
        //     //this.currentUrl = window.location.href;

        // }
    }

    Load(): void {
        if (typeof window !== 'undefined') {
            let fsStoredString = window.sessionStorage.getItem('trabyterStakingSessionsStorage');
            if (fsStoredString == null) {
                return;
            }

            let data: sessionStorage = JSON.parse(fsStoredString as string);
            this.IsFullScreen = data.IsFullScreen == null ? false : (data.IsFullScreen as boolean);
            this.currentUrl = data.currentUrl == null ? '' : (data.currentUrl as string);
        }
    }

    Save(): void {
        if (typeof window !== 'undefined') {
            let jsonString = JSON.stringify(this);
            window.sessionStorage.setItem('trabyterStakingSessionsStorage', jsonString);
        }
    }
}
