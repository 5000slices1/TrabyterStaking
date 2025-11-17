<script lang="ts">
    import {derived} from 'svelte/store';
    import {MainClass} from '$lib/javascript/Logic/MainClass';

    let data = $props();

    // Create a derived store that automatically tracks MainClass changes
    const UsersIdentity = derived(MainClass, ($main) => $main.UsersIdentity);
</script>

<header>This is my wallet header</header>
{@render data.children()}

{#if $UsersIdentity.IsConnected}
    <p>Wallet connected: {$UsersIdentity.AccountPrincipalText}</p>
    <p>Account ID: {$UsersIdentity.AccountId}</p>
    <p>Wallet Name: {$UsersIdentity.Name}</p>
    <p>Wallet Type: {$UsersIdentity.Type}</p>
{:else}
    <p>Please connect your wallet</p>
{/if}
