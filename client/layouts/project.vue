<template>
  <div class="w-100dvw h-100dvh px-12px py-16px">
    <div class="flex-c gap-12px">
      <ProjectComboBox />
      <Button>
        <Icon name="lucide:plus" />
      </Button>
    </div>
    <slot />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
