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
        throw Error('Error occured while ading meet up');
    }
}

export async function editMeetUpsAPI(meetup) {
    try {
        const res = await fetch(`https://svelte-course-999.firebaseio.com/meetups/${meetup.id}.json`, {
            method: "PATCH",
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
        console.log('editMeetUpsAPI error', error);
        throw Error('Error occured while editing meet up');
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
        console.log('deleting error', error);
        throw Error('Error occured while deleting meet up');
    }
}

export async function getMeetUpsAPI(that = window) {
    try {
        console.log('Called')
        const res = await that.fetch('https://svelte-course-999.firebaseio.com/meetups.json', {
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
        console.log('gteting error', error);
        throw Error('Error occured while gteting meet up');
    }
}

export async function getMeetUpByIdApi(id, that = window) {
    try {
        console.log('Called')
        const res = await that.fetch(`https://svelte-course-999.firebaseio.com/meetups/${id}.json`, {
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
        console.log('gteting error', error);
        throw Error('Error occured while gteting meet up');
    }
}