export const isInIframe = window.self !== window.top;

export const TrabyterWebsiteUrl: string =
    process.env.NODE_ENV !== 'development'
        ? 'http://u6s2n-gx777-77774-qaaba-cai.localhost:4943/'
        : 'http://u6s2n-gx777-77774-qaaba-cai.localhost:4943/';

export const AllowedOriginUrls: string[] = [TrabyterWebsiteUrl];
