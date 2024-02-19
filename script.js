const game_container = document.querySelector('.game_container')
const cells_container = document.querySelector('.cells_container')
const cells = document.querySelectorAll('.cell')
const PlayerStatus = document.querySelector('.player_status')
let Player = 'X'

function getAllContent() {
  return Array.from(cells).map((cell, index) => {
    // return {cell.textContent}
    return { index: index, content: cell.textContent }
  })
}

const GameController = (function () {
  const initialGameState = () => {
    const resetData = Array.from(cells).map((cell) => {
      return (cell.textContent = '')
    })
    return resetData
  }
  const changePlayer = (Player) => {
    let newPlayer
    newPlayer = Player === 'X' ? 'O' : 'X'
    return newPlayer
  }

  const onClickPlay = () => {
    cells.forEach((cell) => {
      cell.addEventListener('click', function () {
        if (cell.textContent != '') {
          return
        }
        console.log(Player)
        cell.textContent = Player
        Player = changePlayer(Player)
        changeStatus(Player)
      })
    })
  }

  const changeStatus = (Player) => {
    PlayerStatus.textContent = `${Player}'s Turn `
  }
  return { initialGameState, changePlayer, onClickPlay, changeStatus }
})()

GameController.initialGameState()
GameController.onClickPlay()
