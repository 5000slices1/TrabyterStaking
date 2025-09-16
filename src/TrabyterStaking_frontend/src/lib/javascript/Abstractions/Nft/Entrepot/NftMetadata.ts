/**
 * Represents metadata for an NFT (Non-Fungible Token).
 */
export class NftMetadata {
    /**
     * Unique identifier for the NFT.
     */
    id: string;

    /**
     * Priority level of the NFT.
     */
    priority: number;

    /**
     * Name of the NFT.
     */
    name: string;

    /**
     * A comparable version of the name, typically used for sorting or searching.
     */
    nameComparable:string

    /**
     * A brief summary of the NFT.
     */
    brief: string;

    /**
     * Detailed description of the NFT.
     */
    description: string;

    /**
     * Additional information or promotional text about the NFT.
     */
    blurb: string;

    /**
     * Keywords associated with the NFT for search or categorization.
     */
    keywords: string[];

    /**
     * Website URL related to the NFT.
     */
    web: string;

    /**
     * Telegram link or handle associated with the NFT.
     */
    telegram: string;

    /**
     * Discord link or handle associated with the NFT.
     */
    discord: string;

    /**
     * Twitter link or handle associated with the NFT.
     */
    twitter: string;

    /**
     * Medium link or handle associated with the NFT.
     */
    medium: string;

    /**
     * DSCVR link or handle associated with the NFT.
     */
    dscvr: string;

    /**
     * Distrikt link or handle associated with the NFT.
     */
    distrikt: string;

    /**
     * URL of the banner image for the NFT.
     */
    banner: string;

    /**
     * URL of the avatar image for the NFT.
     */
    avatar: string;

    /**
     * Name of the collection to which the NFT belongs.
     */
    collection: string;

    /**
     * Route or path associated with the NFT.
     */
    route: string;

    /**
     * Commission percentage for the NFT.
     */
    commission: number;

    /**
     * Indicates whether the NFT is a legacy item.
     */
    legacy: boolean;

    /**
     * Unit of measurement or currency associated with the NFT.
     */
    unit: string;

    /**
     * NFT version or identifier.
     */
    nftv: string;

    /**
     * Indicates whether the NFT is marked as mature content.
     */
    mature: boolean;

    /**
     * Market or platform associated with the NFT.
     */
    market: string;

    /**
     * Developer or creator of the NFT.
     */
    dev: boolean;

    /**
     * External link related to the NFT.
     */
    external: string;

    /**
     * Filter or category associated with the NFT.
     */
    filter: string;

    /**
     * Sale information or status of the NFT.
     */
    sale: string;

    /**
     * Earnings or rewards associated with the NFT.
     */
    earn: string;

    /**
     * Type of sale for the NFT (e.g., auction, fixed price).
     */
    saletype: string;

    /**
     * Standard or protocol used by the NFT.
     */
    standard: string;

    /**
     * URL of the detail page for the NFT.
     */
    detailpage: string;

    /**
     * License information for the NFT.
     */
    nftlicense: string;

    /**
     * Indicates whether the NFT requires KYC (Know Your Customer) verification.
     */
    kyc: boolean;

    /**
     * Owner or holder of the NFT.
     */
    owner: string;

    /**
     * Royalty percentage for the NFT.
     */
    royalty: number;

