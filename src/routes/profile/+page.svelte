<script>
    import { u } from '$lib/stores/userStore';
</script>

<div class="settings">
    <button class="settingsbutton">
      <img src="/images/settings.png" alt="settings" class="buttonimg" />
    </button>
  </div>
  <div class="profilepicdiv">
    <img src="/images/image 7 (1).png" alt="profilepic" class="profilepic" />
  
    <div class="fullname">
        <p>
            {#each $u.fullName as name}
                {name.firstname} {name.lastname}
            {/each}
        </p>
    </div>
    <div class="username"><p>@{$u.userName}</p></div>
  </div>
  <div class="favourites">
    <p class="header">Favourites</p>
    <div class="pics">
      <img src="/images/image 1.png" alt="asu" class="onepic" />
      <img src="/images/image 1.png" alt="asu" class="onepic" />
      <img src="/images/image 1.png" alt="asu" class="onepic" />
    </div>
  </div>
  <div class="myoutfits">
    <p class="header">My outfits</p>
    <div class="pics">
      <img src="/images/image 1.png" alt="asu" class="onepic" />
      <img src="/images/image 1.png" alt="asu" class="onepic" />
    </div>
  </div>