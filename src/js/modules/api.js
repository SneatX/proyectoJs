export const getMovieByName = async(name) =>{
    let res = await fetch(`https://search.imdbot.workers.dev/?q=${name}`)
    let {description} = await res.json()
    return description
}
