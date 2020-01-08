export async function addMeetUpsAPI(meetup) {
    try {
        const res = await fetch('https://svelte-course-999.firebaseio.com/meetups.json', {
            method: "POST",
            body: JSON.stringify(meetup),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (res.ok) {
            return await res.json();
        } else {
            throw Error('Error occured')
        }

    } catch (error) {
        console.log('addMeetUpsAPI error', error);
    }
}

export async function editMeetUpsAPI(meetup) {
    try {
        const res = await fetch(`https://svelte-course-999.firebaseio.com/meetups/${meetup.id}.json`, {
            method: "PUT",
            body: JSON.stringify(meetup),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (res.ok) {
            return await res.json();
        } else {
            throw Error('Error occured')
        }

    } catch (error) {
        console.log('addMeetUpsAPI error', error);
    }
}
export async function deleteMeetUpsAPI(id) {
    try {
        const res = await fetch(`https://svelte-course-999.firebaseio.com/meetups/${id}.json`, {
            method: "DELETE",
            // body: JSON.stringify(meetup),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (res.ok) {
            return await res.json();
        } else {
            throw Error('Error occured')
        }

    } catch (error) {
        console.log('addMeetUpsAPI error', error);
    }
}

export async function getMeetUpsAPI() {
    try {
        const res = await fetch('https://svelte-course-999.firebaseio.com/meetups.json', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (res.ok) {
            return await res.json();
        } else {
            throw Error('Error occured')
        }

    } catch (error) {
        console.log('addMeetUpsAPI error', error);
    }
}