<template>
  <div class="contenedor">
    <div class="options">
      <div class="options-group">
        <h1>Cantidad de elementos por páginas</h1>
        <div class="options-radiobutton">
          <input type="radio" id="option5" value="5" v-model.number="size" />
          <label for="option5">5</label>
        </div>
        <div class="options-radiobutton">
          <input type="radio" id="option10" value="10" v-model.number="size" />
          <label for="option10">10</label>
        </div>
        <div class="options-radiobutton">
          <input type="radio" id="option20" value="20" v-model.number="size" />
          <label for="option20">20</label>
        </div>
      </div>
    </div>
    <table>
      <thead>
        <tr>
          <th scope="col">Atleta</th>
          <th scope="col">Edad</th>
          <th scope="col">País</th>
          <th scope="col">Año</th>
          <th scope="col">Fecha</th>
          <th scope="col">Deporte</th>
          <th scope="col">Oro</th>
          <th scope="col">Plata</th>
          <th scope="col">Bronce</th>
          <th scope="col">Total</th>
        </tr>
      </thead>
      <tbody
        v-for="athlete in elementosEnPagina[pagina]"
        :key="athlete.athlete + athlete.year"
      >
        <tr>
          <td>{{ athlete.athlete }}</td>
          <td>{{ athlete.age }}</td>
          <td>{{ athlete.country }}</td>
          <td>{{ athlete.year }}</td>
          <td>{{ athlete.date }}</td>
          <td>{{ athlete.sport }}</td>
          <td>{{ athlete.gold }}</td>
          <td>{{ athlete.silver }}</td>
          <td>{{ athlete.bronze }}</td>
          <td>{{ athlete.total }}</td>
        </tr>
      </tbody>
    </table>
  </div>

  <footer class="footer">
    <button @click="disminuirPagina" class="footer-button">
      <i class="fa-solid fa-angle-left"></i>
    </button>
    {{ pagina }} de {{ elementosEnPagina.length }}
    <button @click="aumentarPagina" class="footer-button">
      <i class="fa-solid fa-angle-right"></i>
    </button>
  </footer>
</template>

<script>
import axios from "axios";
import jwt_decode from "jwt-decode";
export default {
  name: "AthletesView",
  props: {},

  data: function () {
    return {
      athletes: [],
      elementosEnPagina: [],
      size: 20,
      pagina: 1,
    };
  },

  methods: {
    getInfo: async function () {
      let tokenStr = localStorage.getItem("token");

      let url = `http://localhost:8000/athletes`;
      axios
        .get(url, { headers: { Authorization: `Bearer ${tokenStr}` } })
        .then((response) => {
          this.athletes = response.data;

          let quantity = 0;
          let pagina = [];
          let elementosEnPagina = [[]];
          this.athletes.forEach((athlete) => {
            if (quantity == this.size) {
              elementosEnPagina.push(pagina);
              pagina = [];
              quantity = 0;
            } else {
              pagina.push(athlete);
              quantity++;
            }
          });
          this.elementosEnPagina = elementosEnPagina;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    aumentarPagina() {
      if (!(this.pagina === this.elementosEnPagina.length)) {
        this.pagina++;
      }
    },

    disminuirPagina() {
      if (!(this.pagina === 1)) {
        this.pagina--;
      }
    },
  },

  watch: {
    size: async function () {
      this.getInfo();
    },
  },

  created() {
    try {
      this.getInfo();
    } catch (error) {
      console.log(error);
    }

    let token = localStorage.getItem("token");
    let decode = jwt_decode(token);
    console.log(decode)

    if (decode.usertype === "admin") {
      this.$router.push({ path: "/athletes" });
    } else {
      this.$router.push({ path: "/error" });
    }
  },
};
</script>

<style lang="scss">
table {
  max-width: 100vw;
  width: 100%;

  padding: 0 2rem;
  font-family: "Roboto", sans-serif;
  font-size: 18px;

  border-collapse: collapse;
}

th,
td {
  text-align: left;
  padding: 8px 16px;
  border-bottom: 1px solid #ddd;
}

tbody tr:hover {
  background-color: rgb(255, 255, 0, 0.3);
}
thead tr {
  text-align: left;
  background: rgb(226, 226, 226);
}

td {
  color: rgb(39, 38, 38);
}
.contenedor {
  display: flex;
  flex-direction: column;
  max-width: 100vw;
  //   justify-content: center;
  //   align-items: center;
  margin: 0 0 5rem 0;
}

.options {
  width: 100%;
  max-width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 1rem 0;

  font-family: "Roboto", sans-serif;
  &-group {
    display: flex;
    justify-content: center;
    align-items: center;

    background: #ddd;
    border-radius: 8px;

    & h1 {
      margin: 0 1rem;
    }
  }

  &-radiobutton {
    padding: 1rem;

    & input {
      margin: 0 8px;
    }
  }
}

.footer {
  width: 100%;
  position: fixed;
  bottom: 0;

  padding: 1.5rem;

  display: flex;
  justify-content: center;
  align-items: center;

  background: white;

  font-family: "Roboto", sans-serif;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
    rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
  &-button {
    width: 24px;
    border-radius: 50%;
    margin: 0 1rem;
    background: #fdd402;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
    & i {
      font-size: 24px;
    }
  }
}
</style>