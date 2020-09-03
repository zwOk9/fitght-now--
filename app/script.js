
'use strict';

const config = {
	axios: {
		baseUrl: 'http://localhost:3000'
	}
}

const __BODY = document.body
const __MENU = config.navMenu
const __AXIOS = config.axios.baseUrl
const __CORE = document.getElementsByClassName('core')[0]
var __timer = []

const instance = axios.create({
    baseURL: __AXIOS,
    withCredentials: true,
});

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.withCredentials = true;
axios.defaults.crossDomain = true;


const iconPath = {
	BOXE: './assets/icons/iconApp/boxe.png',
	MMA: './assets/icons/iconApp/mma.png',
	defaults: './assets/icons/iconApp/defaults.png'
}
document.addEventListener('DOMContentLoaded', () => {
	/* var link = document.getElementById('notif');
	link.addEventListener('click', () => {
		showNotification();
	}); */
})
/* __BODY.classList.add('loader') */

initStructureDOM()

function initStructureDOM () {
	let elementMenuHeader = document.createElement('header')
	let getScriptElement = document.getElementsByTagName('script')[0]

	/* __MENU.forEach((menu) => { 
		let elMenuChild = document.createElement('div')
		let innerHtmlButton = document.createElement('button')
		elMenuChild.className = `button-menu button-${menu}`
		innerHtmlButton.innerHTML = `${menu.toUpperCase()}`
		elMenuChild.appendChild(innerHtmlButton)
		elementMenuHeader.appendChild(elMenuChild)
	}) */

	/* __BODY.insertBefore(elementMenuHeader, getScriptElement)
	__BODY.classList.remove('loader') */

	instance.get('/api/boxing/getFight/')
		.then( (response, err) => {
			let results = response.data.results
			buildList({results})
			__BODY.classList.remove('loader') 
		}).catch((err) => {
			console.log(err)
		})
}

function buildList({ results }) {
	let eventsFights = results
	
	
	eventsFights.forEach((event) => {
		let globalFight = document.createElement('div')
		globalFight.classList.add('fight-list')
		//icon
		let iconFight = document.createElement('div')
		iconFight.classList.add('icon')
		let iconImg = document.createElement('img')
		iconImg.src = (event.typeFight === '' || event.typeFight === undefined)  ?  iconPath.defaults : iconPath[event.typeFight.toUpperCase()]
		iconFight.appendChild(iconImg)
		globalFight.appendChild(iconFight)
		//icon-

		let linkFight = document.createElement('div')
		linkFight.classList.add('name-link')
		let nameFight = document.createElement('div')
		nameFight.classList.add('title')
		nameFight.innerHTML = event.title
		linkFight.appendChild(nameFight)
		globalFight.appendChild(linkFight)
		
		let countDown = document.createElement('div')
		let pathDown = document.createElement('p')
		countDown.classList.add('date-fight')
		countDow()
		function countDow () {
			let days, hours, minutes, seconds;
			let currentDate = new Date().getTime();
			let targetDate = new Date(event.dateFight).getTime();
			let secondsLeft = ((targetDate - currentDate) / 1000) - 1000
			days = pad( Math.floor( secondsLeft / 86400 ) )
			
			secondsLeft %= 86400
			hours = pad( Math.floor( secondsLeft / 3600 ) )
			secondsLeft %= 3600
			minutes = pad( Math.floor( secondsLeft / 60 ) )
			seconds = pad( Math.floor( secondsLeft % 60 ) )
			let countDownInner = ''
			if (days > 0) {
				countDownInner = `${days} j ${hours} h ${minutes} m ${seconds}`
			} else if (days <= 0 && hours > 0 && (minutes > 0)) {
				countDownInner = `${hours} h ${minutes} m ${seconds} s`
			}  else if (days <= 0 && hours <= 0 && (minutes > 0)) {
				countDownInner = `${minutes} m ${seconds} s`
			} else if (days <= 0 && hours <= 0 && minutes <= 0 && (seconds > 0)) {
				countDownInner = `${seconds} s`
			} else {
				countDownInner = `now`
			}
			
			pathDown.innerHTML = countDownInner
		}
		countDown.appendChild(pathDown)
		globalFight.appendChild(countDown)
		__CORE.appendChild(globalFight)

		function pad(n) {
			return (n < 10 ? '0' : '') + n;
		}
		window.setInterval(() => {
			countDow()
		}, 1000)
	})

	/* setTimeout(timerFight(), 1000) */
}

function showNotification () {
	/* chrome.browserAction.setBadgeText({text: "10+"});
	chrome.browserAction.setBadgeBackgroundColor({
		color: '#FF0000'
	}) */
	chrome.browserAction.setIcon({path: {16: "./assets/icons/default1.png"}
});
    let notification = new Notification('Notification title', {
        icon: 'http://cdn.sstatic.net/stackexchange/img/logos/so/so-icon.png',
        body: 'Hey there! You\'ve been notified!',
    });
    notification.onclick = () => {
    	window.open('http://stackoverflow.com/a/13328397/1269037')
    };
}