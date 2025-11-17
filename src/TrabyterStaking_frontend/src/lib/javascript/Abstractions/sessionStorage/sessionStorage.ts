//import type {b} from 'vite/dist/node/moduleRunnerTransport.d-DJ_mE5sf';
import {MainNavigationUrls} from './mainNavigationUrls';

export class SessionStorage {
    IsFullScreen: boolean;
    currentUrl: MainNavigationUrls;

    constructor() {
        this.currentUrl = MainNavigationUrls.Unknown;
        this.IsFullScreen = false;

        // if (typeof window !== 'undefined') {
        //     //this.currentUrl = window.location.href;

        // }
    }

    Load(): void {
        if (typeof window !== 'undefined') {
            let fsStoredString = window.sessionStorage.getItem('TrabyterStakingSessionsStorage');
            if (fsStoredString == null) {
                return;
            }

            let data: SessionStorage = JSON.parse(fsStoredString as string);
            this.IsFullScreen = data.IsFullScreen == null ? false : (data.IsFullScreen as boolean);
            this.currentUrl =
                data.currentUrl == null ? MainNavigationUrls.Unknown : (data.currentUrl as MainNavigationUrls);
        }
    }

    Save(): void {
        if (typeof window !== 'undefined') {
            let jsonString = JSON.stringify(this);
            window.sessionStorage.setItem('TrabyterStakingSessionsStorage', jsonString);
        }
    }
}
