document.addEventListener('DOMContentLoaded', () => {
    // document.querySelector('iframe').src = 'fourth.html';
    document.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', (evt) => {
            evt.preventDefault();
            let url = evt.target.href.split('#')[1];
            document.querySelector('iframe').src = url + '?' + Math.random();
        });
    })
})