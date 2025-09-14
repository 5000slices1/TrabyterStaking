<script lang="ts">
    //import adapter from '@sveltejs/adapter-static';
    import {browser} from '$app/environment';
    import {onMount} from 'svelte';
    import {MainClass} from '../lib/javascript/Logic/MainClass';
    import {ModelWalletTypes} from '$lib/javascript/Abstractions/Identity/ModelWalletTypes';
    import {version} from '$app/environment';
    import './../app.css';
    import {goto} from '$app/navigation';
    import {MessageFullScreenRequestMessage} from '$lib/javascript/Abstractions/messages/messageData/FullScreen/messageFullScreenRequestMessage';
    //import {page} from '$app/state';
    //import {Artemis} from './../artemis-web3-adapter/src/index.js';

    //export let data: any;
    import IconTrabyter from '$lib/assets/icons/TraByterLogo.png';
    import Logo2 from '/logo2.svg';
    import {Console} from 'console';

    const canisterId = process.env.CANISTER_ID_TRABYTERSTAKING_FRONTEND;
    let data = $props();
    let headerButtonSpaceWidth = '0.8em';

    if (browser) {
        console.log(window.innerWidth);
    }

    onMount(async () => {
        console.log('the component has mounted');
        console.log('start init');
        if (browser) {
            if (MainClass.IsInitDone()) {
                return;
            }
            await MainClass.InitAsync();
        }
        console.log('start done');
    });

    if (browser) {
        let fsStored = sessionStorage.getItem('isFullScreen');
        console.log('fsStored', fsStored);
    }

    // In full-screen the header of parent website (trabyter.com) is hidden and the content uses the full screen
    function toggleFullScreenMode(event: Event) {
        const checked = (event.target as HTMLInputElement).checked;

        sessionStorage.setItem('isFullScreen', checked.toString());

        MainClass.MessageProvider.SendFullScreenRequest(checked);
        console.log('Toggle state:', checked);
    }

    function navigateToHomePage() {
        console.log('navigateToHomePage');
        goto('/?canisterId=' + canisterId);
    }

    function navigateToDepositPage() {
        console.log('navigateToDepositPage');
        goto('/pages/deposit?canisterId=' + canisterId);
    }

    function navigateToInformationPage() {
        console.log('navigateToInformationPage');
        goto('/pages/information?canisterId=' + canisterId);
    }
    function navigateToStakingPoolPage() {
        console.log('navigateToStakingPoolPage');
        goto('/pages/stakingpool?canisterId=' + canisterId);
    }
</script>

<div class="main-html-content">
    <main class="main-body-content">
        <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        <div
            style="min-height: calc(100vh - 2.1em);
                   height:  calc(100vh - 2.1em);
    vertical-align: top;
    "
        >
            <table cellspacing="0" cellpadding="0" style="width: 100%;height:100%">
                <tbody>
                    <tr>
                        <td style="height: 0.2rem;"> </td>
                    </tr>
                    <tr>
                        <td>
                            <!-- Header section -->
                            <header class="main-header">
                                <div class="main-header-div" id="divMainMenu" style="vertical-align: top;">
                                    <table
                                        cellspacing="0"
                                        cellpadding="0"
                                        class="main-header table"
                                        style="vertical-align: top;"
                                    >
                                        <tbody>
                                            <tr>
                                                <td style="width: 0.6em; min-width: 0.6em;"> </td>
                                                <td>
                                                    <p style="color: white; font-size: 0.8rem;">Fullscreen</p>
                                                    <label class="switch">
                                                        <input
                                                            type="checkbox"
                                                            id="toggleSwitch"
                                                            onchange={toggleFullScreenMode}
                                                        />
                                                        <span class="slider"></span>
                                                    </label>
                                                </td>
                                                <td
                                                    style="width: {headerButtonSpaceWidth}; min-width: {headerButtonSpaceWidth};"
                                                ></td>
                                                <td>
                                                    <button
                                                        class="main-header-button"
                                                        id="navButtonHome"
                                                        onclick={() => navigateToHomePage()}>Home</button
                                                    >
                                                </td>
                                                <td
                                                    style="width: {headerButtonSpaceWidth}; min-width: {headerButtonSpaceWidth};"
                                                ></td>

                                                <td>
                                                    <button
                                                        class="main-header-button"
                                                        id="navButtonStakingPool"
                                                        onclick={() => navigateToStakingPoolPage()}>Staking-Pool</button
                                                    >
                                                </td>

                                                <!-- svelte-ignore element_invalid_self_closing_tag -->
                                                <td
                                                    style="width: {headerButtonSpaceWidth}; min-width: {headerButtonSpaceWidth};"
                                                ></td>
                                                <td>
                                                    <button
                                                        class="main-header-button"
                                                        id="navButtonDeposit"
                                                        onclick={() => navigateToDepositPage()}>Deposit</button
                                                    >
                                                </td>
                                                <td
                                                    style="width: {headerButtonSpaceWidth}; min-width: {headerButtonSpaceWidth};"
                                                ></td>
                                                <td>
                                                    <button
                                                        class="main-header-button"
                                                        id="navButtonInformation"
                                                        onclick={() => navigateToInformationPage()}>Information</button
                                                    >
                                                </td>
                                                <td
                                                    style="width: {headerButtonSpaceWidth}; min-width: {headerButtonSpaceWidth};"
                                                ></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <div></div>
                            </header>
                        </td>
                    </tr>

                    <tr style="height: 100%;vertical-align: top;">
                        <td>
                            <div id="divMainContent" style="width: 100%; height: 100%; margin-top: 0.4em;">
                                {@render data.children()}
                            </div>
                        </td>
                    </tr>
                    <tr style="height: 0.2em;"> </tr>
                </tbody>
            </table>
        </div>
    </main>
</div>

<style>
</style>
