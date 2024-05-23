import { LitElement, html, css } from "lit"
import { getMovieByName} from "../modules/api"

export class MyFormulario extends LitElement{

    static properties = {
        nombre: { type: String },
    }

    constructor(){
        super()
        this.nombre = ""
    }

    static styles = css`
    :root {
        --grey: #F1F0F6;
        --dark-grey: #8D8D8D;
        --light: #fff;
        --dark: #000;
        --green: #81D43A;
        --light-green: #E3FFCB;
        --blue: #1775F1;
        --light-blue: #D0E4FF;
        --dark-blue: #0C5FCD;
        --red: #FC3B56;
    }

    * {
        font-family: 'Open Sans', sans-serif;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    a {
        text-decoration: none;
    }
    
    li {
        list-style: none;
    }

    .title {
        font-size: 28px;
        font-weight: 600;
        margin-bottom: 10px;
    }
    .subtitle{
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 10px;
    }
    form{
        margin-bottom: 10px;
    }
    .breadcrumbs {
        display: flex;
        grid-gap: 6px;
        margin-bottom: 10px;
    }
    .breadcrumbs li,
    .breadcrumbs li a {
        font-size: 20px;
    }
    .breadcrumbs li a {
        color: var(--blue);
    }
    .breadcrumbs li a.active,
    .breadcrumbs li.divider {
        color: var(--dark-grey);
        pointer-events: none;
    }
    `
    render(){
        return html`
        <h1 class="title">Dashboard</h1>
        <h2 class="subtitle">Filtros</h2>
        <form>
            <label for="nombrePeli">Palabra clave</label>
            <input type="text" name="nombrePeli" id="nombrePeli" @change=${this.tomarNombre}>
        </form>
        <ul class="breadcrumbs">
            <li><a href="#" @click="${this._mostrarPeli}">Mostrar peli</a></li>
            <li class="divider">/</li>
            <li><a href="#" @click="${this._filtroAño}">Filtrar año</a></li>
            <li class="divider">/</li>
            <li><a href="#" @click="${this._filtroRango}">Filtrar rango de IMDb</a></li>
            <li class="divider">/</li>
            <li><a href="#" @click="${this._tomarTodas}">Titulos y ids de todas las peliculas</a></li>
            <li class="divider">/</li>
            <li><a href="#" @click="${this._tomarTodasOrdenadas}">Titulos y ids de todas las peliculas ordenado por año</a></li>
        </ul>
        `
    }

    tomarNombre (e) {
        this.nombre = e.srcElement.value
    }

