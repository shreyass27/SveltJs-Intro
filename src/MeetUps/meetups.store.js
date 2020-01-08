import { writable } from "svelte/store";

export const meetups = writable([]);

function setMeetup(meetupsArray) {
    meetups.set(meetupsArray);
}

function addMeetup(meetup) {
    meetups.update(items => [
        ...items,
        {
            isFavorite: false,
            ...meetup
        },
    ]);
}

function updateMeetup(id, meetUp) {
    meetups.update(items => {
        const loadedMeetups = [...items];
        const index = loadedMeetups.findIndex(item => item.id === id);
        loadedMeetups[index] = {
            ...loadedMeetups[index],
            ...meetUp
        };
        return loadedMeetups;
    });
}

function deleteMeetup(id) {
    meetups.update(items => [...items.filter(itm => itm.id !== id)]);
}

function toggleFavorite(id) {

    meetups.update(items => {
        const loadedMeetups = [...items];
        const index = loadedMeetups.findIndex(item => item.id === id);
        const updateMeetUp = { ...loadedMeetups[index] };
        updateMeetUp.isFavorite = !updateMeetUp.isFavorite;

        loadedMeetups[index] = updateMeetUp;
        return loadedMeetups;
    });
}

const customMeetup = {
    subscribe: meetups.subscribe,
    setMeetup,
    addMeetup,
    updateMeetup,
    deleteMeetup,
    toggleFavorite
};

export default customMeetup;