import {Principal} from '@dfinity/principal';

export enum WalletTypes {
    'NoWallet',
    'plug',
    'stoic',
    'dfinity',
}

export class UsersIdentity {
    //Connected, true or false
    IsConnected: boolean;

    //Type of the connection. (stoic, plug, dfinity)
    Type: WalletTypes;

    //Display-name of the connected wallet (Stoic, Plug, Dfinity)
    Name: string;

    //The users wallet-principal as Text
    AccountPrincipalText: string;

    //The users wallet-principal
    AccountPrincipal: Principal;

    constructor() {
        this.IsConnected = false;
        this.Type = WalletTypes.NoWallet;
        this.Name = '';
        this.AccountPrincipalText = '';
        this.AccountPrincipal = Principal.anonymous();
    }

    Reset() {
        this.IsConnected = false;
        this.Type = WalletTypes.NoWallet;
        this.Name = '';
        this.AccountPrincipalText = '';
        this.AccountPrincipal = Principal.anonymous();
    }
}
