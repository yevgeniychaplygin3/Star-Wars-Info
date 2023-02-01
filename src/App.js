import React from 'react'
import { Routes, Route, Link, NavLink, useParams, Outlet } from 'react-router-dom';

import './App.css'

const planetsData = require('./data/planets.json')
const peopleData = require('./data/people.json')

function Films(){
    return (
        <>
            <h1>Films Page</h1>
            <a href='/home'>Back to home</a>
        </>
    )
}

function Planets(){
    return (
        <>
            <h1>Planets Page</h1>
            <aside >
                <ul>
                    {Object.keys(planetsData).map(
                        key => (
                            <li>
                                <NavLink to={key}>{planetsData[key].name}</NavLink>
                            </li>
                        ))}
                </ul>
            </aside>
            <div><Outlet/></div>
        </>
    )
}

function Planet(){
    const { planetID } = useParams()
    const currentPlanetData =  planetsData[planetID]
    return (
        <>
            <h1>
                {currentPlanetData.name}
            </h1>
            <ul>
                <p>{currentPlanetData.rotation_period}</p>
                <p>{currentPlanetData.orbital_period}</p>
                <p>{currentPlanetData.diameter}</p>
                <p>{currentPlanetData.climate}</p>
                <p>{currentPlanetData.gravity}</p>
                <p>{currentPlanetData.terrain}</p>
                <p>{currentPlanetData.surface_water}</p>
                <p>{currentPlanetData.population}</p>
                <p>{currentPlanetData.residents}</p>
                <p>{currentPlanetData.films}</p>
                <p>{currentPlanetData.url}</p>
            </ul>
        </>
    )
}

function People(){
    return (
        <>
            <h1>People Page</h1>
            <aside >
                <ul className='scrollbar'>
                    {Object.keys(peopleData).map(
                        key=> (
                            <li key={key}>
                                <NavLink to={key}> {peopleData[key].name} </NavLink>
                            </li>
                        )
                    )}
                </ul>
            </aside>
            <div>
                <Outlet/>
            </div>
        </>
    )
}

function Person(){
    const { person } = useParams()
    const personData = peopleData[person]
    return(
        <>
            <h1>{personData.name}</h1>
            <div>
                <ul>
                    <p>{personData.height}</p>
                    <p>{personData.mass}</p>
                    <p>{personData.hair_color}</p>
                    <p>{personData.skin_color}</p>
                    <p>{personData.eye_color}</p>
                    <p>{personData.birth_year}</p>
                    <p>{personData.gender}</p>
                    
                    <p> <Link to={personData.homeworld}>{personData.homeworld}</Link></p>
                </ul>
            </div>
        </>
    )
}


function App() {
    return (
        <>
            <h1>
                A long time ago, in a galaxy far, far away...
            </h1>
            <ul>
                <li><NavLink to="/home">Home</NavLink></li>
                <li><NavLink to="/people">People</NavLink></li>
                <li><NavLink to="/planets">Planets</NavLink></li>
                <li><NavLink to="/films">Films</NavLink></li>
            </ul>
            <Routes>
                    <Route path="/people" element={<People />}>
                        <Route path=':person' element={<Person/>} />
                    </Route>

                    <Route path="/planets" element={<Planets />} >
                        <Route path=':planetID' element={<Planet/>} />
                    </Route>

                    
                    <Route path="/films" element={<Films />} />

            </Routes>
        </>
    )
}

export default App
