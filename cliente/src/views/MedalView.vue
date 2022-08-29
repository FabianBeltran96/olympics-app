<template>
  <div class="medals">
    <section class="medals-section">
      <h1 class="medals-title">Medallas de oro!</h1>
      <i
        @click="(showModal = true), (msg = 'Oro')"
        class="medals-icon medals-icon_gold fa-solid fa-medal"
      ></i>
      <p class="medals-description">
        Se han otorgado {{ medallasOro }} medallas de oro!
      </p>
    </section>
    <section class="medals-section">
      <h1 class="medals-title">Medallas de plata!</h1>
      <i
        @click="(showModal = true), (msg = 'Plata')"
        class="medals-icon medals-icon_silver fa-solid fa-medal"
      ></i>
      <p class="medals-description">
        Se han otorgado {{ medallasPlata }} medallas de plata!
      </p>
    </section>
    <section class="medals-section">
      <h1 class="medals-title">Medallas de bronce!</h1>
      <i
        @click="
          showModal = true;
          msg = 'Bronce';
        "
        class="medals-icon medals-icon_bronze fa-solid fa-medal"
      ></i>
      <p class="medals-description">
        Se han otorgado {{ medallasBronce }} medallas de bronce!
      </p>
    </section>
  </div>

  <Teleport to="body">
    <ModalComponent :msg="msg" :show="showModal" @close="showModal = false">
      <template #header> </template>
    </ModalComponent>
  </Teleport>
</template>

<script>
import axios from "axios";
import ModalComponent from "@/components/ModalComponent.vue";
import jwt_decode from "jwt-decode";
export default {
  components: {
    ModalComponent,
  },
  data: function () {
    return {
      athletes: [],
      medallasOro: 0,
      medallasPlata: 0,
      medallasBronce: 0,
      showModal: false,
      msg: "Holi",
    };
  },
  methods: {
   getTotalMedals: async function () {
      let url = `https://raw.githubusercontent.com/ag-grid/ag-grid/master/grid-packages/ag-grid-docs/src/olympicWinners.json`;
      axios
        .get(url)
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

  created() {
    this.getTotalMedals();
    let token = localStorage.getItem("token");
    let decode = jwt_decode(token);

    if (decode.usertype !== "admin") {
      this.$router.push({ path: "/error" });
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

  @media (max-width: 720px) {
    flex-direction: column;
    height: calc(100vh - 5rem);
  }

  &-section {
    width: 33%;
    height: calc(100vh - 5rem);

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    box-shadow: rgb(204, 219, 232) 3px 3px 6px 0px inset,
      rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset;

    @media (max-width: 720px) {
      width: 100%;
      height: 33%;
    }
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
    padding: 1rem 2rem;
    text-align: center;
    font-size: 16px;
  }
}
</style>
