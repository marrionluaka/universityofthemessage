<template lang="pug">
.flex.flex-col.items-center.justify-center.rounded-md.pt-2.pb-4.text-white(class="md:py-6")
  .flex.justify-start.items-center
    slot(name="title")
  slot(name="content")
</template>
