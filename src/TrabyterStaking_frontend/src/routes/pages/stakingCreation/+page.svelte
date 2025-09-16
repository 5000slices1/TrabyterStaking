<script lang="ts">
    import type {NftMetadata} from '$lib/javascript/Abstractions/Nft/Entrepot/NftMetadata';
    import {NftProvider} from '$lib/javascript/Logic/Nft/NftProvider';
    import {MainClass} from '$lib/javascript/Logic/MainClass';
    import {NftMetadataProvider} from '$lib/javascript/Logic/Nft/Entrepot/NftMetaDataProvider';
    import NftOverviewControl from '$lib/components/uiControls/Nft/NftOverviewControl.svelte';
    import {onMount} from 'svelte';
    import {browser} from '$app/environment';
    import {get} from 'http';

    let data = $props();
    console.log('1');

    let nftProvider: NftProvider = $MainClass.NftProvider;
    //var allNfts = nftProvider.getAllNfts().filter((nft) => nft.standard === 'ext' && nft.dev === 'false');
    //await nftProvider.updateAllAsync();
    //var allNfts = nftProvider.getAllNfts();
    //console.log('2');
    let items: NftMetadata[] = $state([] as NftMetadata[]);

    console.log('3');
    console.log('NftMetadata', items);

    onMount(async () => {
        if (browser) {
            console.log('in onmount');
            let mdp = NftMetadataProvider.getInstance();
            if (mdp.IsEmpty()) {
                console.log('updating nft metadata provider');
                await mdp.updateAllAsync();
            }

            console.log('after update');

            let allItems: NftMetadata[] = mdp.getAllNfts();
            allItems.filter((nft) => nft.standard === 'ext' && nft.dev === false);
            allItems = await allItems.sort((a, b) => a.GetComparableName().localeCompare(b.GetComparableName()));
            items = [...allItems];
            for (let i = 0; i < items.length; i++) {
                let cs = items[i].GetComparableName();
                console.log(cs);
            }

            // if (nftProvider.isInitialized === false) {
            //     await nftProvider.InitAsync();
            // }
            // let nftMetaDataProvider: NftMetadataProvider = nftProvider.getNftMetadataProvider();
            // let allItems: NftMetadata[] = await nftMetaDataProvider
            //     .getAllNfts()
            //     .then((nfts) => nfts.filter((nft) => nft.standard === 'ext' && nft.dev === 'false'));
            // items = allItems;

            console.log('NftMetadata', items);
            console.log('items count:', items.length);
        }
        //items = await nftProvider.getAllNftMetadata();
        //console.log('NftMetadata', items);
    });
</script>

<div class="content-control-div" style="width: 100%; height: 100%; margin-top: 0.4rem;color:white">
    <div class="inner-content-control-spacing" style="width: auto;">
        <div style="margin-left:2rem;margin-top: 1rem;">
            {#if items.length > 0}
                <div class="data-grid">
                    {#each items as item}
                        <div class="data-item">
                            <NftOverviewControl {...item} />
                        </div>
                    {/each}
                </div>
            {/if}
        </div>
    </div>
</div>
