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
    public getNftByCanisterId(id: string | undefined): NftMetadata | undefined {
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

    public IsEmpty(): boolean {
        return this.nftsMetadata.nfts.length === 0;
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
            const response = await fetch('https://us-central1-entrepot-api.cloudfunctions.net/api/collections');
            const data = await response.json();
            const nfts = data.map(
                (item: any) =>
                    new NftMetadata({
                        id: item.id,
                        priority: item.priority,
                        name: item.name,
                        nameComparable: '',
                        brief: item.brief,
                        description: item.description,
                        blurb: item.blurb,
                        keywords: item.keywords || [],
                        web: item.web,
                        telegram: item.telegram,
                        discord: item.discord,
                        twitter: item.twitter,
                        medium: item.medium,
                        dscvr: item.dscvr,
                        distrikt: item.distrikt,
                        banner: item.banner,
                        avatar: item.avatar,
                        collection: item.collection,
                        route: item.route,
                        commission: item.commission,
                        legacy: item.legacy,
                        unit: item.unit,
                        nftv: item.nftv,
                        mature: item.mature,
                        market: item.market,
                        dev: item.dev,
                        external: item.external,
                        filter: item.filter,
                        sale: item.sale,
                        earn: item.earn,
                        saletype: item.saletype,
                        standard: item.standard,
                        detailpage: item.detailpage,
                        nftlicense: item.nftlicense,
                        kyc: item.kyc,
                        owner: item.owner,
                        royalty: item.royalty,
                    }),
            );
            console.log('Fetched NFT metadata:');
            console.log(nfts);
            this.nftsMetadata = new NftsMetadata(nfts);
        } catch (error) {
            console.error('Error fetching NFT metadata:', error);
        }
    }
}
