<script lang="ts">
    import {derived} from 'svelte/store';
    import {MainClass} from '$lib/javascript/Logic/MainClass';

    let data = $props();

    // Create a derived store that automatically tracks MainClass changes
    const UsersIdentity = derived(MainClass, ($main) => $main.UsersIdentity);
</script>

<header>This is my wallet header</header>
{@render data.children()}

<p>{$UsersIdentity.IsConnected}</p>
<p>{$UsersIdentity.AccountPrincipalText}</p>

{#if $UsersIdentity.IsConnected}
    <p>Wallet connected: {$UsersIdentity.AccountPrincipalText}</p>
{:else}
    <p>Please connect your wallet</p>
{/if}
