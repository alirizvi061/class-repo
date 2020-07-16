import React, { Component } from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Playlist from './components/Playlist.jsx'
import playlist from './data.js'

console.table(playlist)

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      playlist: playlist,
      title: '',
      artist: '',
      time: '0:00'
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.removeSong = this.removeSong.bind(this)
  }

  handleChange (event) {
    this.setState({ [event.target.id]: event.target.value })
  }

  handleSubmit (event) {
    event.preventDefault()

    const newSong = {
      title: this.state.title,
      artist: this.state.artist,
      time: this.state.time
    }

    const updatedSongs = [ ...this.state.playlist, newSong ]

    this.setState({
      playlist: updatedSongs,
      title: '',
      artist: '',
      time: '0:00'
    })
  }

  removeSong (index) {
    const playlist = this.state.playlist
    let updatedPlaylist = playlist.filter((song, i) => i !== index)

    this.setState({
      playlist: updatedPlaylist,
    })
  }


  render() {
    return (
      <div>
        <Header />
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="title">
            Song
            <input type="text" id="title" value={this.state.title} onChange={this.handleChange} />
          </label>
          <label htmlFor="artist">
            Artist
            <input type="text" id="artist" value={this.state.artist} onChange={this.handleChange} />
          </label>
          <label htmlFor="time">
            Time
            <input type="text" id="time" value={this.state.time} onChange={this.handleChange} />
          </label>
          <label>
            <input type="submit" />
          </label>
        </form>
        <Playlist
          playlist={ this.state.playlist }
          removeSong={ this.removeSong }/>
        <Footer />
      </div>
    )
  }
}

export default App;
