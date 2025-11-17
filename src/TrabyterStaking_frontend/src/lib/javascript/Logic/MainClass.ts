import { SessionStorage } from '$lib/javascript/Abstractions/sessionStorage/sessionStorage';
import { MessageProvider } from '$lib/javascript/Logic/messages/messageProvider';
import { NftProvider } from '$lib/javascript/Logic/Nft/NftProvider';
import { writable } from 'svelte/store';

import { AppIdentifier } from '../../shared/common/abstractions/types/commonTypes';
import { CryptoUtils } from '../../shared/common/crypto/cryptoutils';
import { ModelUsersIdentity } from '../Abstractions/Identity/ModelUsersIdentity';

class InternalMainClass
{
    #init_done: boolean = false;
    NftProvider: NftProvider;
    MessageProvider: MessageProvider;
    SessionStorage: SessionStorage;
    CryptoUtils: CryptoUtils;
    UsersIdentity: ModelUsersIdentity;

    constructor()
    {
        this.CryptoUtils = new CryptoUtils();
        this.NftProvider = NftProvider.getInstance();
        this.MessageProvider = new MessageProvider(AppIdentifier.TrabyterStaking);
        this.SessionStorage = new SessionStorage();
        this.UsersIdentity = new ModelUsersIdentity();
    }

    async InitAsync()
    {
        if (this.#init_done)
        {
            return;
        }
        await this.MessageProvider.Init();
        await this.NftProvider.InitAsync();
        await this.SessionStorage.Load();
        this.#init_done = true;

        console.log('GlobalTypes.InitAsync done');
    }

    IsInitDone()
    {
        return this.#init_done;
    }
}

export const MainClass = writable(new InternalMainClass());
