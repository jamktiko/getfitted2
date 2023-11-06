<script>
	import { u } from '$lib/stores/userStore';
    import UserFit from '$lib/components/FitCard.svelte';
</script>

<main>
	<div
		class="text-center pb-4 xs:absolute xs:top-4 xs:right-8 xs:z-10 xs:pl-8 sm:absolute sm:top-4 sm:right-8 sm:z-10 sm:pl-10 sm:pr-10 sm:pt-2"
	>
		<button class="">
			<img src="/images/settings.png" alt="settings" class="w-9" />
		</button>
	</div>
	<div class="flex items-center justify-center profilepicdiv">
		<div class=" w-36 h-36 overflow-hidden rounded-full flex items-center sm:w-40 sm:h-40">
			<img src="/images/IMG_8468.jpeg" alt="profilepic" class=" w-full h-auto" />
		</div>
	</div>
	<div class="fullname text-black font-source text-md font-bold text-center mt-4">
		<p>
			{#each $u.fullName as name}
				{name.firstname} {name.lastname}
			{/each}
		</p>
	</div>
	<div class="username font-source text-gray-500 text-sm text-center xs:mt-1 sm:mt-1">
		<p>@{$u.userName}</p>
	</div>

	<div class="overflow-y-hidden w-400 mt-8">
		<p class="header flex justify-start text-black text-18 font-source font-semibold pl-6">
			Favourites
		</p>
		{#if $u.myLikes.length === 0}
			<div class="m-6">
				<p class="flex justify-center">You have no favourites yet...</p>
				<p />
			</div>
		{:else}
			<div class="px-4 flex flex-no-wrap overflow-x-auto scrollbar-hidden">
				{#each $u.myLikes as liked}
					<img src={liked} alt="Liked images" class="h-40 inline-block p-2" />
				{/each}
			</div>
		{/if}
	</div>
	<div class="overflow-y-hidden w-400 mt-4">
		<p class="header flex justify-start text-black text-18 font-source font-semibold pl-6">
			My outfits
		</p>
		<div class="px-4 flex flex-no-wrap overflow-x-auto scrollbar-hidden">
			{#each $u.userFits as userFit (userFit.id)}
				<img src={userFit.imageUrl} alt="My outfits" class="h-40 inline-block p-2" />
			{/each}
		</div>
	</div>
</main>
