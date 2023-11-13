<template>
 <v-app-bar app color="purple" dark flat class="px-12">
     <v-btn>
         <v-icon color="white" left class="mr-2">fas fa-gamepad</v-icon> Advanced Software Engineering
     </v-btn>
     <v-spacer></v-spacer>
     <v-btn text @click="scroll('home')" class="text-white"> Home</v-btn>
     <v-btn text @click="scroll('play')" class="text-white"> PLAY! </v-btn>

 </v-app-bar>
</template>

<script>
export default {
    methods :{
        scroll(refName){
           const element = document.getElementById(refName);
           element.scrollIntoView({behavior:'smooth'});
        }
    }
}
</script>

<style>

</style>