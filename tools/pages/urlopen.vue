<script setup>
import { toast } from "vue-sonner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

function createPage() {
  let url = document.getElementById("url-target").value;
  if (!url) {
    toast("Error", {
      description: "URL cannot be empty.",
    });
    return;
  }
  if (url.substring(0, 8) !== "https://" && url.substring(0, 7) !== "http://") {
    url = "https://" + url.split("https://").pop();
  } else if (url.substring(0, 7) == "http://") {
    url = "https://" + url.split("http://").pop();
  }
  window.open(url, "_self");
}
</script>

<template>
  <div class="flex-grow p-2 rounded-lg overflow-auto hide-scrollbar">
    <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">URL Opener</h1>
    <div class="mt-6">
      <Input id="url-target" type="url" placeholder="Enter URL here..." />
      <div class="flex py-2">
        <Button variant="secondary" class="mr-2" @click="createPage">Open Page</Button>
      </div>
    </div>
    <Alert>
      <AlertTitle>Why?</AlertTitle>
      <AlertDescription> This opens the URL in the current tab, useful for any webview exploits and such. If your school firewall has already blocked the website, this tool alone will not unblock it. </AlertDescription>
    </Alert>
  </div>
</template>
