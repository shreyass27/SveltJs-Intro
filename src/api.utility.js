export async function addHobbiesAPI(hobby) {
    try {
        const res = await fetch('https://svelte-course-999.firebaseio.com/hobbies.json', {
            method: "POST",
            body: JSON.stringify(hobby),
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
        console.log('addHobbiesAPI error', error);
    }
}

export async function getHobbiesAPI() {
    try {
        const res = await fetch('https://svelte-course-999.firebaseio.com/hobbies.json', {
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
        console.log('addHobbiesAPI error', error);
    }
}