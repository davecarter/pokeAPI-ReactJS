import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const pokemons = fetch('http://pokeapi.co/api/v2/pokemon/')
  .then(response => response.json())
  .then(data => data.results)
  .catch(error => { console.log('Request failed', error) })

class Card extends Component {
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
        <div key={index} className='container'>
          <img src={url} />
          <p>{pokemon.name}</p>
        </div>
      )
    })

    return (
        <div>
          {pokemonName}
        </div>
    )
  }
}

ReactDOM.render(
  <Card pokemonsPromise={ pokemons }/>,
  document.getElementById('app')
)
