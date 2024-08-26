<template>
  <v-btn
    :color="props.color"
    :size="props.size"
    :disabled="!props.enabled || props.loading"
    :loading="props.loading"
    :class="['w-full', props.class]"
    :block="props.block"
    @click="handleClick"
    :type="props.type"
  >
    <slot />
  </v-btn>
</template>

<script lang="ts" setup>
const emits = defineEmits(["click"]);
const props = defineProps({
  type: {
    type: String,
    default: "button",
  },
  color: {
    type: String,
    default: "primary-400",
  },
  size: {
    type: String,
    default: "large",
  },
  enabled: {
    type: Boolean,
    default: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  block: {
    type: Boolean,
    default: false,
  },
  class: {
    type: String,
    default: "",
  },
});

const handleClick = () => {
  emits("click");
};
</script>