    // Constructor
    /**
     * Initializes a new instance of the NftMetadata class.
     * @param id - Unique identifier for the NFT.
     * @param priority - Priority level of the NFT.
     * @param name - Name of the NFT.
     * @param nameComparable - A comparable version of the name, typically used for sorting or searching.
     * @param brief - A brief summary of the NFT.
     * @param description - Detailed description of the NFT.
     * @param blurb - Additional information or promotional text about the NFT.
     * @param keywords - Keywords associated with the NFT for search or categorization.
     * @param web - Website URL related to the NFT.
     * @param telegram - Telegram link or handle associated with the NFT.
     * @param discord - Discord link or handle associated with the NFT.
     * @param twitter - Twitter link or handle associated with the NFT.
     * @param medium - Medium link or handle associated with the NFT.
     * @param dscvr - DSCVR link or handle associated with the NFT.
     * @param distrikt - Distrikt link or handle associated with the NFT.
     * @param banner - URL of the banner image for the NFT.
     * @param avatar - URL of the avatar image for the NFT.
     * @param collection - Name of the collection to which the NFT belongs.
     * @param route - Route or path associated with the NFT.
     * @param commission - Commission percentage for the NFT.
     * @param legacy - Indicates whether the NFT is a legacy item.
     * @param unit - Unit of measurement or currency associated with the NFT.
     * @param nftv - NFT version or identifier.
     * @param mature - Indicates whether the NFT is marked as mature content.
     * @param market - Market or platform associated with the NFT.
     * @param dev - Developer or creator of the NFT.
     * @param external - External link related to the NFT.
     * @param filter - Filter or category associated with the NFT.
     * @param sale - Sale information or status of the NFT.
     * @param earn - Earnings or rewards associated with the NFT.
     * @param saletype - Type of sale for the NFT (e.g., auction, fixed price).
     * @param standard - Standard or protocol used by the NFT.
     * @param detailpage - URL of the detail page for the NFT.
     * @param nftlicense - License information for the NFT.
     * @param kyc - Indicates whether the NFT requires KYC (Know Your Customer) verification.
     * @param owner - Owner or holder of the NFT.
     * @param royalty - Royalty percentage for the NFT.
     */
    constructor(
        id: string,
        priority: number,
        name: string,
        brief: string,
        description: string,
        blurb: string,
        keywords: string[],
        web: string,
        telegram: string,
        discord: string,
        twitter: string,
        medium: string,
        dscvr: string,
        distrikt: string,
        banner: string,
        avatar: string,
        collection: string,
        route: string,
        commission: number,
        legacy: boolean,
        unit: string,
        nftv: string,
        mature: boolean,
        market: string,
        dev: boolean,
        external: string,
        filter: string,
        sale: string,
        earn: string,
        saletype: string,
        standard: string,
        detailpage: string,
        nftlicense: string,
        kyc: boolean,
        owner: string,
        royalty: number,
    ) {
        this.nameComparable = '';
        this.id = id;
        this.priority = priority;
        this.name = name;
        this.brief = brief;
        this.description = description;
        this.blurb = blurb;
        this.keywords = keywords;
        this.web = web;
        this.telegram = telegram;
        this.discord = discord;
        this.twitter = twitter;
        this.medium = medium;
        this.dscvr = dscvr;
        this.distrikt = distrikt;
        this.banner = banner;
        this.avatar = avatar;
        this.collection = collection;
        this.route = route;
        this.commission = commission;
        this.legacy = legacy;
        this.unit = unit;
        this.nftv = nftv;
        this.mature = mature;
        this.market = market;
        this.dev = dev;
        this.external = external;
        this.filter = filter;
        this.sale = sale;
        this.earn = earn;
        this.saletype = saletype;
        this.standard = standard;
        this.detailpage = detailpage;
        this.nftlicense = nftlicense;
        this.kyc = kyc;
        this.owner = owner;
        this.royalty = royalty;
    }

    public GetComparableName(): string {
        if (this.nameComparable && this.nameComparable.length > 0) {
            return this.nameComparable;
        }
        return this.GetOnlyComparableString(this.name);
    }

    private toAscii(str: string): string {
        // Replace Unicode Mathematical Bold Capital letters (𝐀-𝐙) with ASCII A-Z
        return str.replace(/[\u{1D400}-\u{1D419}]/gu, (ch) =>
            String.fromCharCode(ch.codePointAt(0)! - 0x1d400 + 0x41)
        );
    }

    private GetOnlyComparableString(str: string | undefined): string {
        if (str === undefined) return '';
        str = this.toAscii(str).toLowerCase();
        str = str.replace(' ', '');
        str = str.replace(/[^a-z0-9]/g, '');
        return str;
    }
}
