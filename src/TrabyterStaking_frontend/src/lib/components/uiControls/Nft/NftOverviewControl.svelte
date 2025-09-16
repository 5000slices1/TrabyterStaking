<script lang="ts">
    import {NftMetadata} from '$lib/javascript/Abstractions/Nft/Entrepot/NftMetadata';
    let data: NftMetadata = $props();
</script>

<div class="NftMetadataItem" style="width: 16rem; height: 20rem;">
    <table cellpadding="0" cellspacing="0" style="width: 16rem; height: 20rem;">
        <tbody>
            <tr style="height: 2rem;">
                <td style="text-align: center;">
                    <p
                        style="color: white;
                        display: inline-block;
                        width: auto; height: 2rem;"
                    >
                        {data.name}
                    </p>
                </td>
            </tr>
            <tr style="height: 2.3rem;">
                <td>
                    <button
                        class="create-nft-button"
                        style="width: 100%; height:2.3rem;
                            width:12rem;margin-left: 2rem; margin-right: 2rem;
                            vertical-align: bottom;
                            horizontal-align: center;
                            cursor: pointer;"
                    >
                        Create NFT Staking.
                    </button>
                </td>
            </tr>
            <tr style="height: 12rem;">
                <td style="padding:0.5rem;">
                    <img
                        src={data.avatar}
                        alt="Thumbnail"
                        loading="lazy"
                        style="width: 100%; height: 12rem; object-fit: fill;
                        horizontal-align: center;
                        rounded: 0rem 0rem 2rem 2rem; border-radius: 0rem 0rem 2rem 2rem;
                        border: 0.0rem solid transparent;"
                    />
                </td>
            </tr>

            <!-- <tr style="height: 1rem;">
                <td class="news_item_youtube_card_view_more_item" style="padding-right: 1rem;">
                    <a
                        href={data.videoUrl}
                        target="_blank"
                        style="color: rgba(255, 255, 255, 0.6); cursor: pointer;"
                        rel="noopener noreferrer">View more...</a
                    >
                </td>
            </tr>
            <tr style="height: 8rem;">
                <td class="news_item_youtube_card_image">
                    <img
                        src="/images/news/youtube/{data.thumbnailUrl}.png"
                        alt="Thumbnail"
                        style="width: 100%; height: calc(100% - 1px); object-fit: fill;
                        rounded: 0rem 0rem 2rem 2rem; border-radius: 0rem 0rem 2rem 2rem;
                        border: 0.0rem solid transparent;"
                    />
                </td>
            </tr> -->
        </tbody>
    </table>
</div>

<style>
    .NftMetadataItem {
        background-color: dodgerblue;
        color: white;

        background: rgba(35, 138, 212, 0.42);
        border-radius: 2rem;
        align-items: center;
        justify-content: center;
        border-radius: 2rem;
        border: 0.2rem solid rgba(24, 146, 234, 0.6);
    }

    .create-nft-button {
        width: 100%;
        height: 2.3rem;
        background: #548fe8;
        border: 0.15rem solid #1c72f3;
        border-radius: 0.8rem;

        font-style: normal;
        font-weight: bold;
        font-size: medium;
        align-items: center;
        text-align: center;
        letter-spacing: 0.03rem;
        /* Button Default Text color */
        color: #c2c9d3;
    }

    .create-nft-button:hover {
        background: #1c72f3;
        color: white;
        border-color: #0f5ac6;
        transition:
            background 0.3s,
            color 0.3s,
            border-color 0.3s;
    }

    .create-nft-button:active {
        background: #0f5ac6;
        color: #d4e1f5;
        border-color: #0a3e8e;
        transition:
            background 0.1s,
            color 0.1s,
            border-color 0.1s;
    }
    /* .news_item_youtube_card_text {
        color: rgba(255, 255, 255, 0.6);
        width: 18rem;
        height: 7rem;
        margin-left: 2rem;
        margin-right: 2rem;
        text-align: left;
        padding: 0.5rem;
        font-weight: bold;
        font-size: medium;
    }

    .news_item_youtube_card_view_more_item {
        color: rgba(255, 255, 255, 0.6);
        width: auto;
        height: 2rem;
        text-align: right;
        margin: 2rem auto;
        margin-right: 2rem;
        font-weight: bold;
        font-size: medium;
    }

    .news_item_youtube_card_image {
        margin: 0em;
        padding: 0em;
        border-radius: 0rem 0rem 2rem 2rem;
    } */
</style>
