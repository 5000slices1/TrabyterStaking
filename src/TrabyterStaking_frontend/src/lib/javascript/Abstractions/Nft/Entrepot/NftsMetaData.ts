import type {NftMetadata} from './NftMetadata';

export class NftsMetadata {
    nfts: NftMetadata[];

    constructor(nfts: NftMetadata[]) {
        this.nfts = nfts;
    }

    getNftById(id: string): NftMetadata | undefined {
        return this.nfts.find((nft) => nft.id === id);
    }

    getNftByName(name: string): NftMetadata | undefined {
        return this.nfts.find((nft) => nft.name === name);
    }
}
