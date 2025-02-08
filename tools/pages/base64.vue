<template>
  <div class="flex flex-col h-screen p-2 rounded-lg overflow-auto hide-scrollbar">
    <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Base64 Converter</h1>
    <div class="flex-grow mt-6 flex space-x-4">
      <div class="w-1/2 flex flex-col">
        <Label class="mb-1">Plaintext</Label>
        <Textarea v-model="plain" class="w-full flex-grow resize-none" placeholder="Plaintext" @input="convert" />
      </div>
      <div class="w-1/2 flex flex-col">
        <Label class="mb-1">Base64</Label>
        <Textarea v-model="base64" class="w-full flex-grow resize-none" placeholder="Base64 encoded text" @input="convertRev" />
      </div>
    </div>
    <div class="flex py-2 my-2">
      <Button variant="secondary" class="mr-2" @click="toggleSepLines">
        {{ sepLines ? "Encode lines separately" : "Encode normally" }}
      </Button>
      <!--this is such a bad idea, but it looks cool and fuck the spec-->
      <Button variant="default" class="mr-2 cursor-default"> Plaintext Length: {{ textLen }} </Button>
      <Button variant="default" class="mr-2 cursor-default"> Base64 Length: {{ baseLen }} </Button>
      <Button variant="default" class="mr-2 cursor-default"> Difference: {{ lenDiff }} </Button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      plain: "",
      base64: "",
      sepLines: false,
    };
  },
  computed: {
    textLen() {
      return this.plain.length;
    },
    baseLen() {
      return this.base64.length;
    },
    lenDiff() {
      return this.base64.length - this.plain.length;
    },
  },
  methods: {
    convert() {
      try {
        if (this.sepLines) {
          const lines = this.plain.split("\n");
          this.base64 = lines.map((line) => btoa(line)).join("\n");
        } else {
          this.base64 = btoa(this.plain); // try saying btoa, it sounds funny
        }
      } catch (e) {
        this.base64 = "Error: Invalid input: " + e;
      }
    },
    convertRev() {
      try {
        if (this.sepLines) {
          const lines = this.base64.split("\n");
          this.plain = lines.map((line) => atob(line)).join("\n");
        } else {
          this.plain = atob(this.base64);
        }
      } catch (e) {
        this.plain = "Error: Invalid input: " + e;
      }
    },
    toggleSepLines() {
      this.sepLines = !this.sepLines;
      this.convert();
    },
  },
};
</script>

<style scoped>
textarea {
  resize: none;
}
textarea:focus,
input:focus {
  outline: none; /* dont make shit ugly */
}
</style>
