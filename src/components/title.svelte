<script lang="ts">
	export let title: string;
	export let isPageTitle: boolean = false;
</script>

<h1 class="py-4 text-center px-40 {isPageTitle ? 'text-4xl' : 'text-2xl'}">{title}</h1>