    async _tomarTodasOrdenadas(){
        alert("Es posible que demore un poco en cargar, son 217 datos")
        let contenedor = document.querySelector(".info-data")
        contenedor.innerHTML = ""
        let arr = ['a','b','c','d','e','f','g','h','i','j','k','l', 'ñ','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
        let data
        for(let i = 0; i < arr.length; i++){
            let letra = arr[i]
            let newData = await getMovieByName(letra)
            data = newData.concat(data)
            console.log(newData)
        }
        let añoPublico = "#YEAR"
        data.sort((a, b) => b[añoPublico] + a[añoPublico])

        data.forEach(pelicula => {
            let nombrePublico = "#TITLE"
            let añoPublico = "#YEAR"
            let actorPublico = "#ACTORS"
            let imgPublico = "#IMG_POSTER"
            let rankPublico = "#RANK"
            let idPublico = "#IMDB_ID"
            contenedor.innerHTML += `
            <div class="card">
                <div class="head">
                    <div class="dataPelicula">
                        <h2>${pelicula[nombrePublico]}</h2>
                        <p><b>Año: </b>${pelicula[añoPublico]}</p>
                        <p><b>Actores: </b>${pelicula[actorPublico]}</p>
                        <p><b>Rango: </b>${pelicula[rankPublico]}</p>
                        <p><b>ID: ${pelicula[idPublico]}</b></p>
                    </div>
                </div>
                <img class="moviePoster" src="${pelicula[imgPublico]}">
            </div>
            `
        });
        
    }

    async _tomarTodas(){
        alert("Es posible que demore un poco en cargar, son 217 datos")
        let contenedor = document.querySelector(".info-data")
        contenedor.innerHTML = ""
        let arr = ['a','b','c','d','e','f','g','h','i','j','k','l', 'ñ','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
        let data
        for(let i = 0; i < arr.length; i++){
            let letra = arr[i]
            let newData = await getMovieByName(letra)
            data = newData.concat(data)
            console.log(newData)
        }
        // for(let i = 0; i < arr2.length; i++){
        //     let letra = arr2[i]
        //     let newData = await getMovieByName(letra)
        //     data = newData.concat(data)
        // }


        // console.log(data)

        //NO SE HIZO CON MAS PORQUE EXPLOTA XD

        data.forEach(pelicula => {
            let nombrePublico = "#TITLE"
            let añoPublico = "#YEAR"
            let actorPublico = "#ACTORS"
            let imgPublico = "#IMG_POSTER"
            let rankPublico = "#RANK"
            let idPublico = "#IMDB_ID"
            contenedor.innerHTML += `
            <div class="card">
                <div class="head">
                    <div class="dataPelicula">
                        <h2>${pelicula[nombrePublico]}</h2>
                        <p><b>Año: </b>${pelicula[añoPublico]}</p>
                        <p><b>Actores: </b>${pelicula[actorPublico]}</p>
                        <p><b>Rango: </b>${pelicula[rankPublico]}</p>
                        <p><b>ID: ${pelicula[idPublico]}</b></p>
                    </div>
                </div>
                <img class="moviePoster" src="${pelicula[imgPublico]}">
            </div>
            `
        });
        
    }

    async _filtroRango(){
        let data = await getMovieByName(this.nombre)
        let contenedor = document.querySelector(".info-data")
        contenedor.innerHTML = ""
        let rangoPublico = "#RANK"
        data.sort((a, b) => b[rangoPublico] + a[rangoPublico])
        data.forEach(pelicula => {
            console.log(pelicula)
            let nombrePublico = "#TITLE"
            let añoPublico = "#YEAR"
            let actorPublico = "#ACTORS"
            let imgPublico = "#IMG_POSTER"
            let rankPublico = "#RANK"
            contenedor.innerHTML += `
            <div class="card">
                <div class="head">
                    <div class="dataPelicula">
                        <h2>${pelicula[nombrePublico]}</h2>
                        <p><b>Año: </b>${pelicula[añoPublico]}</p>
                        <p><b>Actores: </b>${pelicula[actorPublico]}</p>
                        <p><b>Rango: </b>${pelicula[rankPublico]}</p>
                    </div>
                </div>
                <img class="moviePoster" src="${pelicula[imgPublico]}">
            </div>
            `
        });
    }

    async _filtroAño(){
        let data = await getMovieByName(this.nombre)
        let contenedor = document.querySelector(".info-data")
        contenedor.innerHTML = ""
        let añoPublico = "#YEAR"
        data.sort((a, b) => b[añoPublico] - a[añoPublico])
        data.forEach(pelicula => {
            let nombrePublico = "#TITLE"
            let añoPublico = "#YEAR"
            let actorPublico = "#ACTORS"
            let imgPublico = "#IMG_POSTER"
            let rankPublico = "#RANK"
            contenedor.innerHTML += `
            <div class="card">
                <div class="head">
                    <div class="dataPelicula">
                        <h2>${pelicula[nombrePublico]}</h2>
                        <p><b>Año: </b>${pelicula[añoPublico]}</p>
                        <p><b>Actores: </b>${pelicula[actorPublico]}</p>
                        <p><b>Rango: </b>${pelicula[rankPublico]}</p>
                    </div>
                </div>
                <img class="moviePoster" src="${pelicula[imgPublico]}">
            </div>
            `
        });
    }

    async _mostrarPeli() {
        let data = await getMovieByName(this.nombre)
        let contenedor = document.querySelector(".info-data")
        contenedor.innerHTML = ""
        data.forEach(pelicula => {
            console.log(pelicula)
            let nombrePublico = "#TITLE"
            let añoPublico = "#YEAR"
            let actorPublico = "#ACTORS"
            let imgPublico = "#IMG_POSTER"
            let rankPublico = "#RANK"
            contenedor.innerHTML += `
            <div class="card">
                <div class="head">
                    <div class="dataPelicula">
                        <h2>${pelicula[nombrePublico]}</h2>
                        <p><b>Año: </b>${pelicula[añoPublico]}</p>
                        <p><b>Actores: </b>${pelicula[actorPublico]}</p>
                        <p><b>Rango: </b>${pelicula[rankPublico]}</p>
                    </div>
                </div>
                <img class="moviePoster" src="${pelicula[imgPublico]}">
            </div>
            `
        });
    }

}
