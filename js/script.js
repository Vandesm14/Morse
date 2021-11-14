import { h, text, app } from "https://unpkg.com/hyperapp"

const store = {
	wpm: 20,
	unit: (60 / (50 * 20)) * 1000,
	running: false,
	index: 0,
	char: '',
	code: '',
	chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
}

const getDelay = (char) => {
	if (char === '•') return 1 // dot
	else if (char === '-') return 3 // dash or space
	else return 0 // unknown
}

const sleep = (milliseconds) => new Promise(resolve => setTimeout(resolve, milliseconds))

const playChar = async (wpm) => {
	const ctx = window.AudioContext ? new AudioContext() : new webkitAudioContext()
	const sound = new SoundPlayer(ctx)
	const code = store.code
	for (let i = 0; i < code.length; i++) {
		if (!store.running) return true
		const char = code[i]
		const delay = getDelay(char)
		store.index = i
		if (char === '•' || char === '-') {
			setChar(store.char)
			sound.play(800, 0.7, 'sine')
			await sleep(store.unit*delay)
			sound.stop()
			await sleep(store.unit)
		}
	}
	return true
}

const setChar = (char) => {
	store.char = char
	store.code = encode(char)
	console.log(char, store.code)
	document.getElementById('char').innerHTML = char
	document.getElementById('code1').innerHTML = store.code.slice(0, store.index + 1)
	document.getElementById('code2').innerHTML = store.code.slice(store.index + 1)
}

const random = () => {
	return store.chars[Math.floor(Math.random() * store.chars.length)]
}

const run = async () => {
	while (store.running) {
		const char = random()
		setChar(char)
		await playChar(store.wpm)
		await sleep(store.unit*7) // pause between words
	}
}

const FlipRun = (state) => {
	const running = !state.running
	store.running = running
	if (running) run()
	return {
		...state,
		running
	}
}

const ChangeWPM = (state, e) => {
	const wpm = e.target.value
	store.wpm = wpm
	store.unit = (60 / (50 * wpm)) * 1000
	return {
		...state,
		wpm: e.target.value,
		unit: store.unit
	}
}

const ChangeChars = (state, e) => {
	const chars = e.target.value
	store.chars = chars
	return {
		...state,
		chars: e.target.value
	}
}

app({
	init: store,
	view: ({ wpm, chars, running }) =>
		h('main', {}, [
			h('section', { class: 'text' }, [
				h('h1', { id: 'char' }, text('press start')),
			]),
			h('section', { class: 'text' }, [
				h('h2', { id: 'code1' }, text('-')),
				h('h2', { id: 'code2' })
			]),
			h('section', {}, [
				h('input', { type: 'number', min: 5, max: 60, oninput: ChangeWPM, value: wpm }),
				h('input', { type: 'range', min: 5, max: 60, oninput: ChangeWPM, value: wpm }),
				h('button', { onclick: FlipRun }, text(running ? 'Stop' : 'Start'))
			]),
			h('section', {}, [
				h('textarea', { oninput: ChangeChars, value: chars })
			])
		]),
	node: document.getElementById("app"),
})