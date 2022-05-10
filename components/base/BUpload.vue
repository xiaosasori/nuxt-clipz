<script lang="ts">
export default {
  props: {
    outerClass: {
      type: String,
      default: 'dz-outer',
    },
    outerDraggingOverClass: {
      type: String,
      default: '',
    },
    inputDraggingOverClass: {
      type: String,
      default: 'dz-input-draggingover',
    },
    label: {
      type: String,
      default: 'Drop your file here',
    },
    files: {
      type: Array,
      required: true,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    accept: {
      type: String,
      default: '*',
    },
    maxFiles: {
      type: Number,
      default: null,
    },
  },
  emits: ['update:files'],
  data() {
    return {
      inputKey: Date.now().toString(36),
      dragging: false,
    }
  },
  watch: {
    'files.length': {
      handler(newVal, oldVal) {
        // reset input if remove a file in props.files
        if (newVal < oldVal) this.resetInput()
      },
    },
  },
  beforeUnmount() {
    for (const file of this.files) {
      URL.revokeObjectURL(file.url)
    }
  },
  methods: {
    onChange(files) {
      // Check file type match accept attribute
      if (this.accept !== '*') {
        const filesAccept = []
        for (const file of files) {
          if (file.type.match(this.accept)) {
            filesAccept.push(file)
          }
        }
        if (filesAccept.length) {
          this.receiveFiles(filesAccept)
        }
      } else {
        this.receiveFiles(files)
      }
    },
    receiveFiles(files) {
      const res = [...this.files]
      for (const file of files) {
        // https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
        const url = URL.createObjectURL(file)
        res.push({ url, file })
      }
      this.$emit('update:files', res)
    },
    resetInput() {
      this.inputKey = Date.now().toString(36)
    },
  },
}
</script>

<template>
  <div
    class="relative"
    :class="[outerClass, dragging && outerDraggingOverClass]"
  >
    <slot
      name="input"
      :on="{
        key: inputKey,
        type: 'file',
        onChange: (e) => onChange(e.target.files),
        onDragenter: () => (dragging = true),
        onDragover: (e) => e.preventDefault(),
        onDragleave: () => (dragging = false),
        onDrop: (e) => {
          e.preventDefault()
          onChange(e.dataTransfer.files)
          dragging = false
        },
      }"
    >
      <label :for="`dropzone-${inputKey}`" class="image-message">
        <span v-show="files.length === 0">{{ label }}</span>
      </label>
      <input
        :id="`dropzone-${inputKey}`"
        :key="inputKey"
        ref="input"
        type="file"
        class="dz-input"
        :multiple="multiple"
        :class="[dragging && inputDraggingOverClass]"
        :accept="accept"
        @change="onChange(($event.target as HTMLInputElement).files)"
        @dragenter="dragging = true"
        @dragover.prevent
        @dragleave="dragging = false"
        @drop.prevent="onChange($event.dataTransfer.files), (dragging = false)"
      />
    </slot>
    <slot />
  </div>
</template>

<style scoped>
.dz-outer {
  border: 1px dashed #000;
  border-radius: 4px;
  height: 100%;
  position: relative;
  width: 100%;
  min-height: 150px;
  transition: background-color 0.2s;
}
.dz-input {
  opacity: 0;
  position: absolute;
  width: 100%;
  min-height: 100px;
  height: 100%;
  left: 0;
  top: 0;
  cursor: pointer;
}
.dz-input-draggingover {
  background-color: #d4d4d4;
}
.image-message {
  font-style: italic;
  width: 100%;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
}
</style>
