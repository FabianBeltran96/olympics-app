<template>
  <div class="contenedor">
    <div class="options">
      <div class="options-group">
        <h1>Atletas por páginas</h1>
        <div class="options-radiobutton">
          <input type="radio" id="option5" value="5" v-model.number="tamaño" />
          <label for="option5">5</label>
        </div>
        <div class="options-radiobutton">
          <input
            type="radio"
            id="option10"
            value="10"
            v-model.number="tamaño"
          />
          <label for="option10">10</label>
        </div>
        <div class="options-radiobutton">
          <input
            type="radio"
            id="option20"
            value="20"
            v-model.number="tamaño"
          />
          <label for="option20">20</label>
        </div>
      </div>

      <div class="options-group">
        <h1>Filtros</h1>

        <div class="options-filter">
          <label>Pais</label>
          <input list="paises" type="search" id="pais" v-model="filtroPais" />
          <datalist id="paises">
            <option
              v-for="pais in listadoPais"
              :key="pais"
              :value="pais"
            ></option>
          </datalist>
        </div>
        <div class="options-filter">
          <label>Deporte</label>
          <input
            list="deportes"
            type="search"
            id="deporte"
            v-model="filtroDeporte"
          />

          <datalist id="deportes">
            <option
              v-for="deporte in listadoDeportes"
              :key="deporte"
              :value="deporte"
            ></option>
          </datalist>
        </div>
        <button @click="filtroActivado" class="btn-primary">
          <i class="fa-solid fa-magnifying-glass"></i>
        </button>
        <button @click="filtroDesactivado" class="btn-primary">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    </div>
    <table>
      <thead>
        <tr>
          <th scope="col">Atleta</th>
          <th class="text-center" scope="col">Edad</th>
          <th scope="col">País</th>
          <th class="text-center" scope="col">Año</th>
          <th scope="col">Fecha</th>
          <th scope="col">Deporte</th>
          <th class="text-center" scope="col">Oro</th>
          <th class="text-center" scope="col">Plata</th>
          <th class="text-center" scope="col">Bronce</th>
          <th class="text-center" scope="col">Total</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="athlete in elementosEnPagina[pagina]"
          :key="athlete.athlete + athlete.year"
        >
          <td>{{ athlete.athlete }}</td>
          <td class="text-center">{{ athlete.age }}</td>
          <td class="utility-1" @click="triggerCountry(athlete.country)">
            {{ athlete.country }}
          </td>
          <td class="text-center">{{ athlete.year }}</td>
          <td>{{ athlete.date }}</td>
          <td class="utility-1" @click="triggerSport(athlete.sport)">
            {{ athlete.sport }}
          </td>
          <td class="text-center">{{ athlete.gold }}</td>
          <td class="text-center">{{ athlete.silver }}</td>
          <td class="text-center">{{ athlete.bronze }}</td>
          <td class="text-center">{{ athlete.total }}</td>
        </tr>
      </tbody>
    </table>
  </div>

  <footer class="footer">
    <button @click="disminuirPagina" class="footer-button">
      <i class="fa-solid fa-angle-left"></i>
    </button>
    {{ pagina }} de {{ elementosEnPagina.length - 1 }}
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
      atletas: [],
      elementosEnPagina: [],
      tamaño: 20,
      pagina: 1,
      filtroDeporte: "",
      filtroPais: "",
      listadoDeportes: [],
      listadoPais: [],
    };
  },

  methods: {
    getInfo: async function () {
      let tokenStr = localStorage.getItem("token");
      let url = `http://localhost:8000/athletes`;
      await axios
        .get(url, { headers: { Authorization: `Bearer ${tokenStr}` } })
        .then((response) => {
          this.atletas = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    actualizarTabla: function () {
      let cantidad = 0;
      let pagina = [];
      let elementosEnPagina = [[]];
      this.tableFilter.forEach((athlete) => {
        if (cantidad == this.tamaño) {
          elementosEnPagina.push(pagina);
          pagina = [];
          cantidad = 0;
        } else {
          pagina.push(athlete);
          cantidad++;
        }
      });
      elementosEnPagina.push(pagina);

      this.elementosEnPagina = elementosEnPagina;
    },

    triggerCountry(Country) {
      this.filtroPais = Country;
      this.actualizarTabla();
    },
    triggerSport(Sport) {
      this.filtroDeporte = Sport;
      this.actualizarTabla();
    },

    obtenerPaises() {
      let todosPaises = [];
      for (const atleta of this.atletas) {
        todosPaises.push(atleta.country);
      }

      let paises = todosPaises.filter(function (item, pos) {
        return todosPaises.indexOf(item) == pos;
      });
      this.listadoPais = paises.sort((a, b) => a.localeCompare(b));
    },

    obtenerDeportes() {
      let todosDeportes = [];
      for (const atleta of this.atletas) {
        todosDeportes.push(atleta.sport);
      }

      let deportes = todosDeportes.filter(function (item, pos) {
        return todosDeportes.indexOf(item) == pos;
      });
      this.listadoDeportes = deportes.sort((a, b) => a.localeCompare(b));
    },

    aumentarPagina() {
      if (!(this.pagina === this.elementosEnPagina.length - 1)) {
        this.pagina++;
      }
    },

    disminuirPagina() {
      if (!(this.pagina === 1)) {
        this.pagina--;
      }
    },

    filtroActivado() {
      this.actualizarTabla();
      this.pagina = 1;
    },

    filtroDesactivado() {
      this.filtroPais = "";
      this.filtroDeporte = "";
      this.actualizarTabla();
      this.pagina = 1;
    },
  },

  watch: {
    tamaño: function () {
      this.actualizarTabla();
      this.pagina = 1;
    },
  },

  computed: {
    tableFilter() {
      if (this.atletas) {
        return this.atletas.filter(
          (item) =>
            item.sport.includes(this.filtroDeporte) &&
            item.country.includes(this.filtroPais)
        );
      } else {
        return this.atletas;
      }
    },
  },
  beforeCreate: function () {
    let token = localStorage.getItem("token");
    let decode = jwt_decode(token);

    if (decode.usertype === "admin") {
      this.$router.push({ path: "/athletes" });
    } else {
      this.$router.push({ path: "/error" });
    }
  },
  created: async function () {
    await this.getInfo();
    this.actualizarTabla();

    this.obtenerPaises();
    this.obtenerDeportes();
  },
};
</script>

<style lang="scss">
table {
  width: 100%;
  min-width: 940px;
  overflow-x: auto;

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
  background-color: rgba(255, 255, 0, 0.606);
}
thead tr {
  text-align: left;
  background: rgb(226, 226, 226);
}

td {
  color: rgb(39, 38, 38);
}

.text-center {
  text-align: center;
}
.contenedor {
  display: flex;
  flex-direction: column;
  max-width: 100vw;
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

    background: rgba(253, 212, 0, 0.5);
    border-radius: 0.5rem;
    margin: 0 1rem;

    & h1 {
      font-size: 20px;
      margin: 0 1rem;
    }
  }

  &-radiobutton,
  &-filter {
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
.btn-primary {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  padding: 6px;
  margin: 0 0.5rem;
  background: black;
  color: white;
  border: none;
  font: inherit;
  cursor: pointer;
  outline: inherit;
}

.utility-1 {
  cursor: pointer;
  transition: 1s;

  &:hover {
    background: rgb(245, 214, 60);
  }
}
</style>