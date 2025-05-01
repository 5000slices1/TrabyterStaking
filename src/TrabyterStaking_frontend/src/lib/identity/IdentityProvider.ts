import {Principal} from '@dfinity/principal';

import {Artemis} from '../../artemis-web3-adapter/src/index.js';
import {PubSub} from '../utils/pubsub';
import {UsersIdentity, WalletTypes} from './UsersIdentity';

export class IdentityProvider {
    #_init_done: boolean;
    #_plugWalletConnected: boolean;
    #_adapter: any;
    #_connectionObject: {whitelist: string[]; host: string} | undefined;
    #_lastLoginWalletType: WalletTypes;
    #_inside_login: boolean;
    #_inside_logout: boolean;

    //The users identity
    #_usersIdentity: UsersIdentity;

    constructor() {
        this.#_usersIdentity = new UsersIdentity();
        //this.#_adapter = new this.TypeArtemis();
        this.#_adapter = new Artemis();
        this.#_init_done = false;
        this.#_plugWalletConnected = false;
        this.#_lastLoginWalletType = WalletTypes.NoWallet;
        this.#_inside_login = false;
        this.#_inside_logout = false;
    }

    //Connect the users wallet
    Connect() {
        this.#_usersIdentity.IsConnected = true;
    }

    //Disconnect the users wallet
    Disconnect() {
        this.#_usersIdentity.Reset();
    }

    GetAdapter() {
        return this.#_adapter;
    }

    GetProvider() {
        return this.#_adapter.provider;
    }

    IsWalletConnected() {
        if (
            this.#_adapter.provider == null ||
            this.#_adapter.provider == false
        ) {
            return false;
        }

        let connectedWalletInfo: any = this.#_adapter?.connectedWalletInfo;
        if (connectedWalletInfo == null || connectedWalletInfo == undefined) {
            return false;
        }

        if (
            connectedWalletInfo.id == 'plug' &&
            this.#_plugWalletConnected == false
        ) {
            return false;
        }

        return true;
    }

    async #UserIdentityChanged() {
        this.#_usersIdentity.Reset();
        try {
            if (this.IsWalletConnected() == false) {
                return;
            }

            let connectedWalletInfo: any = this.#_adapter?.connectedWalletInfo;
            if (
                connectedWalletInfo != null &&
                connectedWalletInfo != undefined
            ) {
                switch (connectedWalletInfo.id) {
                    case 'plug':
                        this.#_usersIdentity.Type = WalletTypes.plug;
                        break;
                    case 'stoic':
                        this.#_usersIdentity.Type = WalletTypes.stoic;
                        break;
                    case 'dfinity':
                        this.#_usersIdentity.Type = WalletTypes.dfinity;
                        break;
                    default:
                        return;
                }
                let principalText: string = this.#_adapter
                    ?.principalId as string;
                let principal: Principal = Principal.fromText(principalText);

                this.#_usersIdentity.Name = connectedWalletInfo.name;
                this.#_usersIdentity.AccountPrincipalText = principalText;
                this.#_usersIdentity.AccountPrincipal = principal;
                //let provider = this.#_adapter?.provider;
                this.#_usersIdentity.IsConnected = true;

                console.log('UserIdentityChanged:');
                console.log(this.#_usersIdentity);
            } else {
                return;
            }
        } catch (error) {
            //do nothing
        } finally {
            PubSub.publish('UserIdentityChanged', null);
        }
    }

    GetAllCanisterIds() {
        const idArray = [];
        //TODO: add canister ids
        // The current ones are just place-holders, yet to be replaced

        idArray.push('lfcgx-lyaaa-aaaag-allgq-cai');
        idArray.push('ev57g-oqaaa-aaaai-aso6a-cai');
        return idArray;
    }

    //This method is called when user identiy (inside plug wallet) is switched
    async OnPlugUserIdentitySwitched() {
        await this.Login(WalletTypes.plug);
    }

    async ReInitConnectionObject() {
        var canisterIds = this.GetAllCanisterIds();
        canisterIds = Array.from(new Set([...canisterIds]));

        let connectedObj = {
            whitelist: canisterIds,
            host: 'https://icp0.io/',
        };

        this.#_connectionObject = connectedObj;

        // var canisterIds = this.WalletsProvider.GetAllCanisterIds();
        // canisterIds.push(this.SwapAppPrincipalText);
        // canisterIds = Array.from(new Set([...canisterIds]));

        // let connectedObj = {
        //     whitelist: canisterIds,
        //     host: 'https://icp0.io/'
        // };

        // this.#_connectionObject = connectedObj;
    }

    async Init() {
        await this.ReInitConnectionObject();
        //Plug wallet is sending this event when user-identity is switched
        window.addEventListener(
            'updateConnection',
            async () => {
                this.OnPlugUserIdentitySwitched();
            },
            false,
        );

        try {
            await this.Logout();
        } catch (error) {
            console.log(error);
        }
        this.#_init_done = true;
    }

    async ReLogin() {
        if (this.#_lastLoginWalletType == WalletTypes.NoWallet) {
            return;
        }

        await this.Logout(false);
        await this.Login(this.#_lastLoginWalletType, true);
    }

    async Login(walletType: WalletTypes, sendEventUserIdentyChanged = true) {
        if (this.#_inside_login == true) {
            return;
        }
        this.#_inside_login = true;
        this.#_lastLoginWalletType = walletType;
        try {
            var walletName = '';
            switch (walletType) {
                case WalletTypes.plug:
                    {
                        walletName = 'plug';
                    }
                    break;
                case WalletTypes.stoic:
                    walletName = 'stoic';
                    break;
                case WalletTypes.dfinity:
                    walletName = 'dfinity';
                    break;
                default:
                    walletName = '';
                    break;
            }

            if (walletName == '') {
                return;
            }

            console.log('IdentityProvider.Login walletName: ' + walletName);
            console.log('IdentityProvider.Login walletType:');
            console.log(walletType);
            console.log('ConnectionObject:');
            console.log(this.#_connectionObject);
            await this.#_adapter.connect(walletName, this.#_connectionObject);

            if (walletType == WalletTypes.plug) {
                this.#_plugWalletConnected = true;
            }
        } catch (error) {
            console.log(error);
        } finally {
            this.#_inside_login = false;

            if (sendEventUserIdentyChanged == true) {
                this.#UserIdentityChanged();
            }
        }
    }

    async Logout(sendEventUserIdentyChanged = true) {
        if (this.#_inside_logout) {
            return;
        }
        this.#_inside_logout = true;
        try {
            if (this.#_init_done == false) {
                if (
                    this.#_adapter.provider != null &&
                    this.#_adapter.provider != false
                ) {
                    await this.#_adapter.disconnect();
                }
                return;
            }

            if (this.IsWalletConnected() == false) {
                return;
            }

            let connectedWalletInfo: any = this.#_adapter?.connectedWalletInfo;
            if (
                connectedWalletInfo != null &&
                connectedWalletInfo != undefined
            ) {
                if (connectedWalletInfo?.id == 'plug') {
                    this.#_plugWalletConnected = false;
                }
            }

            await this.#_adapter.disconnect();
        } catch (error) {
            console.log(error);
        } finally {
            this.#_inside_logout = false;
            if (sendEventUserIdentyChanged == true) {
                await this.#UserIdentityChanged();
            }
        }
    }
}
