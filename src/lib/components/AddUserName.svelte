<script>
    export let showModal = false;
    export let setUsername;
    
    let username = '';
  
    function submit() {
      setUsername(username);
      closeModal();
    }
  
    function closeModal() {
      showModal = false;
    }
  </script>
  
  {#if showModal}
    <div class="backdrop">
      <div class="modal">
        <label for="username">Username:</label>
        <input type="text" id="username" bind:value={username} />
  
        <button on:click={submit}>Submit</button>
        <button on:click={closeModal}>Cancel</button>
      </div>
    </div>
  {/if}
  