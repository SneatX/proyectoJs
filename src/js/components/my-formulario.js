import { LitElement, html, css } from "lit"

export class MyFormulario extends LitElement{

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
        <ul class="breadcrumbs">
            <li><a href="#" @click="${this._filtroAño}">Año</a></li>
            <li class="divider">/</li>
            <li><a href="#" @click="${this._filtroActor}">Actor</a></li>
            <li class="divider">/</li>
            <li><a href="#" @click="${this._filtroRango}">Rango de IMDb</a></li>
        </ul>
        <form>
            <label for="nombrePeli">Palabra clave</label>
            <input type="text" name="nombrePeli" id="nombrePeli">
        </form>
        `
    }



}