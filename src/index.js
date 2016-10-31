import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Card from '@schibstedspain/sui-card';
import './index.scss';

const pokemons = fetch('http://pokeapi.co/api/v2/pokemon/')
  .then(response => response.json())
  .then(data => data.results)
  .catch(error => { console.log('Request failed', error) })

class Pokewrapper extends Component {
  constructor(...args){
    super(...args)
    this.state = {
      pokemons : []
    }
  }

  componentDidMount () {
    this.props.pokemonsPromise
    .then( pokemons => this.setState({pokemons}))
  }

  render () {
    const pokemonName = this.state.pokemons.map( (pokemon, index) => {
      const url = `https://img.pokemondb.net/artwork/${pokemon.name}.jpg`
      return (
        <Card key={index} className='pokeCard'
          primary={
            <img title={pokemon.name} src={url} />
          }
          secondary={
            <div className='data'>
              <h2 className='sui-Card-title'>{pokemon.name}</h2>
              <p className='sui-Card-description'>{pokemon.weight}</p>
            </div>
          }
        />
      )
    })

    return (
        <div className='pokeWrapper'>
          {pokemonName}
        </div>
    )
  }
}

ReactDOM.render(
  <Pokewrapper pokemonsPromise={ pokemons }/>,
  document.getElementById('app')
)
