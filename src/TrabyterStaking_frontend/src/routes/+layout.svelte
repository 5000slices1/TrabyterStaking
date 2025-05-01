<script lang="ts">
    //import adapter from '@sveltejs/adapter-static';
    import {browser} from '$app/environment';
    import {onMount} from 'svelte';
    import {GlobalTypes} from './../lib/global/GlobalTypes';
    import {WalletTypes} from '$lib/identity/UsersIdentity';
    import {version} from '$app/environment';
    import './../app.css';
    import {goto} from '$app/navigation';
    //import {page} from '$app/state';
    //import {Artemis} from './../artemis-web3-adapter/src/index.js';

    //export let data: any;
    import IconTrabyter from '$lib/assets/icons/TraByterLogo.png';
    import Logo2 from '/logo2.svg';
    import {Console} from 'console';

    const canisterId = process.env.CANISTER_ID_TRABYTERSTAKING_FRONTEND;

    let data = $props();
    //let artemis;
    if (browser) {
        console.log(window.innerWidth);
    }
    //import {Artemis} from 'artemis-web3-adapter';

    //let artemis = new Artemis();

    onMount(async () => {
        console.log('the component has mounted');
        console.log('start init');
        if (browser) {
            if (GlobalTypes.IsInitDone()) {
                return;
            }
            await InitAsync();

            //await GlobalTypes.InitAsync();
            //artemis = new Artemis();

            //var artemisPath = './../artemis-web3-adapter/src/index.js';
            // import(artemisPath).then((module) => {
            //     artemis = new Artemis.Artemis();
            // });
            console.log('window');
            console.log(window);
        }
        //await GlobalTypes.InitAsync();
        console.log('start done');
    });

    async function InitAsync() {
        if (GlobalTypes.IsInitDone()) {
            return;
        }
        await GlobalTypes.InitAsync();
    }
    async function WalletLoginPlug() {
        if (browser) {
            await GlobalTypes.IdentityProvider.Login(WalletTypes.plug);
        }
    }

    async function WalletLogout() {
        if (browser) {
            await GlobalTypes.IdentityProvider.Logout();
        }
    }

    function navigateToHomePage() {
        console.log('navigateToHomePage');
        goto('/?canisterId=' + canisterId);
    }

    function navigateToDepositPage() {
        console.log('navigateToDepositPage');
        goto('/pages/deposit?canisterId=' + canisterId);
    }

    console.log('Hello from !');
    function InitJavascript() {
        console.log('Hello from Svelte!');
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
            <table
                cellspacing="0"
                cellpadding="0"
                style="width: 100%;height:100%"
            >
                <tbody>
                    <tr>
                        <td style="height: 0.2rem;"> </td>
                    </tr>
                    <tr>
                        <td>
                            <!-- Header section -->
                            <header class="main-header">
                                <div
                                    class="main-header-div"
                                    id="divMainMenu"
                                    style="vertical-align: top;"
                                >
                                    <table
                                        cellspacing="0"
                                        cellpadding="0"
                                        class="main-header table"
                                        style="vertical-align: top;"
                                    >
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <div
                                                        style="
                                            padding-top: 0.1em;opacity: 0.85;"
                                                    >
                                                        <img
                                                            src={IconTrabyter}
                                                            width="74rem"
                                                            height="68rem"
                                                            class="main-header-image"
                                                            alt=""
                                                        />
                                                    </div>
                                                </td>
                                                <td
                                                    style="width: 0.6em; min-width: 0.6em;"
                                                >
                                                </td>
                                                <td>
                                                    <button
                                                        class="main-header-button"
                                                        id="navButtonHome"
                                                        onclick={() =>
                                                            navigateToHomePage()}
                                                        >Home</button
                                                    >
                                                </td>
                                                <td
                                                    style="width: 1.6em; min-width: 1.6em;"
                                                ></td>

                                                <td>
                                                    <button
                                                        class="main-header-button"
                                                        id="navButtonApps"
                                                        >Staking-Pool</button
                                                    >
                                                </td>

                                                <!-- svelte-ignore element_invalid_self_closing_tag -->
                                                <td
                                                    style="width: 1.6em; min-width: 1.6em;"
                                                ></td>
                                                <td>
                                                    <button
                                                        class="main-header-button"
                                                        id="navButtonDeposit"
                                                        onclick={() =>
                                                            navigateToDepositPage()}
                                                        >Deposit</button
                                                    >
                                                </td>
                                                <td
                                                    style="width: 1.6em; min-width: 1.6em;"
                                                >
                                                </td>
                                                <td>
                                                    <button
                                                        class="main-header-button"
                                                        id="navButtonNews"
                                                        >Information</button
                                                    >
                                                </td>
                                                <td
                                                    style="width: 1.6em; min-width: 1.6em;"
                                                >
                                                </td>
                                                <!-- <td>
                    <button class="main-header-button" type="menu" id="navButtonWhitepaper">Whitepaper</button>
                </td>
                <td style="width: 1.6em; min-width: 1.6em;">
                </td>
                <td>
                    <button class="main-header-button" type="menu" id="navButtonRoadmap">Roadmap</button>
                </td> -->
                                                <td>
                                                    <!-- #region Wallet connection dropdown - hidden for now, because no usage at the moment -->
                                                    <div class="dropdown">
                                                        <button
                                                            id="buttonWalletDropDown"
                                                            type="submit"
                                                            class="walletLoginButton"
                                                            >Wallet Connection</button
                                                        >

                                                        <div
                                                            id="dropDownWalletMenu"
                                                            class="wallet-control-not-logged-in"
                                                        >
                                                            <table
                                                                cellspacing="0"
                                                                cellpadding="0"
                                                            >
                                                                <tbody>
                                                                    <tr>
                                                                        <td>
                                                                            <button
                                                                                id="loginStoic"
                                                                                type="submit"
                                                                                class="button-dropdownmenu"
                                                                                onclick={InitJavascript}
                                                                            >
                                                                                <img
                                                                                    src="../assets/icons/stoic.png"
                                                                                    width="22em"
                                                                                    height="22em"
                                                                                    alt="stoic"
                                                                                    style="float: left;margin-left: 0.4em;"
                                                                                />
                                                                                <div
                                                                                    style="margin: auto;text-align: center;margin-top: 2px;"
                                                                                >
                                                                                    Connect
                                                                                    with
                                                                                    Stoic
                                                                                </div>
                                                                            </button>
                                                                        </td></tr
                                                                    >

                                                                    <tr>
                                                                        <td>
                                                                            <button
                                                                                id="loginPlug"
                                                                                type="submit"
                                                                                class="button-dropdownmenu"
                                                                                onclick={WalletLoginPlug}
                                                                            >
                                                                                <img
                                                                                    src="../assets/icons/plug.jpg"
                                                                                    alt="plug"
                                                                                    width="22em"
                                                                                    height="22em"
                                                                                    style="float: left;margin-left: 0.4em;"
                                                                                />
                                                                                <div
                                                                                    style="margin: auto;text-align: center;margin-top: 2px;"
                                                                                >
                                                                                    Connect
                                                                                    with
                                                                                    Plug
                                                                                </div>
                                                                            </button>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <button
                                                                                id="logout"
                                                                                type="submit"
                                                                                class="button-dropdownmenu"
                                                                                onclick={WalletLogout}
                                                                            >
                                                                                <div
                                                                                    style="margin: auto;text-align: right;margin-right: 10px;  margin-top: 0px;"
                                                                                >
                                                                                    Log
                                                                                    out
                                                                                </div>
                                                                            </button>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                    <!-- #endregion Wallet connection dropdown -->
                                                </td>
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
                            <div
                                id="divMainContent"
                                style="width: 100%; height: 100%; margin-top: 0.4em;"
                            >
                                {@render data.children()}
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <!-- <footer>
        <div class="footer-div" style="width: 100%;height: 5em;background-color:white;

    ">
        </div>
    </footer> -->

                            <footer
                                id="mainpage_footer"
                                class="footer"
                                style="
    font-size: 1.0em;width: calc(100% - 1em);
    height:4em;margin-top:1em;
    "
                            >
                                <div>
                                    Join Community: <a
                                        style="color:rgb(172, 101, 15);"
                                        target="_blank"
                                        href="https://oc.app/community/ovkev-xiaaa-aaaar-asorq-cai/channel/333479041001113364768524958478479859764/?ref=tzol4-lqaaa-aaaaf-aanaq-cai"
                                        >OpenChat</a
                                    >
                                    <div class="col-sm-5">
                                        <ul
                                            class="social_icon"
                                            style="margin-left:-3.4em;"
                                        >
                                            <li>
                                                <a
                                                    target="_blank"
                                                    href="https://www.trabyter.com"
                                                    >Trabyter.com</a
                                                >
                                            </li>
                                            <li>
                                                <a
                                                    target="_blank"
                                                    href="https://www.facebook.com/mysliceinfo"
                                                    ><i class="fa fa-facebook-f"
                                                    ></i></a
                                                >
                                            </li>
                                            <li>
                                                <a
                                                    target="_blank"
                                                    href="https://x.com/trabyter_apps"
                                                    ><i class="fa fa-twitter"
                                                    ></i></a
                                                >
                                            </li>
                                            <li>
                                                <a
                                                    target="_blank"
                                                    href="https://www.youtube.com/channel/UCErWBRjdOWo_hmHNqb4yxDg"
                                                    ><i
                                                        class="fa fa-youtube-play"
                                                        aria-hidden="true"
                                                    ></i></a
                                                >
                                            </li>
                                            <li>
                                                <a
                                                    target="_blank"
                                                    href="https://github.com/5000slices1?tab=repositories"
                                                    ><i
                                                        class="fa fa-github"
                                                        aria-hidden="true"
                                                    ></i></a
                                                >
                                            </li>
                                            <li>
                                                <a
                                                    target="_blank"
                                                    href="https://t.me/mysliceinfo"
                                                    ><i
                                                        class="fa fa-telegram"
                                                        aria-hidden="true"
                                                    ></i></a
                                                >
                                            </li>
                                            <li>
                                                <a
                                                    target="_blank"
                                                    href="https://www.instagram.com/5000slices"
                                                    ><i
                                                        class="fa fa-instagram"
                                                        aria-hidden="true"
                                                    ></i></a
                                                >
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </footer>
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
