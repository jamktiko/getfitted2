<script>
    import { goto } from '$app/navigation';
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
    export let showModal = false;

    function closeModal() {
        showModal = false;
        dispatch('closeModal');
    }

</script>

<div class="z-50 fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center">
    <div class="bg-gray-600 p-5 rounded-lg text-white font-mono text-sm">
        <button class="flex items-center" on:click={() => goto('/camera')}>Go to camera</button>
        <button class="flex items-center">Add from library</button>
        <button class="text-white font-bold" on:click={closeModal}>CLOSE</button>
      </div>
</div>