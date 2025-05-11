import {NftProvider} from '$lib/javascript/Logic/Nft/NftProvider';

import {IdentityProvider} from './identity/IdentityProvider';

class InternalMainClass {
    #init_done: boolean = false;
    IdentityProvider: IdentityProvider;
    NftProvider: NftProvider;

    constructor() {
        this.IdentityProvider = new IdentityProvider();
        this.NftProvider = NftProvider.getInstance();
    }

    async InitAsync() {
        if (this.#init_done) {
            return;
        }
        await this.IdentityProvider.Init();
        await this.NftProvider.InitAsync();
        this.#init_done = true;
        console.log('GlobalTypes.InitAsync done');
    }

    IsInitDone() {
        return this.#init_done;
    }
}

export const MainClass = new InternalMainClass();
