import {NftMetadataProvider} from '$lib/javascript/Logic/Nft/Entrepot/NftMetaDataProvider';
import {OwnedNftDataProvider} from '$lib/javascript/Logic/Nft/Entrepot/OwnedNftDataProvider';

export class NftProvider {
    private static instance: NftProvider;
    private ownedNftDataProvider: OwnedNftDataProvider;
    private nftMetadataProvider: NftMetadataProvider;
    public isInitialized: boolean = false;

    private constructor() {
        this.ownedNftDataProvider = new OwnedNftDataProvider([]);
        this.nftMetadataProvider = NftMetadataProvider.getInstance();
    }

    public static getInstance(): NftProvider {
        if (!NftProvider.instance) {
            NftProvider.instance = new NftProvider();
        }
        return NftProvider.instance;
    }

    public async InitAsync(): Promise<void> {
        await this.nftMetadataProvider.updateAllAsync();
        this.isInitialized = true;
    }

    public getOwnedNftDataProvider(): OwnedNftDataProvider {
        return this.ownedNftDataProvider;
    }

    public getNftMetadataProvider(): NftMetadataProvider {
        return this.nftMetadataProvider;
    }
}
