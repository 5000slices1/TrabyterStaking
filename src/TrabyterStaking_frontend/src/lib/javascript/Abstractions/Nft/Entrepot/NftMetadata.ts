export class NftMetadata {
    id: string;
    priority: number;
    name: string;
    brief: string;
    description: string;
    blurb: string;
    keywords: string[];
    web: string;
    telegram: string;
    discord: string;
    twitter: string;
    medium: string;
    dscvr: string;
    distrikt: string;
    banner: string;
    avatar: string;
    collection: string;
    route: string;
    commission: number;
    legacy: boolean;
    unit: string;
    nftv: string;
    mature: boolean;
    market: string;
    dev: string;
    external: string;
    filter: string;
    sale: string;
    earn: string;
    saletype: string;
    standard: string;
    detailpage: string;
    nftlicense: string;
    kyc: boolean;
    owner: string;
    royalty: number;

    // Constructor
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
        dev: string,
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
}
