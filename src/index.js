import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Card from '@schibstedspain/sui-card';
import './index.scss';

const pokemons = fetch('http://pokeapi.co/api/v2/pokemon/?offset=5')
  .then(response => response.json())
  .then(data => data.results)
  .catch(error => { console.log('Request failed', error) })

class Pokewrapper extends Component {
  constructor(...args){
    super(...args)
    this.state = {
      pokemons: {}
    }
  }

  componentDidMount () {
    this.props.pokemonsPromise
    .then( pokemons => {
      const pokemonsObject = {}
      pokemons.forEach(pokemon => {
        const pokemonName = pokemon.name
        pokemonsObject[pokemonName] = pokemon
        this.setPokemonData(pokemonName)
      })

      this.setState({ pokemons: pokemonsObject })
    } )
  }

  setPokemonData (pokemonName) {
    fetch(`http://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then(response => response.json())
      .then(data => {
        // Create new pokemons object avoiding original reference to state
        let { pokemons } = this.state
        // Specific pokemon original data (name and url)
        let pokemonData = pokemons[pokemonName]
        // Merge original data with new one from the API reponse
        pokemonData = Object.assign(pokemonData, data)
        // Merge original pokemons object with new key from APi response data
        pokemons = Object.assign(pokemons, { [pokemonName]: pokemonData })
        // Finally save it to state
        this.setState( { pokemons } )
      })
  }

  render () {
    const { pokemons } = this.state
    const pokemonCard = Object.keys(pokemons).map( (pokemon, index) => {
      const pokemonData = pokemons[pokemon]
      const url = `https://img.pokemondb.net/artwork/${pokemonData.name}.jpg`
      return (
        <Card key={index} className='pokeCard'
          primary={
            <img title={pokemonData.name} src={url} />
          }
          secondary={
            <div className='data'>
              <h2 className='pokeCard-title'>{pokemonData.name}</h2>
              {pokemonData.weight && <p>Weight: {pokemonData.weight}kg</p>}
              {pokemonData.height && <p>Height: {pokemonData.height}</p>}
            </div>
          }
        />
      )
    })

    return (
        <div className='pokeWrapper'>
          {pokemonCard}
        </div>
    )
  }
}

ReactDOM.render(
  <Pokewrapper pokemonsPromise={ pokemons }/>,
  document.getElementById('app')
)
