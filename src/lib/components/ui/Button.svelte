<script lang="ts">
	export let ariaLabel: string;
</script>

<button aria-label={ariaLabel} class="btn btn-ghost btn-square btn-xs text-base-200" on:click>
	<slot />
</button>
