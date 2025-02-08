<script setup>
import { toast } from "vue-sonner";

useHead({
  title: "about:blank embedder - Echo Net Extras",
  meta: [
    { name: "description", content: "Welcome to my extras website! This is a collection of random tools that I have created and use somewhat regularly." },
    { property: "og:description", content: "Welcome to my extras website! This is a collection of random tools that I have created and use somewhat regularly." },
    { property: "og:title", content: "Echo Net Extras" },
  ],
});
</script>

<template>
  <div class="flex-grow p-2 rounded-lg overflow-auto hide-scrollbar">
    <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">about:blank embedder</h1>
    <div class="mt-6">
      <Input id="url-target" type="url" placeholder="Enter URL here..." />
      <div class="flex py-2">
        <Button variant="secondary" class="mr-2" @click="createPage">Create Page</Button>
        <Button variant="default" @click="clearInput">Clear Input</Button>
      </div>
    </div>
  </div>
</template>

<script>
// duck you eslint we keeping these varibles like this
/* eslint-disable prefer-const */
export default {
  methods: {
    createPage() {
      let url = document.getElementById("url-target").value;
      if (!url) {
        toast("Error", {
          description: "URL cannot be empty.", //dumbass
        });
        return;
      }
      toast("Page opened!", {
        description: "The page has been opened in a new tab.",
      });
      if (url.substring(0, 8) !== "https://" && url.substring(0, 7) !== "http://") {
        url = "https://" + url.split("https://").pop();
      } else if (url.substring(0, 7) == "http://") {
        url = "https://" + url.split("http://").pop();
      }
      const win = window.open();
      win.document.body.style.margin = "0";
      win.document.body.style.height = "100vh";
      let frm = win.document.createElement("iframe");
      frm.style.border = "none";
      frm.style.width = "100%";
      frm.style.height = "100%";
      frm.style.margin = "0";
      frm.referrerpolicy = "no-referrer";
      frm.allow = "fullscreen";
      frm.src = url;
      win.document.body.appendChild(frm);
    },
    clearInput() {
      let url = document.getElementById("url-target").value;
      if (!url) {
        toast("Error", {
          description: "Input is already empty.",
        });
        return;
      }
      document.getElementById("url-target").value = "";
      toast("Input cleared", {
        description: "The input has been cleared.",
        action: {
          label: "Undo", // we getting fancy here wow
          onClick: () => {
            document.getElementById("url-target").value = url;
          },
        },
      });
    },
  },
};
</script>
