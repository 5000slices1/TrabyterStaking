import {NftMetadata} from '$lib/javascript/Abstractions/Nft/Entrepot/NftMetadata';
import {NftsMetadata} from '$lib/javascript/Abstractions/Nft/Entrepot/NftsMetaData';

/**
 * Singleton class to manage and provide NFT metadata.
 */
// This class fetches NFT metadata from an API and provides methods to access it.
// It uses the Singleton design pattern to ensure that only one instance of the class exists.
// The class is responsible for fetching the metadata, storing it, and providing methods to retrieve it by ID or name.
// It also allows for updating the metadata by fetching it again from the API.
// The class is initialized with an empty state and can be updated with new metadata.
export class NftMetadataProvider {
    private static instance: NftMetadataProvider;
    private nftsMetadata: NftsMetadata;

    /**
     * Private constructor to prevent direct instantiation.
     * Initializes the nftsMetadata property with an empty NftsMetadata instance.
     */
    private constructor() {
        this.nftsMetadata = new NftsMetadata([]);
    }

    /**
     * Returns the singleton instance of the NftMetadataProvider.
     * @returns The singleton instance of NftMetadataProvider.
     */
    public static getInstance(): NftMetadataProvider {
        if (!NftMetadataProvider.instance) {
            NftMetadataProvider.instance = new NftMetadataProvider();
        }
        return NftMetadataProvider.instance;
    }

    /**
     * Sets the NFT metadata.
     * @param nfts - An array of NFT metadata objects to set.
     */
    public setNftsMetadata(nfts: NftMetadata[]) {
        this.nftsMetadata = new NftsMetadata(nfts);
    }

    /**
     * Retrieves NFT metadata by its unique identifier.
     * @param id - The unique identifier of the NFT.
     * @returns The NFT metadata object if found, otherwise `undefined`.
     */
    public getNftById(id: string | undefined): NftMetadata | undefined {
        if (id === undefined) {
            return undefined;
        }
        return this.nftsMetadata.getNftById(id);
    }
    /**
     * Retrieves NFT metadata by its name.
     * @param name - The name of the NFT.
     * @returns The NFT metadata object if found, otherwise `undefined`.
     */
    public getNftByName(name: string | undefined): NftMetadata | undefined {
        if (name === undefined) {
            return undefined;
        }
        return this.nftsMetadata.getNftByName(name);
    }
    /**
     * Retrieves all NFT metadata.
     * @returns An array of all NFT metadata objects.
     */
    public getAllNfts(): NftMetadata[] {
        return this.nftsMetadata.nfts;
    }

    /**
     * Fetches NFT metadata from the API and updates the internal state.
     * This method is responsible for making the API call to fetch the metadata,
     * processing the response, and updating the internal state of the class.
     */
    public async updateAllAsync(): Promise<void> {
        // Reset the nftsMetadata to an empty state
        this.nftsMetadata = new NftsMetadata([]);

        // Fetch the NFT metadata from the API
        try {
            const response = await fetch(
                'https://us-central1-entrepot-api.cloudfunctions.net/api/collections',
            );
            const data = await response.json();
            const nfts = data.map(
                (item: any) =>
                    new NftMetadata(
                        item.id,
                        item.priority,
                        item.name,
                        item.brief,
                        item.description,
                        item.blurb,
                        item.keywords || [],
                        item.web,
                        item.telegram,
                        item.discord,
                        item.twitter,
                        item.medium,
                        item.dscvr,
                        item.distrikt,
                        item.banner,
                        item.avatar,
                        item.collection,
                        item.route,
                        item.commission,
                        item.legacy,
                        item.unit,
                        item.nftv,
                        item.mature,
                        item.market,
                        item.dev,
                        item.external,
                        item.filter,
                        item.sale,
                        item.earn,
                        item.saletype,
                        item.standard,
                        item.detailpage,
                        item.nftlicense,
                        item.kyc,
                        item.owner,
                        item.royalty,
                    ),
            );
            this.nftsMetadata = new NftsMetadata(nfts);
        } catch (error) {
            console.error('Error fetching NFT metadata:', error);
        }
    }
}
