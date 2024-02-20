const game_container = document.querySelector('.game_container')
const cells_container = document.querySelector('.cells_container')
const cells = document.querySelectorAll('.cell')
const PlayerStatus = document.querySelector('.player_status')
const resetBtn = document.querySelector('.reset_btn')
let Player = 'X'
let Winner = null
let Draw = false
let gameDraw = false

// Winning Condition

const WinCells = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]
// Game Controller Functions

const GameController = (function () {
  const initialGameState = () => {
    Array.from(cells).map((cell) => {
      return (cell.textContent = '')
    })
    Player = 'X'
    Winner = null
    Draw = false
    gameDraw = false
    PlayerStatus.textContent = `${Player}'s Turn`
    // window.location.reload()
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
        // console.log(Player)
        cell.textContent = Player
        let CellContents = getAllContent()
        checkWinner(CellContents, Player)
        gameDraw = isGameDraw(CellContents, Winner)
        console.log('Game Draw', gameDraw)
        if (!Winner && !gameDraw) {
          Player = changePlayer(Player)
        }
        playerStatus(Player, Winner, gameDraw)
      })
    })
  }

  const getAllContent = () => {
    return Array.from(cells).map((cell, index) => {
      return cell.textContent
      // return { index: cell.getAttribute('cellIndex'), content: cell.textContent }
      // let obj = {}
      // let key = cell.getAttribute('cellIndex')
      // obj[key] = cell.textContent
      // return obj
    })
  }

  const checkWinner = (CellContents, Player) => {
    for (let i = 0; i < WinCells.length; i++) {
      let cell1 = WinCells[i][0]
      let cell2 = WinCells[i][1]
      let cell3 = WinCells[i][2]
      if (
        Player == CellContents[cell1] &&
        Player == CellContents[cell2] &&
        Player == CellContents[cell3]
      ) {
        Winner = Player
        console.log(Winner, 'is the Winner')
        return
      }
    }
  }

  const playerStatus = (Player, Winner, gameDraw) => {
    if (gameDraw) {
      PlayerStatus.textContent = `Game is Draw`
      return
    }
    if (!Winner && !gameDraw) {
      PlayerStatus.textContent = `${Player}'s Turn `
      return
    }
    PlayerStatus.textContent = `${Winner} is the Winner `
  }
  const isGameDraw = (CellContents, Winner) => {
    let AllCellsFilled = CellContents.every((cell) => {
      return cell != ''
    })
    if (AllCellsFilled && !Winner) {
      Draw = true
      console.log('Game Draw : ', Draw)
      return true
    } else return false
  }

  const resetData = () => {
    resetBtn.addEventListener('click', () => {
      initialGameState()
    })
  }
  return {
    initialGameState,
    onClickPlay,
    resetData,
  }
})()

GameController.onClickPlay()
GameController.resetData()
