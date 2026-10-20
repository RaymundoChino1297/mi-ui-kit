<script setup>
import { TabPanel } from '@headlessui/vue';
</script>

<template>
    <TabPanel :class="[
        'mx-3 md:mx-0',
        ]">
        <slot />
    </TabPanel>
</template>
