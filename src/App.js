import React, { useEffect } from "react"
import { useState } from "react"
import axios from "axios"
import StaticImages from "./components/StaticImages"

const App = () => {
  // 🎉 Create useState 🎉
  const [pokemon, setPokemon] = useState("")
  const [pokemonList, setPokemonList] = useState([])
  const [pokemonData, setPokemonData] = useState([])
  const [pokemonType, setPokemonType] = useState("")
  const [pokemonAbility, setPokemonAbility] = useState([])

  // 🎁 Get pokemon list 🎁
  const getPokemonList = async () => {
    let pokemonArray = []
    for (let i = 1; i <= 200; i++)
      pokemonArray.push(await getPokemonData(i))
    setPokemonList(pokemonArray)
  }

  const getPokemonData = async (id) => {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
    return (res.data)
  }

  useEffect(() => {
    getPokemonList()
  }, [])

  // 😘 Get pokemon when press Enter 😘
  const handleChange = (e) => {
    setPokemon(e.target.value.toLowerCase())
  }

  const getPokemon = async (event) => {
    const toArray = []
    if (event.key === 'Enter') {
      try {
        checkData(pokemon)
        const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`
        const res = await axios.get(url)
        const urlAbility = res.data.abilities[0].ability.url
        const resAbility = await axios.get(urlAbility)
        setPokemonAbility(resAbility.data)
        toArray.push(res.data)
        setPokemonType(res.data.types[0].type.name)
        setPokemonData(toArray)
      } catch (e) {
        console.log(e)
      }
    }
  };

  // 🔮 Check Data Pokemon When Search 🔮
  const checkData = (pokemonCheck) => {
    let count = 0;
    pokemonList.map((data) => {
      if (pokemonCheck.toLowerCase() === data.name) {
        count++
      }
    })
    if (count == 0) {
      alert("Sorry bro! Not found pokemon. Try Again")
    }
  }
  return (
    <div className="container">
      <div className="left-screen">
        <div className="left-screen__top">
          <div className="light-container">
            <div className="light light--blue">
            </div>
          </div>
          <div className="light light--red"></div>
          <div className="light light--yellow"></div>
          <div className="light light--green"></div>
        </div>
        <div className="left-screen__bottom">
          <div className="main-screen">
            <div className="main-screen__top-lights">
            </div>
            <div id="display" className="main-screen__display">
              {pokemonData[0] ? <div className="pokemon-image"><img src={pokemonData[0].sprites["front_default"]} /></div> : <StaticImages />}
            </div>
            <div className="main-screen__speaker-light"></div>
            <div className="main-screen__speaker">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
        <div className="left-screen__joint">
          <div className="joint"></div>
          <div className="joint"></div>
          <div className="joint"></div>
          <div className="joint"></div>
          <div className="joint__reflextion"></div>
        </div>
      </div>
      <div className="right-screen">
        <div className="right-screen__top">
          <div></div>
        </div>
        <div className="right-screen__bottom">
          <div className="info-container">
            <p style={{ color: "#fff" }}>Press enter to get the result</p>
            <input onChange={handleChange} onKeyPress={getPokemon} id="search" type="text" className="awesomplete info-input" placeholder="Search Pokemon Name" list="mylist" />
            <datalist id="mylist">
              {pokemonList.map((data) => {
                return (
                  <option>{data.name}</option>
                )
              })}
            </datalist>
            <section className="info-screen">
              <div id="species" className="info">
                <div className="label">Name</div>
                {pokemonData[0] ? <div className="desc">{pokemonData[0].species.name}</div> : "_____"}
              </div>
              <div id="type" className="info">
                <div className="label">Type</div>
                {pokemonData[0] ? <div className="desc">{pokemonType}</div> : "_____"}
              </div>
              <div id="height" className="info">
                <div className="label">Height</div>
                {pokemonData[0] ? <div className="desc">0.{pokemonData[0].height}m</div> : "_____"}
              </div>
              <div id="weight" className="info">
                <div className="label">Weight</div>
                {pokemonData[0] ? <div className="desc">{Math.round(pokemonData[0].weight / 4.3)}lbs</div> : "_____"}
              </div>
              <div id="bio" className="info">
                <div className="label">Bio</div>
                {pokemonAbility.effect_entries ? <div className="desc">{pokemonAbility.effect_entries[1].short_effect}</div> : "_____"}
              </div>
              {/* Components will use in the future */}
              {/* <div id="evolution" className="info">
                <div className="label">Evolution Chain</div>
                <div className="desc">____</div>
              </div> */}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
