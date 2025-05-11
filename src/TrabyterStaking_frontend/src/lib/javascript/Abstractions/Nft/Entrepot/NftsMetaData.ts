import type {NftMetadata} from './NftMetadata';

/**
 * Represents a collection of NFT metadata objects.
 */
export class NftsMetadata {
    /**
     * An array of NFT metadata objects.
     */
    nfts: NftMetadata[];

    /**
     * Creates an instance of NftsMetadata.
     * @param nfts - An array of NFT metadata objects to initialize the collection.
     */
    constructor(nfts: NftMetadata[]) {
        this.nfts = nfts;
    }

    /**
     * Retrieves an NFT metadata object by its unique identifier.
     * @param id - The unique identifier of the NFT.
     * @returns The NFT metadata object if found, otherwise `undefined`.
     */
    getNftById(id: string): NftMetadata | undefined {
        return this.nfts.find((nft) => nft.id === id);
    }

    /**
     * Retrieves an NFT metadata object by its name.
     * @param name - The name of the NFT.
     * @returns The NFT metadata object if found, otherwise `undefined`.
     */
    getNftByName(name: string): NftMetadata | undefined {
        return this.nfts.find((nft) => nft.name === name);
    }
}
