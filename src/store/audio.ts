// eslint-disable-next-line
import store from '.';

const audio = new Audio();

function secondsToMinutes(seconds: number) {
    const minutes = Math.round(seconds / 60);
    const remainderSeconds = Math.round(seconds % 60);
    const formattedMinutes = `${minutes.toString().padStart(3, '0').slice(-2)}`;
    const formattedSeconds = `${remainderSeconds.toString().padStart(3, '0').slice(-2)}`;
    return `${formattedMinutes}:${formattedSeconds}`;
}

audio.addEventListener('playing', () => {
    store.state.isPlaying = true;
});

audio.addEventListener('pause', () => {
    store.state.isPlaying = false;
});

audio.addEventListener('ended', () => {
    store.state.isPlaying = false;
});

audio.addEventListener('timeupdate', () => {
    if (audio) {
        store.state.duration = audio.duration;
        store.state.timer = secondsToMinutes(audio.currentTime);
        if (store.state.isPlaying && store.state.playbackSong) {
            const progress = (audio.currentTime * 100) / store.state.duration;
            store.state.progress = progress.toFixed(1);
            document.title = `${store.state.timer} - ${store.state.playbackSong.name}`;
        }
    }
});

audio.addEventListener('ended', () => {
    store.commit('SET_NEXT');
});

export default audio;
