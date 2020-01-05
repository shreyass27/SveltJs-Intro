import { readable } from 'svelte/store';

let seconds = 0;
const timer = readable(seconds, (set) => {
    const interval = setInterval(() => {
        seconds++;
        set(seconds);
    }, 1000);

    return () => {
        seconds = 0;
        clearInterval(interval);
    }
});

export default timer;