const input = document.querySelector('#speaker'),
    addButton = document.querySelector('button[type="submit"]');
const speakers = {};

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

        button.id = `${ speaker }-btn`;
        button.onclick = clickHandler;

        li.appendChild(span);
        li.appendChild(button);
        document.querySelector('.list').appendChild(li);

        input.value = '';
        speakerHandler(speaker);
    }
};

const clickHandler = btn => {
    const id = btn.target.id;
    const speaker = id.split('-')[0];

    if (speakers[speaker].active) {
        setSpeakerState({
            state: false,
            buttonText: 'Start!',
            mode: 'clear',
            name: speaker
        });
    } else {
        speakerHandler(speaker);
    }
};

const speakerHandler = name => {
    for (const sp of Object.keys(speakers)) {
        let flag = sp !== name;
        setSpeakerState({
            state: !flag,
            buttonText: flag ? 'Start!' : 'Stopp!',
            mode: flag ? 'clear' : '',
            name: flag ? sp : name
        });
    }
};

const setSpeakerState = ({ state, buttonText, mode, name }) => {
    speakers[name].active = state;
    document.querySelector(`#${ name }-btn`).textContent = buttonText;

    if (mode === 'clear') clearInterval(speakers[name].intervalID);
    else speakers[name].intervalID = setInterval(timerCallback, 1000, name);
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
