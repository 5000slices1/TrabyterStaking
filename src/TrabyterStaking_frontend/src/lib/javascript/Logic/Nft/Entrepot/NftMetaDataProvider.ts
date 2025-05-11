import {NftMetadata} from '$lib/javascript/Abstractions/Nft/Entrepot/NftMetadata';
import {NftsMetadata} from '$lib/javascript/Abstractions/Nft/Entrepot/NftsMetaData';

class NftMetadataProvider {
    private static instance: NftMetadataProvider;
    private nftsMetadata: NftsMetadata;

    private constructor() {
        this.nftsMetadata = new NftsMetadata([]);
    }

    public static getInstance(): NftMetadataProvider {
        if (!NftMetadataProvider.instance) {
            NftMetadataProvider.instance = new NftMetadataProvider();
        }
        return NftMetadataProvider.instance;
    }

    public setNftsMetadata(nfts: NftMetadata[]) {
        this.nftsMetadata = new NftsMetadata(nfts);
    }

    public getNftById(id: string): NftMetadata | undefined {
        return this.nftsMetadata.getNftById(id);
    }
    public getNftByName(name: string): NftMetadata | undefined {
        return this.nftsMetadata.getNftByName(name);
    }
    public getAllNfts(): NftMetadata[] {
        return this.nftsMetadata.nfts;
    }

    public updateAll() {
        // Reset the nftsMetadata to an empty state
        this.nftsMetadata = new NftsMetadata([]);

        // Fetch the NFT metadata from the API
        fetch(
            'https://us-central1-entrepot-api.cloudfunctions.net/api/collections',
        )
            .then((response) => response.json())
            .then((data) => {
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
            })
            .catch((error) => {
                console.error('Error fetching NFT metadata:', error);
            });
    }
}
