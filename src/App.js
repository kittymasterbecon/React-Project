import './App.css';
import React, { Component } from 'react'
import LoadingSpiner from './LoadingSpiner';

export default class App extends Component {
  constructor(props){
    super(props)

    this.state = {
      query : "eevee",
      pokemon: "",
      err:"",
      Loading:false
    }
  }



componentDidMount(){
  this.getPokemon() 
}

  getPokemon = async () => {
    try {
      this.setState({Loading:true})
      const res = await fetch (`https://pokeapi.co/api/v2/pokemon/${this.state.query.toLowerCase()}`)
      const data = await res.json() 
      
      console.log(data)

      this.setState({
        pokemon: data ,
        err : null ,
        Loading: false

      })
    
    } catch(err){
      this.setState({
        pokemon: null,
        err,
        Loading:false

      })

    }
  }

  handleChange = e =>{
    this.setState({query: e.target.value})
  }

  handleSubmit = e =>{
    e.preventDefault()
    if (this.state.query.trim() === '') {
      this.setState({
        pokemon: null
        
      });
    } else {
      this.getPokemon();
    }


  }



  render() {

    console.log(this.state.query)

    return (
      <>
      <div className='main-div'>
        <form onSubmit={this.handleSubmit}>
          <h3>Search Pokemon</h3>
          <input type='text' value={this.state.query} onChange={this.handleChange}/>
          <input type='submit' value='Search'/>
        </form>



        {this.state.Loading ? (
          <div  >
            <LoadingSpiner />
            
          </div>
        ) : this.state.pokemon && !this.state.err  ?(
            <div className='pokemon-pic'>
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${this.state.pokemon.id}.png`} alt=''/>
            <h2 className='pokemon-name-title'>{this.state.pokemon.name}</h2>
            <h4>Weight {this.state.pokemon.weight}</h4>
            <ul>
              {this.state.pokemon.abilities.map(abil =>(
                <li>{abil.ability.name}</li>
              ))}
            </ul>
          </div>
        ) : (
          <div className='error'>
          <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Nuvola_apps_error.svg/1024px-Nuvola_apps_error.svg.png' className='img-error' alt=''></img>
          <h2> Whoops! Couldn't find that pokemon</h2>

         </div>
        )}
        

       
      </div>
      </>
    )
  }

}
