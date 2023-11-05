const root = document.documentElement;

if (root.classList == '') {
	root.classList.add('dark');
}

function toggleTheme() {
	const currentTheme = root.classList.contains('dark') ? 'dark' : 'light';
	const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
	root.setAttribute('class', newTheme);
	localStorage.setItem('theme', newTheme);
	changeGiscusTheme();
}

function changeGiscusTheme() {
	const theme = localStorage.getItem('theme');
	let giscusTheme = 'noborder_gray';
	if (theme) {
		giscusTheme = theme === 'dark' ? 'noborder_gray' : 'light';
	}
	function sendMessage(message) {
		const iframe = document.querySelector('iframe.giscus-frame');
		if (!iframe) return;
		iframe.contentWindow.postMessage({ giscus: message }, 'https://giscus.app');
	}
	sendMessage({
		setConfig: {
			theme: giscusTheme,
		},
	});
}

const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
	themeToggle.addEventListener('click', toggleTheme);
}

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
	root.setAttribute('class', savedTheme);
	changeGiscusTheme();
}