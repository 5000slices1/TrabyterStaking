export class OwnedNftInformation {
    id: string | undefined;
    owner: string | undefined;
    canister: string | undefined;
    price: number | undefined;
    time: number | undefined;
    metadata: string | undefined;

    //Addional most important NFt-metadata, so we do not need to map every time
    collectionName: string | undefined;
    collectionId: string | undefined;
    collectionBrief: string | undefined;
    collectionDescription: string | undefined;
    collectionBlurb: string | undefined;
    collectionAvatarUrl: string | undefined;
    collectionImageUrl: string | undefined;
    collectionBannerUrl: string | undefined;
    collectionCanisterOwner: string | undefined;
    collectionStandard: string | undefined;

    IsListed(): boolean {
        if (this.price === undefined || this.price === null) {
            return false;
        }
        return this.price > 0;
    }

    public constructor() {
        this.id = '';
        this.owner = '';
        this.canister = '';
        this.price = 0.0;
        this.time = 0;
        this.metadata = '';

        //Addional most important NFt-metadata, so we do not need to map every time
        this.collectionName = '';
        this.collectionId = '';
        this.collectionBrief = '';
        this.collectionDescription = '';
        this.collectionBlurb = '';
        this.collectionAvatarUrl = '';
        this.collectionImageUrl = '';
        this.collectionBannerUrl = '';
        this.collectionCanisterOwner = '';
        this.collectionStandard = '';
    }
}
