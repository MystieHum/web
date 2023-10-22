const root = document.documentElement;

function toggleTheme() {
	const currentTheme = root.classList.contains('dark') ? 'dark' : 'light';
	const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
	root.setAttribute('class', newTheme);
	localStorage.setItem('theme', newTheme);
	changeGiscusTheme();
}

function changeGiscusTheme() {
	const theme = localStorage.getItem('theme');
	function sendMessage(message) {
		const iframe = document.querySelector('iframe.giscus-frame');
		if (!iframe) return;
		iframe.contentWindow.postMessage({ giscus: message }, 'https://giscus.app');
	}
	sendMessage({
		setConfig: {
			theme: theme,
		},
	});
}

const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
	themeToggle.addEventListener('click', toggleTheme);
}

window.addEventListener('message', (event) => {
	if (event.origin === 'https://giscus.app' && event.data.giscus && themeToggle) {
		changeGiscusTheme();
	}
});

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
	root.setAttribute('class', savedTheme);
	changeGiscusTheme();
}