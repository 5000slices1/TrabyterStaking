import {IdentityProvider} from '../identity/IdentityProvider';

class InternalGlobalTypes {
    #init_done: boolean = false;
    IdentityProvider: IdentityProvider;

    constructor() {
        this.IdentityProvider = new IdentityProvider();
    }

    async InitAsync() {
        if (this.#init_done) {
            return;
        }
        await this.IdentityProvider.Init();
        this.#init_done = true;
        console.log('GlobalTypes.InitAsync done');
    }

    IsInitDone() {
        return this.#init_done;
    }
}

export const GlobalTypes = new InternalGlobalTypes();
