function calculate() {
    event.preventDefault()

    let text = document.getElementById('result').innerText
    text = text.slice(0, text.indexOf(':') + 1) + ' '
    const currentCalculator = Array.from(document.getElementsByName('radio')).find(radio => radio.checked)

    let elo = Number(document.getElementById('eloInput').value)
    let matches = Number(document.getElementById('matchesInput').value)
    let winRate = Number(document.getElementById('winRateInput').value) / 100
    if (!(winRate >= 0 && winRate <= 1)) return
    const lossRate = 1 - winRate
    const eloPerWin = 25
    let WinsOverLosses = Math.ceil(elo / eloPerWin)
    let WinsOverLossesRate = Number(winRate - lossRate).toPrecision(4)

    switch (currentCalculator?.value) {
        case 'WinRate':
            winRate = Number(((matches - WinsOverLosses) / 2 + WinsOverLosses) / matches * 100).toPrecision(4)
            document.getElementById('result').innerText = text + winRate + '%'
            break
        case 'Matches':
            matches = Math.ceil(WinsOverLosses / WinsOverLossesRate)
            document.getElementById('result').innerText = text + matches
            break
        case 'Elo':
            elo = Number(WinsOverLossesRate * matches * eloPerWin).toFixed()
            document.getElementById('result').innerText = text + elo + ' elo'
            break
    }
}

function selectCalculator(calculator) {
    let text
    switch (calculator) {
        case 'winRate':
            text = 'WinRate needed:'
            break
        case 'matches':
            text = 'Matches needed:'
            break
        case 'elo':
            text = 'You will get:'
            break
    }
    document.getElementById('result').innerText = text
    document.getElementById('main').style.display = 'flex'
    document.getElementById('calculateBtn').style.display = 'inline-block'
    const targetCalculator = document.getElementById(calculator)
    const calculators = document.getElementsByName('calculator')

    for (var i = 0; i < calculators.length; i++) {
        if (calculators[i] !== targetCalculator) {
            calculators[i].style.display = 'list-item'
        }
    }

    targetCalculator.style.display = 'none'
}