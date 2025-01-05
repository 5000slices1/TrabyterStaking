<script lang="ts">
    //import adapter from '@sveltejs/adapter-static';
    import {browser} from '$app/environment';
    import {onMount} from 'svelte';
    import {GlobalTypes} from './../lib/global/GlobalTypes';
    import {WalletTypes} from '$lib/identity/UsersIdentity';
    import {version} from '$app/environment';
    //import {page} from '$app/state';
    //import {Artemis} from './../artemis-web3-adapter/src/index.js';

    export let data: any;

    //let artemis;
    if (browser) {
        console.log(window.innerWidth);
    }
    //import {Artemis} from 'artemis-web3-adapter';

    //let bla: string = 'hello';

    //let artemis = new Artemis();

    onMount(() => {
        console.log('xxx the component has mounted');
    });
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

    console.log('Hello from !');
    function InitJavascript() {
        console.log('Hello from Svelte!');
    }
</script>

<div class="main-html-content">
    <p>Current version: {version}</p>
    <!-- {#each data.children as child}
        {child}
    {/each} -->

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
                                    <tr>
                                        <td>
                                            <div
                                                style="
                                            padding-top: 0.1em;opacity: 0.85;"
                                            >
                                                <img
                                                    src="../assets/icons/TraByterLogo.png"
                                                    width="74rem"
                                                    height="68rem"
                                                    class="main-header-image"
                                                    alt=""
                                                />
                                            </div>
                                        </td>
                                        <td
                                            style="width: 0.6em; min-width: 0.6em;"
                                        />
                                        <td>
                                            <button
                                                class="main-header-button"
                                                id="navButtonHome">Home</button
                                            >
                                        </td>
                                        <td
                                            style="width: 1.6em; min-width: 1.6em;"
                                        />

                                        <td>
                                            <button
                                                class="main-header-button"
                                                id="navButtonApps"
                                                >Staking-Pool</button
                                            >
                                        </td>

                                        <td
                                            style="width: 1.6em; min-width: 1.6em;"
                                        />
                                        <td>
                                            <button
                                                class="main-header-button"
                                                id="navButtonNews"
                                                >Deposit</button
                                            >
                                        </td>
                                        <td
                                            style="width: 1.6em; min-width: 1.6em;"
                                        >
                                        </td><td>
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
                                                        <tr>
                                                            <button
                                                                id="loginStoic"
                                                                type="submit"
                                                                class="button-dropdownmenu"
                                                                on:click={InitJavascript}
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
                                                                    Connect with
                                                                    Stoic
                                                                </div>
                                                            </button>
                                                        </tr>

                                                        <tr>
                                                            <button
                                                                id="loginPlug"
                                                                type="submit"
                                                                class="button-dropdownmenu"
                                                                on:click={WalletLoginPlug}
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
                                                                    Connect with
                                                                    Plug
                                                                </div>
                                                            </button>
                                                        </tr>
                                                        <tr>
                                                            <button
                                                                id="logout"
                                                                type="submit"
                                                                class="button-dropdownmenu"
                                                                on:click={WalletLogout}
                                                            >
                                                                <div
                                                                    style="margin: auto;text-align: right;margin-right: 10px;  margin-top: 0px;"
                                                                >
                                                                    Log out
                                                                </div>
                                                            </button>
                                                        </tr>
                                                    </table>
                                                </div>
                                            </div>
                                            <!-- #endregion Wallet connection dropdown -->
                                        </td>
                                    </tr>
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
                        ></div>
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
            </table>
        </div>
    </main>
    ^
</div>

<style>
    .main-html-content {
        font-family: 'Montserrat', sans-serif;

        scroll-behavior: smooth;
        background-color: #0e0f2c;
        margin: 0;
        padding: 0;

        /* font-size: 62.5%; */
        min-width: 43.5rem;
        /* width: 144em; */
    }

    .main-body-content {
        height: 100%;
        margin: 0em 0.4em 0em 0.4em;
        /* margin: 1.2em 3.2em 0.4em 3.2em; */
        /* left: 0.5rm; */
    }

    /* The complete header height inclusive the sub-navigation menu height */
    .main-header {
        /* height: 17.2em; */
        height: auto;
        width: auto;
    }

    .main-header-div {
        background-color: #55557b;

        width: 100%;
        border-top-left-radius: 2.8rem;
        border-top-right-radius: 2.8rem;
        box-shadow:
            0 0.2em 0.3em rgba(255, 254, 254, 0.25),
            inset 0.4em 0.3em 0.6em rgba(255, 251, 251, 0.25);
    }

    .main-header table {
        height: 100%;
        width: auto;
        /* white-space: nowrap; */
    }
    .main-header td {
        width: 1rem;
        min-width: 6rem;

        /* white-space: nowrap; */
    }

    .main-header-image {
        margin-left: 1.5em;
        margin-top: 0.2em;
        vertical-align: middle;
    }

    .main-header td:last-child {
        width: 100%;
        text-align: end;
        padding-right: 1em;
    }

    /* #region header buttons */
    .main-header-button,
    .walletLoginButton,
    .button-dropdownmenu {
        width: 100%;

        background-color: rgba(84, 143, 232, 0.4);
        color: rgba(255, 255, 255, 0.9);
        border: 0.3em solid rgba(6, 42, 97, 0.8);

        font-size: 0.7rem;
        font-weight: bold;
        cursor: pointer;
        text-align: center;
        text-decoration: none;
        stroke: #0e0f2c;
        stroke-width: 1em;

        transition-duration: 0.4s;
        height: 2.5rem;
        border-radius: 1.8em;

        box-shadow:
            0 0.2em 0.3em rgba(255, 254, 254, 0.05),
            inset 0.2em 0.3em 0.4em rgba(255, 251, 251, 0.25);
    }

    .walletLoginButton {
        width: 16em;
        border: 0.3em solid rgba(90, 11, 54, 0.8);
    }

    .main-header-button:hover,
    .walletLoginButton:hover,
    .button-dropdownmenu:hover {
        filter: brightness(1.1);
        background-color: rgba(188, 215, 255, 0.95);
        color: rgba(6, 42, 97, 0.8);
    }

    .main-header-button-selected {
        filter: brightness(1.1);
        background-color: rgba(188, 215, 255, 0.95);
        color: rgba(6, 42, 97, 0.8);
        transition-duration: 0.8s;
    }

    /* #endregion header buttons */

    /* #region Wallet login control */

    .wallet-control-not-logged-in {
        /* display: none; */
        display: block;
        position: absolute;

        text-align: end;
        margin-left: -1rem;
        margin-top: 1.2em;
        padding-bottom: 2em;
        background-color: #55557b;
        height: 8rem;
        padding-top: 1em;
        width: 13.2rem;
        border-bottom-left-radius: 1.8em;
        border-bottom-right-radius: 1.8em;
        /* box-shadow: 0 0.4em 0.6em rgba(255, 254, 254, 0.25), inset 0.4em 0.3em 0.6em rgba(255, 251, 251, 0.25); */
        box-shadow:
            0 0.2em 0.3em rgba(255, 254, 254, 0.25),
            inset 0.2em 0.15em 0.3em rgba(255, 251, 251, 0.25);
    }

    .button-dropdownmenu {
        /* float: left; */
        height: 2.5rem;
        width: 10rem;

        margin: 0.2rem 2rem 0.4rem 1.7rem;
        cursor: pointer;
        border-radius: 0.6em;

        color: rgb(222, 218, 218);
        transition-duration: 0.1s;
    }

    /* Show the dropdown menu (use JS to add this class to the .dropdown-content container when the user clicks on the dropdown button) */
    .show {
        display: block;
    }

    .dropdown {
        position: relative;
        display: inline-block;
    }

    /* #endregion Wallet login control */

    footer {
        background-color: #14143a;

        /* padding: 0.5em, 0.5em, 0.5em, 0.5em; */

        padding-left: 0.5em;
        padding-right: 0.5em;
        padding-top: 0.6em;

        color: #ffffff;
        border: 1px solid #000000;
        box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.1),
            0 1px 2px rgba(0, 0, 0, 0.25);
        z-index: 10;
        position: block;
        bottom: 0em;
        left: 0;
    }

    ul.social_icon {
        float: center;
        padding-top: 0.1em;
    }

    ul.social_icon li {
        display: inline-block;
        padding-right: 0.5em;
        padding-left: 1em;
    }

    ul.social_icon li:last-child {
        padding-right: 0;
    }

    ul.social_icon li a {
        color: #fefeff;
        display: inline-block;
        text-align: center;
        line-height: 0.5em;
        border-radius: 100%;
        font-size: 1em;
        font-weight: bold;
    }

    ul.social_icon li a:hover {
        color: #6dcff6;
        transition: ease-in all 0.2s;
    }

    .content-control-div-header-text {
        font-size: 2.5em;
        font-weight: bold;
        color: rgba(228, 235, 255, 1);
        font-family: 'Montserrat', sans-serif;
        text-align: left;
        margin-top: 0.5em;
        margin-bottom: 0.5em;
        letter-spacing: 0.072em;
        -webkit-text-stroke: 0.057em #060606;
        paint-order: stroke fill;
    }

    .inner-content-control-spacing {
        padding-left: 2em;
        padding-right: 2em;
        padding-top: 2em;
        padding-bottom: 2em;
    }
</style>
