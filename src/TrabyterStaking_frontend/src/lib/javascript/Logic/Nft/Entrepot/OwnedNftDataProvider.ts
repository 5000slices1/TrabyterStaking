import {OwnedNftInformation} from '$lib/javascript/Abstractions/Nft/Entrepot/OwnedNftInformation';
import {NftMetadataProvider} from '$lib/javascript/Logic/Nft/Entrepot/NftMetaDataProvider';

export class OwnedNftDataProvider {
    private items: OwnedNftInformation[] = [];

    constructor(items: OwnedNftInformation[]) {
        this.items = items;
    }

    public async UpdateByAccountIdAsync(
        accountId: string,
        metadataProvider: NftMetadataProvider,
    ): Promise<void> {
        // Clear all items
        this.items = [];
        //Fetch all items from the API
        const response = await fetch(
            `https://us-central1-entrepot-api.cloudfunctions.net/api/user/${accountId}/all`,
        );
        const data = await response.json();
        var nftItems: OwnedNftInformation[] = data.map(
            (item: OwnedNftInformation) =>
                this.GetNewOwnedNftInformationItem(
                    metadataProvider,
                    item.id,
                    item.owner,
                    item.canister,
                    item.price,
                    item.time,
                    item.metadata,
                ),
        );
    }

    private GetNewOwnedNftInformationItem(
        metadataProvider: NftMetadataProvider,
        id: string | undefined,
        owner: string | undefined,
        canister: string | undefined,
        price: number | undefined,
        time: number | undefined,
        metadata: string | undefined,
    ): OwnedNftInformation {
        var newItem = new OwnedNftInformation();
        {
            newItem.id = id;
            newItem.owner = owner;
            newItem.canister = canister;
            newItem.price = price;
            newItem.time = time;
            newItem.metadata = metadata;
        }

        //Addional most important NFT-metadata, so we do not need to map every time
        const nftMetadata = metadataProvider.getNftById(id);
        if (nftMetadata) {
            newItem.collectionName = nftMetadata.name;
            newItem.collectionId = nftMetadata.id;
            newItem.collectionBrief = nftMetadata.brief;
            newItem.collectionDescription = nftMetadata.description;
            newItem.collectionBlurb = nftMetadata.blurb;
            newItem.collectionAvatarUrl = nftMetadata.avatar;
            newItem.collectionImageUrl = nftMetadata.collection;
            newItem.collectionBannerUrl = nftMetadata.banner;
            newItem.collectionCanisterOwner = nftMetadata.owner?.toString();
            newItem.collectionStandard = nftMetadata.standard?.toString();
        }

        return newItem;
    }

    // Method to get all items
    public getAllItems(): OwnedNftInformation[] {
        return this.items;
    }

    // Method to find an item by ID
    public getItemById(id: string): OwnedNftInformation | undefined {
        return this.items.find((item) => item.id === id);
    }

    // Method to add a new item
    public addItem(newItem: OwnedNftInformation): void {
        this.items.push(newItem);
    }

    // Method to remove an item by ID
    public removeItemById(id: string): boolean {
        const index = this.items.findIndex((item) => item.id === id);
        if (index !== -1) {
            this.items.splice(index, 1);
            return true;
        }
        return false;
    }

    // Method to update an item by ID
    public updateItem(updatedItem: OwnedNftInformation): boolean {
        const index = this.items.findIndex(
            (item) => item.id === updatedItem.id,
        );
        if (index !== -1) {
            this.items[index] = updatedItem;
            return true;
        }
        return false;
    }
}
