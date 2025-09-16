<script lang="ts">
    import type {NftMetadata} from '$lib/javascript/Abstractions/Nft/Entrepot/NftMetadata';
    import {NftProvider} from '$lib/javascript/Logic/Nft/NftProvider';
    import {MainClass} from '$lib/javascript/Logic/MainClass';
    import {NftMetadataProvider} from '$lib/javascript/Logic/Nft/Entrepot/NftMetaDataProvider';
    import NftOverviewControl from '$lib/components/uiControls/Nft/NftOverviewControl.svelte';
    import {derived} from 'svelte/store';
    import {onMount} from 'svelte';
    import {browser} from '$app/environment';
    import {get} from 'http';

    let data = $props();

    let nftProvider: NftProvider = $MainClass.NftProvider;
    //var allNfts = nftProvider.getAllNfts().filter((nft) => nft.standard === 'ext' && nft.dev === 'false');
    //await nftProvider.updateAllAsync();
    //var allNfts = nftProvider.getAllNfts();
    //console.log('2');

    let items: NftMetadata[] = $state([] as NftMetadata[]);
    let filteredItems: NftMetadata[] = $state([] as NftMetadata[]);
    let filter: string = $state('All');

    // Helper to check if a string starts with a digit
    function startsWithDigit(str: string) {
        return /^[0-9]/.test(str);
    }

    function UpdateFilteredItems(filterToUse: string) {
        filter = filterToUse;
        let tempItems = items.filter((item) => {
            if (filterToUse === 'All') return true;
            if (filterToUse === '0-9') return startsWithDigit(item.nameComparable);
            return item.nameComparable?.toUpperCase().startsWith(filterToUse);
        });

        filteredItems = [...tempItems];
    }

    onMount(async () => {
        if (browser) {
            console.log('in onmount');
            let mdp = NftMetadataProvider.getInstance();
            if (mdp.IsEmpty()) {
                console.log('updating nft metadata provider');
                await mdp.updateAllAsync();
            }

            console.log('after update');

            let allItems: NftMetadata[] = mdp
                .getAllNfts()
                .filter((nft) => nft.standard === 'ext' && nft.dev === false)
                .sort((a, b) => a.nameComparable.localeCompare(b.nameComparable));
            items = [...(allItems as NftMetadata[])];
            UpdateFilteredItems('All');
            // for (let i = 0; i < items.length; i++) {
            //     let cs = items[i].nameComparable;
            //     console.log(cs);
            // }

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
        <!-- Filter Controls -->
        <div style="margin-bottom: 1rem;">
            <button onclick={() => UpdateFilteredItems('All')} class:selected={filter === 'All'}>All</button>
            <button onclick={() => UpdateFilteredItems('0-9')} class:selected={filter === '0-9'}>0-9</button>
            {#each Array.from({length: 26}, (_, i) => String.fromCharCode(65 + i)) as letter}
                <button onclick={() => UpdateFilteredItems(letter)} class:selected={filter === letter}>{letter}</button>
            {/each}
        </div>

        <div style="margin-left:2rem;margin-top: 1rem;">
            {#if filteredItems.length > 0}
                <div class="data-grid">
                    {#each filteredItems as item}
                        <div class="data-item">
                            <NftOverviewControl {...item} />
                        </div>
                    {/each}
                </div>
            {:else}
                <div>No items found for this filter.</div>
            {/if}
        </div>
    </div>
</div>

<style>
    button.selected {
        font-weight: bold;
        background: #444;
        color: #fff;
    }
    button {
        margin-right: 0.2rem;
        margin-bottom: 0.2rem;
        padding: 0.3rem 0.7rem;
        border-radius: 0.3rem;
        border: none;
        background: #222;
        color: #ccc;
        cursor: pointer;
    }
    button.selected {
        background: #007acc;
        color: #fff;
    }
</style>
