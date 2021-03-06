
## Extra Delete!

Let's remove a song from our playlist

**App.js**

```js
  deleteSong(index) {
    console.log(index)
  }
```

Don't forget to bind it in the constructor

```js
    this.deleteSong = this.deleteSong.bind(this)
```

Pass this function down to Songlist

```js
<Playlist playlists={this.state.playlists} addLovedSong={this.addLovedSong}
deleteSong={this.deleteSong}
/>
```

Pass this function down to Song, and add a new prop `index`

```js
<Song
  song={song}
  key={index}
  index={index} addLovedSong={this.props.addLovedSong}
  deleteSong={this.props.deleteSong}
/>
```

Add a new `td` with an x in it and trigger this onClick

```js
        <td onClick={()=>this.props.deleteSong(this.props.index)}>X</td>
```

When we click an X it should log an index position from our delete function in `App.js`

Now let's add our delete functionality. Remember this is just some dummy data - so we can just use the index position. But this isn't the 'safe' way to do it in production. You'd want to use an id number.

```js
deleteSong(index) {
  this.setState({
    playlists:{ songs: [
      ...this.state.playlists.songs.slice(0, index),
      ...this.state.playlists.songs.slice(index + 1)
    ]}
  })
}
```

The behavior of our app is weird, when we click on x it also adds it as a favorite.

Let's move our onClick to just the song title

```js
return (
  <tr key={this.props.index}>
    <td
      onClick={() => {this.props.addLovedSong(this.props.song); this.toggleLove()}}>{this.props.song.title}
    </td>
    <td>{this.props.song.artist}</td>
    <td>{this.props.song.time}</td>
    <td onClick={()=>this.props.deleteSong(this.props.index)}>X</td>
    {this.state.love ? <td>&hearts;</td> : <td></td>}
  </tr>
)
```
