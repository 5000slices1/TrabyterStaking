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
    import CreateStakingOverviewControl from '$lib/components/uiControls/Nft/CreateStakingOverviewControl.svelte';

    let data = $props();
    let nftProvider: NftProvider = $MainClass.NftProvider;
    let items: NftMetadata[] = $state([] as NftMetadata[]);
    let filteredItems: NftMetadata[] = $state([] as NftMetadata[]);
    let filter: string = $state('All');
    let createStakingForItem: NftMetadata | null = $state(null);

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
            let mdp = NftMetadataProvider.getInstance();
            if (mdp.IsEmpty()) {
                await mdp.updateAllAsync();
            }

            let allItems: NftMetadata[] = mdp.getAllNfts();

            allItems = allItems
                .filter(
                    (nft) =>
                        (nft.standard === 'ext' || nft.standard === 'legacy1.5' || nft.standard === 'legacy') &&
                        nft.dev === false,
                )
                .sort((a, b) => a.nameComparable.localeCompare(b.nameComparable));
            items = [...(allItems as NftMetadata[])];
            UpdateFilteredItems('All');
        }
    });

    function ShowCreateStakingOverlayWindow(item: NftMetadata): void {
        createStakingForItem = item;
    }
</script>

<div
    class="content-control-div"
    style="width: 100%; height: 100%;
margin-top: 0.2rem;color:white; background: white;
opacity: {createStakingForItem ? 0.7 : 1.0};
"
>
    <div class="inner-content-control-spacing" style="width: auto;">
        <!-- Filter Controls -->
        <div style="margin-bottom: 1rem;margin-left:1.6rem;">
            <button onclick={() => UpdateFilteredItems('All')} class:selected={filter === 'All'}>All</button>
            <button onclick={() => UpdateFilteredItems('0-9')} class:selected={filter === '0-9'}>0-9</button>
            {#each Array.from({length: 26}, (_, i) => String.fromCharCode(65 + i)) as letter}
                <button onclick={() => UpdateFilteredItems(letter)} class:selected={filter === letter}>{letter}</button>
            {/each}
        </div>

        <div style="margin-left:2rem;">
            {#if filteredItems.length > 0}
                <div class="items-grid">
                    {#each filteredItems as item}
                        <div class="items-item">
                            <NftOverviewControl
                                {...item}
                                on:createStakingButtonClick={() => ShowCreateStakingOverlayWindow(item)}
                            />
                        </div>
                    {/each}
                </div>
            {:else}
                <div>No items found for this filter.</div>
            {/if}
        </div>
    </div>
</div>

{#if createStakingForItem}
    <div
        style="position: fixed;
                     background: transparent; top: 50%; left: 50%;
                     transform: translate(-50%, -50%);
                     z-index: 1000;
                     "
    >
        <p style="color: white; text-align: center;">
            <CreateStakingOverviewControl
                data={createStakingForItem}
                userIcpBalance={12.3456}
                stakingDays={90}
                on:create={(event) => {
                    console.log('Create staking for days: ' + event.detail.stakingDays);
                    createStakingForItem = null;
                }}
                on:close={() => (createStakingForItem = null)}
            />
        </p>
    </div>
{/if}

<style>
    .items-grid {
        display: grid;
        grid-template-columns: 15rem repeat(auto-fit, minmax(15rem, 15rem));
        column-gap: min(4rem, 100%);
        row-gap: 2rem;
        transition: opacity 1.5s ease-in-out;
    }

    .items-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        transition: opacity 1.5s ease-in-out;
    }

    .items-item:hover {
        transform: scale(1.05);
        transition: transform 0.3s ease-in-out;
    }

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
