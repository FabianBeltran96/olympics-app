<template>
  <div class="medals">
    <section class="medals-section">
      <h1 class="medals-title">Medallas de oro!</h1>
      <i class="medals-icon medals-icon_gold fa-solid fa-medal"></i>
      <p class="medals-description">
        Se han otorgado {{ medallasOro }} medallas de oro!
      </p>
    </section>
    <section class="medals-section">
      <h1 class="medals-title">Medallas de plata!</h1>
      <i class="medals-icon medals-icon_silver fa-solid fa-medal"></i>
      <p class="medals-description">
        Se han otorgado {{ medallasPlata }} medallas de plata!
      </p>
    </section>
    <section class="medals-section">
      <h1 class="medals-title">Medallas de bronce!</h1>
      <i class="medals-icon medals-icon_bronze fa-solid fa-medal"></i>
      <p class="medals-description">
        Se han otorgado {{ medallasBronce }} medallas de bronce!
      </p>
    </section>
  </div>
</template>

<script>
import axios from "axios";
// import ModalComp from "@/components/ModalComp.vue";
export default {
  components: {
    // ModalComp,
  },
  data: function () {
    return {
      athletes: [],
      medallasOro: 0,
      medallasPlata: 0,
      medallasBronce: 0,
      showModal: false,
    };
  },
  methods: {
    getTotalMedals: async function () {
      let tokenStr = localStorage.getItem("token");

      let url = `http://localhost:8000/athletes`;
      axios
        .get(url, { headers: { Authorization: `Bearer ${tokenStr}` } })
        .then((response) => {
          this.athletes = response.data;
          let resultGold = [];
          let resultSilver = [];
          let resultBronze = [];

          for (const athlete of this.athletes) {
            resultGold.push(athlete.gold);
            resultSilver.push(athlete.silver);
            resultBronze.push(athlete.bronze);
          }
          this.medallasOro = this.getMedalsNumber(resultGold);
          this.medallasPlata = this.getMedalsNumber(resultSilver);
          this.medallasBronce = this.getMedalsNumber(resultBronze);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getMedalsNumber(medallas) {
      return medallas.reduce((sumatoria, actual) => sumatoria + actual, 0);
    },
  },

  created: async function () {
    try {
      this.getTotalMedals();
    } catch (error) {
      console.log(error);
    }
  },
};
</script>

<style scoped lang="scss">
.medals {
  width: 100%;
  height: 100%;

  display: flex;

  font-size: 12px;
  font-family: "Roboto", sans-serif;

  &-section {
    width: 33%;
    height: calc(100vh - 5rem);

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    background-color: rgba(255, 255, 128, 0.1);

    // box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset,
    //   rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;

    box-shadow: rgb(204, 219, 232) 3px 3px 6px 0px inset,
      rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset;
  }
  &-title {
    margin: 8px 0;
    border-bottom: 2px solid rgb(0, 0, 0);

    text-transform: uppercase;
  }

  &-icon {
    font-size: 128px;
    transition: 0.4s;
    cursor: pointer;

    &_gold {
      font-size: 8rem;
      color: #ffd700;
      &:hover {
        font-size: 192px;
      }
    }
    &_silver {
      font-size: 8rem;
      color: #c0c0c0;
      &:hover {
        font-size: 192px;
      }
    }
    &_bronze {
      font-size: 8rem;
      color: #cd7f32;
      &:hover {
        font-size: 192px;
      }
    }
  }

  &-description {
    margin: 16px 0; 
    font-size: 16px;

  }
}
</style>