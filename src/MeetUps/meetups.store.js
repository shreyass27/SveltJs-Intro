import { writable } from "svelte/store";

export const meetups = writable([
    {
        id: "m1",
        title: "Coding Bootcamp",
        subTitle: "Learn to code in 2 hours",
        description:
            "In this meetup, we will have some experts that teach you how to code!",
        imageUrl:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Caffe_Nero_coffee_bar%2C_High_St%2C_Sutton%2C_Surrey%2C_Greater_London.JPG/800px-Caffe_Nero_coffee_bar%2C_High_St%2C_Sutton%2C_Surrey%2C_Greater_London.JPG",
        address: "27th Nerd Road, 32523 New York",
        contactEmail: "code@test.com",
        isFavorite: false
    },
    {
        id: "m2",
        title: "Swim Together",
        subTitle: "Let's go for some swimming",
        description: "We will simply swim some rounds!",
        imageUrl:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Olympic_swimming_pool_%28Tbilisi%29.jpg/800px-Olympic_swimming_pool_%28Tbilisi%29.jpg",
        address: "27th Nerd Road, 32523 New York",
        contactEmail: "swim@test.com",
        isFavorite: false
    }
]);


function addMeetup(meetup) {
    meetups.update(items => [
        {
            id: Math.random().toString(),
            isFavorite: false,
            ...meetup
        },
        ...items
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
    addMeetup,
    updateMeetup,
    deleteMeetup,
    toggleFavorite
};

export default customMeetup;