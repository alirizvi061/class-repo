# MERN Simple Update

We can alter the way our app looks (change CSS) based on our data.

We'll gray out our holidays based on whether or not we have celebrated them (a boolean, defaulted to `false`)

Let's write a toggle function

```js
toggleCelebrated = (holiday) => {
  fetch(baseURL + '/holidays/' + holiday._id, {
    method: 'PUT',
    body: JSON.stringify({celebrated: !holiday.celebrated}),
    headers: {
      'Content-Type' : 'application/json'
    }
  }).then(res => res.json())
  .then(resJson => {
       const copyHolidays = [...this.state.holidays]
        const findIndex = this.state.holidays.findIndex(holiday => holiday._id === resJson._id)
        copyHolidays[findIndex].celebrated = resJson.celebrated
        this.setState({holidays: copyHolidays})
  })
}
```
Add an event listener to the holiday name and toggle the css of the name. Again because we need to pass an argument we have to wrap our function in an anonymous function for our event handler

```js
<td
  onDoubleClick={() => this.toggleCelebrated(holiday)}
  className={holiday.celebrated
    ? 'celebrated'
    :
    null}
>{holiday.name} Day</td>

```


## Your turn

### Everyone

Create the functionality to increase the number of likes by clicking UPDATE

![](https://i.imgur.com/1zHLPTM.png)

Add two new `td`s
- one that has the total number of likes
- one that has the word update ( or an image of a ballon )

```js
<td>{holiday.likes}</td>
<td>UPDATE</td>
```
### Bonus

![](https://i.imgur.com/ytiCTRS.png)

Create the functionality to update all the fields with a form that pops up as a modal:

- make sure that the form is pre-populated with values

```js
 <td><img src={pencil} alt="pencil" onClick={this.toggleUpdateForm}/></td>
```
