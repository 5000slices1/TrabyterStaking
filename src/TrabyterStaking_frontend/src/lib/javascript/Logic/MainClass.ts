import {SessionStorage} from '$lib/javascript/Abstractions/sessionStorage/sessionStorage';
import {MessageProvider} from '$lib/javascript/Logic/messages/messageProvider';
import {NftProvider} from '$lib/javascript/Logic/Nft/NftProvider';
import {writable} from 'svelte/store';

import {CryptoUtils} from '../../shared/common/crypto/cryptoutils';

class InternalMainClass {
    #init_done: boolean = false;
    NftProvider: NftProvider;
    MessageProvider: MessageProvider;
    SessionStorage: SessionStorage;
    CryptoUtils: CryptoUtils;

    constructor() {
        this.CryptoUtils = new CryptoUtils();
        this.NftProvider = NftProvider.getInstance();
        this.MessageProvider = new MessageProvider();
        this.SessionStorage = new SessionStorage();
    }

    async InitAsync() {
        if (this.#init_done) {
            return;
        }
        await this.CryptoUtils.InitAsync();
        await this.NftProvider.InitAsync();
        await this.MessageProvider.Init();
        await this.SessionStorage.Load();
        this.#init_done = true;

        console.log('GlobalTypes.InitAsync done');
    }

    IsInitDone() {
        return this.#init_done;
    }
}

export const MainClass = writable(new InternalMainClass());
