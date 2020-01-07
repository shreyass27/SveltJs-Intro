import { writable } from "svelte/store";

function hobbiesStore() {
    const hobbies = writable([]);

    function setHobbies(hobbiesData) {
        hobbies.set(hobbiesData);
    }

    function addHobbies(hobbyName) {
        hobbies.update(items => [...items, hobbyName]);

    }

    return {
        subscribe: hobbies.subscribe,
        setHobbies,
        addHobbies
    }
}

export default hobbiesStore();