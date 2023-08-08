<script>
    import { Button, Modal } from 'flowbite-svelte';
    import {onSuccess} from "./store.ts";
    import {createEventDispatcher} from 'svelte';

    const dispatch = createEventDispatcher();

    export let text;
    export let modalTitle;

    let show = false;

    onSuccess.subscribe(() => {
        show = false;
        dispatch('submitted', true);
    });
</script>

<Button on:click={() => show = true}>{text}</Button>

<Modal bind:open={show} title={modalTitle} outsideclose>
    <slot />
</Modal>
