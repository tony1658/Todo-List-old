<script lang="ts">
	export let title: string;
	export let isPageTitle: boolean = false;
</script>

<h1 class="py-4 px-40 text-center {isPageTitle ? 'text-4xl' : 'text-2xl'}">{title}</h1>
