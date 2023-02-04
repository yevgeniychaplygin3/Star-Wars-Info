import React, { useState } from 'react'
import { Routes, Route, Link, NavLink, useParams, Outlet } from 'react-router-dom';

import './App.css'

const planetsData = require('./data/planets.json')
const peopleData = require('./data/people.json')
const filmData = require('./data/films.json')

function Films(){
    return (
        <>
            <aside className='scrollbarFilm'>
                    {Object.keys(filmData).map(
                        key => (
                            <div>
                                <NavLink className='sideLink' to={key}>{filmData[key].title}</NavLink>
                            </div>
                        ))}
            </aside>
            <div><Outlet/></div>

        </>
    )
}

function Film(){
    const { filmID } = useParams()
    const currentFilmData = filmData[filmID]
    return currentFilmData ? (
        <div className='content'>
            <h1>{currentFilmData.title}</h1>
            <ul>
                <li><label>Eposode: </label>{currentFilmData.episode_id}</li>
                <li><label>Opening Crawl: </label>{currentFilmData.opening_crawl}</li>
                <li><label>Director: </label>{currentFilmData.director}</li>
                <li><label>Producer: </label>{currentFilmData.producer}</li>
                <li><label>Release Date: </label>{currentFilmData.release_date}</li>
                <li><label>Characters:</label></li>{
                    Object.keys(currentFilmData.characters).map(
                        i=>
                        <li>
                            <Link to={currentFilmData.characters[i]}>{currentFilmData.characters[i]}</Link>
                        </li>
                    )
                }
                <li><label>Planets: </label></li>{
                    Object.keys(currentFilmData.planets).map(
                        i=>
                        <li>
                            <Link to={currentFilmData.planets[i]}>{currentFilmData.planets[i]}</Link>
                        </li>
                    )
                }
                
                
            </ul>
        </div>
    ) : <NotFound/>
}

function Planets(){
    return (
        <>
            <aside className='scrollbar'>
                    {Object.keys(planetsData).map(
                        key => (
                            <div >
                                <NavLink className='sideLink' to={key}>{planetsData[key].name}</NavLink>
                            </div>
                        ))}
            </aside>
            <div><Outlet/></div>
        </>
    )
}

function Planet(){
    const { planetID } = useParams()
    const currentPlanetData =  planetsData[planetID]
    return currentPlanetData? (
        <div className='content'>
            <h1>{currentPlanetData.name}</h1>
            <ul>
                <li> <label>Rotation Period: </label>{currentPlanetData.rotation_period}</li>
                <li> <label>Orbital Period: </label>{currentPlanetData.orbital_period}</li>
                <li> <label>Diameter: </label>{currentPlanetData.diameter}</li>
                <li> <label>Climate: </label>{currentPlanetData.climate}</li>
                <li> <label>Gravity: </label>{currentPlanetData.gravity}</li>
                <li> <label>Terrain: </label>{currentPlanetData.terrain}</li>
                <li> <label>Surface Water: </label>{currentPlanetData.surface_water}</li>
                <li> <label>Population: </label>{currentPlanetData.population}</li>
                <li> <label>Residents:</label>{
                    Object.keys(currentPlanetData.residents).map(
                        i=>
                        <li>
                            <Link to={currentPlanetData.residents[i]}>{currentPlanetData.residents[i]}</Link>
                        </li>
                    )
                }</li>
                
                <label>Films:</label>{
                    Object.keys(currentPlanetData.films).map(
                        i=>
                        <li>
                            <Link to={currentPlanetData.films[i]}>{currentPlanetData.films[i]}</Link>
                        </li>
                    )
                }
            </ul>
        </div>
    ) : <NotFound/>
}





function People(){
    const [mainPage, setPage] = useState("People")



    return (
        <div className='flex-container'>
            <aside className='scrollbar' >
                    {Object.keys(peopleData).map(
                        key=> (
                            <div  key={key}>
                                <NavLink onClick={()=> setPage("")} className='sideLink' to={key}> {peopleData[key].name} </NavLink>
                            </div>
                        )
                    )}
            </aside>
            <div>
                {mainPage ? <h1 id='people'>people</h1> : <Outlet/>}
            </div>
        </div>
    )
}

function Person(){
    const { person } = useParams()
    const personData = peopleData[person]
    return personData? (
        <div className='content'>
            <h1>{personData.name}</h1>
                <ul>
                    <li><label>Height: </label>{personData.height}</li>
                    <li><label>Mass: </label>{personData.mass}</li>
                    <li><label>Hair Color: </label>{personData.hair_color}</li>
                    <li><label>Skin Color: </label>{personData.skin_color}</li>
                    <li><label>Eye Color: </label>{personData.eye_color}</li>
                    <li><label>Birth Year: </label>{personData.birth_year}</li>
                    <li><label>Gender: </label>{personData.gender}</li>
                    <li><label>HomeWorld: </label> <Link to={personData.homeworld}>{personData.homeworld}</Link></li>
                    <li><label>Films: </label></li>{
                        Object.keys(personData.films).map(
                            i =>
                            <li>
                                <Link to={personData.films[i]}>{personData.films[i]}</Link>
                            </li>
                        )
                    }
                </ul>
        </div>
    ) : <NotFound/>
}

const Home = () => <h1 id='homeHeader'>A long time ago, in a galaxy far, far away...</h1>

const NotFound = () => <h1 id='homeHeader'>Page Not found</h1>

function App() {
    return (
        <>
            <ul className='navBar'>
                <NavLink className='homeLink' to="/">Home</NavLink>
                <NavLink className='navLink' to="/people">People</NavLink>
                <NavLink className='navLink' to="/planets">Planets</NavLink>
                <NavLink className='navLink' to="/films">Films</NavLink>
            </ul>
            <Routes>
                <Route path='/'>
                    <Route index element={<Home/>}/>
                    <Route path="people" element={<People/>}>
                        <Route path=':person' element={<Person/>} />
                    </Route>

                    <Route path="/planets" element={<Planets />} >
                        <Route path=':planetID' element={<Planet/>} />
                    </Route>

                    
                    <Route path="/films" element={<Films />} >
                        <Route path=':filmID' element={<Film/>} />
                    </Route>
                    <Route path='*' element={<NotFound/>}/>
                </Route>
            </Routes>
        </>
    )
}

export default App
