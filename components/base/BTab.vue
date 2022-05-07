<script lang="ts" setup>
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/vue'

defineProps<{ tabs: any[] }>()
</script>

<template>
  <TabGroup>
    <TabList class="flex flex-wrap mb-4">
      <Tab v-for="tab in tabs" v-slot="{ selected }" :key="tab" as="template">
        <button
          class="flex-auto text-center block rounded py-3 px-4 transition text-white" :class="selected ? 'bg-indigo-500' : 'hover:text-indigo-400'"
        >
          {{ tab }}
        </button>
      </Tab>
    </TabList>
    <TabPanels>
      <TabPanel v-for="i in tabs.length" :key="i">
        <slot :name="`tab-${i}`" />
      </TabPanel>
    </TabPanels>
  </TabGroup>
</template>
