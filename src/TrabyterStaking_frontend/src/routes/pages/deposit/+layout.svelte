<script lang="ts">
    //import './../../../app.css';
    import Icon from '$lib/assets/icons/TraByterLogo.png';
    let data = $props();
</script>

<header>This is my deposit header</header>
{@render data.children()}
<div
    style="
                                            padding-top: 0.1em;opacity: 0.85;"
>
    <img
        src={Icon}
        width="74rem"
        height="68rem"
        class="main-header-image"
        alt=""
    />
</div>
