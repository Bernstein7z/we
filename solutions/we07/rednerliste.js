const input = document.querySelector('#speaker'),
    addButton = document.querySelector('button[type="submit"]');
const speakers = {};

const addSpeaker = speaker => {
    if (!Object.keys(speakers).includes(speaker)) {
        speakers[speaker] = {
            active: true,
            sec: 0
        };

        const li = document.createElement('li');
        const span = document.createElement('span');
        const button = document.createElement('button');

        span.id = `${ speaker }-li`;
        span.textContent = `${ speaker } 00:00:00 `;

        button.textContent = 'Stopp!';
        button.id = `${ speaker }-btn`;
        button.onclick = clickHandler;

        li.appendChild(span);
        li.appendChild(button);
        document.querySelector('.list').appendChild(li);

        speakers[speaker].intervalID = setInterval(timerCallback, 1000, speaker);
        input.value = '';

        for (const sp of Object.keys(speakers)) {
            if (sp !== speaker) {
                speakers[sp].active = false;
                clearInterval(speakers[sp].intervalID);
                document.querySelector(`#${ sp }-btn`).textContent = 'Start!';
            }
        }
    }
};

const timerCallback = name => {
    speakers[name].sec = speakers[name].sec + 1;

    let second = Math.floor(speakers[name].sec % 3600 % 60).toString().padStart(2, '0');
    let minute = Math.floor(speakers[name].sec % 3600 / 60).toString().padStart(2, '0');
    let hour = Math.floor(speakers[name].sec / 3600).toString().padStart(2, '0');

    document.querySelector(`#${ name }-li`).textContent = `
        ${ name } ${ hour }:${ minute }:${ second } 
    `;
};

const clickHandler = btn => {
    const id = btn.target.id;
    const speaker = id.split('-')[0];

    if (speakers[speaker].active) {
        speakers[speaker].active = false;
        clearInterval(speakers[speaker].intervalID);
        btn.target.textContent = 'Start!';
    } else {
        for (const sp of Object.keys(speakers)) {
            if (sp !== speaker) {
                speakers[sp].active = false;
                clearInterval(speakers[sp].intervalID);
                document.querySelector(`#${ sp }-btn`).textContent = 'Start!';
            } else {
                speakers[speaker].active = true;
                speakers[speaker].intervalID = setInterval(timerCallback, 1000, speaker);
                document.querySelector(`#${ sp }-btn`).textContent = 'Stopp!';
            }
        }
    }
};

input.addEventListener('keypress', event => {
    if (event.key === 'Enter' && event.target.value.length) {
        addSpeaker(event.target.value);
    }
});

addButton.addEventListener('click', () => {
    let value = input.value.toLowerCase();
    if (value.length) {
        addSpeaker(value);
    }
});
