<script lang="ts">
    //import adapter from '@sveltejs/adapter-static';
    import {browser, version} from '$app/environment';
    import {onMount} from 'svelte';
    import {MainClass} from '../lib/javascript/Logic/MainClass';
    import {ModelWalletTypes} from '$lib/javascript/Abstractions/Identity/ModelWalletTypes';
    import './../app.css';
    import {MainNavigationUrls} from '$lib/javascript/Abstractions/sessionStorage/mainNavigationUrls';
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
        await OnMountInit();
        console.log('start done');
    });

    if (browser) {
        //let fsStored = sessionStorage.getItem('isFullScreen');
        //console.log('fsStored', fsStored);
    }

    async function OnMountInit() {
        if (!browser) {
            return;
        }

        if ($MainClass.IsInitDone()) {
            return;
        }
        await $MainClass.InitAsync();
        //let fullScreen:boolean = $MainClass.SessionStorage.IsFullScreen;
        if ($MainClass.SessionStorage.IsFullScreen) {
            $MainClass.MessageProvider.SendFullScreenRequest(true);
        }
        // let mainNavigationUrls: MainNavigationUrls = $MainClass.SessionStorage.currentUrl;
        // console.log('MainNavigationUrls', MainNavigationUrls);
        // switch (mainNavigationUrls) {
        //     case MainNavigationUrls.Home:
        //         navigateToHomePage();
        //         break;
        //     case MainNavigationUrls.Deposit:
        //         navigateToDepositPage();
        //         break;
        //     case MainNavigationUrls.Information:
        //         navigateToInformationPage();
        //         break;
        //     case MainNavigationUrls.StakingPool:
        //         navigateToStakingPoolPage();
        //         break;
        //     default:
        //         navigateToHomePage();
        //         break;
        // }
    }

    // In full-screen the header of parent website (trabyter.com) is hidden and the content uses the full screen
    function toggleFullScreenMode(event: Event) {
        const checked = (event.target as HTMLInputElement).checked;
        $MainClass.SessionStorage.IsFullScreen = checked;
        $MainClass.MessageProvider.SendFullScreenRequest(checked);
        console.log('Toggle state:', checked);
    }

    function navigateToHomePage() {
        console.log('navigateToHomePage');
        $MainClass.SessionStorage.currentUrl = MainNavigationUrls.Home;
        MainNavButtonStylingUpdate('navButtonHome');
        //goto('/?canisterId=' + canisterId);
        goto('/');
    }

    function navigateToDepositPage() {
        console.log('navigateToDepositPage');
        $MainClass.SessionStorage.currentUrl = MainNavigationUrls.Deposit;
        MainNavButtonStylingUpdate('navButtonDeposit');
        goto('/pages/deposit');
        //goto('/pages/deposit?canisterId=' + canisterId);
    }

    function navigateToInformationPage() {
        console.log('navigateToInformationPage');
        $MainClass.SessionStorage.currentUrl = MainNavigationUrls.Information;
        MainNavButtonStylingUpdate('navButtonInformation');
        //goto('/pages/information?canisterId=' + canisterId);
        goto('/pages/information');
    }
    function navigateToStakingPoolPage() {
        console.log('navigateToStakingPoolPage');
        $MainClass.SessionStorage.currentUrl = MainNavigationUrls.StakingPool;
        MainNavButtonStylingUpdate('navButtonStakingPool');
        //goto('/pages/stakingpool?canisterId=' + canisterId);
        goto('/pages/stakingpool');
    }

    // Main navigation button clicked
    function MainNavButtonStylingUpdate(id: string) {
        // set other buttons to not selected
        var buttons = document.getElementsByClassName('main-header-button');
        for (var i = 0; i < buttons.length; i++) {
            var currentId = buttons[i].getAttribute('id');
            if (currentId != id) {
                buttons[i].classList.remove('main-header-button-selected');
            } else {
                buttons[i].classList.add('main-header-button-selected');
            }
        }
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
                                                            checked={$MainClass.SessionStorage.IsFullScreen}
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
