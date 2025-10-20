<script lang="ts">
    import {MainClass} from '$lib/javascript/Logic/MainClass';

    async function useTestMethod() {
        await $MainClass.MessageProvider.TestingEncryptedMessage();
    }
</script>

<p style="color:white;">This is page Information. Coming Soon.</p>
<button onclick={async () => await useTestMethod}>Test method</button>
