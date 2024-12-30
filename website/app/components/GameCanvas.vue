<script lang="ts">
type DefaultWidth = 800
type DefaultHeight = 450

export interface Props {
  /**
   * @default 800
   */
  width?: DefaultWidth | (number & {})
  /**
   * @default 450
   */
  height?: DefaultHeight | (number & {})
}

const DEFAULT_PROPS: Props = {
  width: 800,
  height: 450,
}
</script>

<script setup lang="ts">
defineOptions({
  name: 'GameCanvas',
  inheritAttrs: false,
})

withDefaults(defineProps<Props>(), DEFAULT_PROPS)

const { canvasRef } = useGameCanvas()
</script>

<template>
  <canvas
    ref="canvasRef"
    class="bg-slate-400 rounded-md"
    :width
    :height
  />
</template>
