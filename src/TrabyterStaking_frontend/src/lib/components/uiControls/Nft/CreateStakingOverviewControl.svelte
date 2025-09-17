<script lang="ts">
    import {NftMetadata} from '$lib/javascript/Abstractions/Nft/Entrepot/NftMetadata';
    const {data, userIcpBalance, stakingDays: initialStakingDays} = $props();
    let stakingDays = $state(initialStakingDays);
</script>

<div class="nft-staking-overview">
    <!-- NFT Name -->
    <h2 class="nft-name">{data.name}</h2>

    <!-- NFT Image -->
    <img
        class="nft-image"
        src={data.avatar}
        alt={data.name}
        style="max-width: 200px; max-height: 200px; border-radius: 1rem;
        margin-bottom: 1rem;"
    />

    <!-- Staking Info -->
    <div class="staking-info">
        <p>Creating this NFT staking canister will cost <b>5 ICP</b>.</p>
        <p>Your current ICP balance: <b>{userIcpBalance.toFixed(4)} ICP</b></p>
        {#if userIcpBalance < 5}
            <p style="color: #e74c3c; font-weight: bold;">
                You need at least 5 ICP in your wallet to create a staking canister.
            </p>
        {/if}
    </div>

    <!-- Staking Days Input -->
    <div class="staking-days-input">
        <label for="staking-days">Staking duration (days):</label>
        <input id="staking-days" type="number" min="1" bind:value={stakingDays} />
    </div>

    <div class="staking-actions">
        <button class="create-btn">Create now</button>
        <button class="cancel-btn">Cancel</button>
    </div>
</div>

<style>
    .nft-staking-overview {
        display: flex;
        flex-direction: column;
        align-items: center;
        background: #23272e;
        border-radius: 1rem;
        padding: 2rem;
        color: #fff;
        border: 3px solid #000;
        box-shadow:
            0 8px 32px 0 rgba(0, 0, 0, 0.45),
            0 1.5px 8px 0 rgba(0, 0, 0, 0.25);
        max-width: 350px;
        margin: 0 auto;
        z-index: 2000;
    }
    .nft-name {
        margin-bottom: 1rem;
        font-size: 1.5rem;
        font-weight: 600;
    }
    .staking-info {
        margin-bottom: 1.5rem;
        text-align: center;
    }
    .staking-days-input {
        margin-top: 1rem;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .staking-days-input input {
        margin-top: 0.5rem;
        padding: 0.3rem 0.7rem;
        border-radius: 0.3rem;
        border: 1px solid #444;
        background: #181a20;
        color: #fff;
        width: 100px;
        text-align: center;
    }

    .staking-actions {
        display: flex;
        justify-content: center;
        gap: 1.5rem;
        margin-top: 2rem;
        width: 100%;
    }
    .staking-actions button {
        padding: 0.6rem 1.5rem;
        border-radius: 0.4rem;
        border: none;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: background 0.2s;
    }
    .create-btn {
        background: #007acc;
        color: #fff;
    }
    .create-btn:hover {
        background: #005fa3;
    }
    .cancel-btn {
        background: #444;
        color: #fff;
    }
    .cancel-btn:hover {
        background: #222;
    }
</style>
