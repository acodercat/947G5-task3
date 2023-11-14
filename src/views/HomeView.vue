<template>
  <v-app id="home">
    <NavBar />
  <v-container fluid>
    <div class="head">
      <v-row>
        <v-col cols="5">
          <div style="position: relative" class="mt-16">
            <h1 class="text-grey">Hello,</h1>
            <h1 class="text-grey">ASE puzzle game</h1>
            <span class="text-grey">Start Playing and Test yourself</span><br />
            <v-btn tile drak class="text-white mt-8" variant="outlined">Play</v-btn>
          </div>
        </v-col>
        <v-col cols="2">
          <div style="position:absolute; z-index:9999;bottom:0;margin-left:auto;margin-tight:auto;left:0;right:0;text-allign:center;">
            <v-icon> fas fa-angle-double-down</v-icon>
          </div>
        </v-col>
        <v-col cols="5">
          <div style="position:relative;z-index:9999;" class="mt-16">
            <v-img src="i1.png" contain max-height="290"></v-img>
          </div>
        </v-col>
      </v-row>  
    </div>
  </v-container>


<v-container fluid id="instructions">
   
<div class="instructions mt-16">

<InstructionsGame />
</div>
  </v-container>

<v-container fluid id="play">
   
<div class="game mt-16">

<PuzzleComponent />
</div>
  </v-container>
  </v-app>

  <v-footer class="d-flex flex-column">
    <div class="bg-teal d-flex w-100 align-center px-4">
      <strong>Advanced Software Engineering Task 3 - Group 7</strong>
      <v-spacer></v-spacer>
    </div>
    <div class="px-4 py-2 bg-black text-center w-100">
      {{ new Date().getFullYear() }} — <strong>Maohao Ran & Karim Aly</strong>
    </div>
  </v-footer>
</template>

<script>
import { defineComponent } from 'vue';

// Components

import NavBar from '@/components/NavBar.vue';
import PuzzleComponent from '@/components/PuzzleComponent.vue';
import InstructionsGame from '@/components/InstructionsGame.vue';

export default defineComponent({
  name: 'HomeView',

  components: {
    NavBar,
    PuzzleComponent,
    InstructionsGame
  },
});
</script>
<style scoped>
.v-container{
  padding: 16px 0;
}
.head{
  position: relative;
  text-align: center;
  padding: 12px;
  margin-bottom: 8px;
  height: 400px;
  width: 100%;
  color: white;
}
.head::before{
  content: "";
  position:absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 50%;
  background: pink ;
  transform: skew(0deg, 7deg);
}
.head::after{
  content: "";
  position:absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: 50%;
  background: pink ;
  transform: skew(0deg, -7deg);

}
</style>