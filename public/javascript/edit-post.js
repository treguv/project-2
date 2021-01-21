

//edit function
async function editFormHandler(event) {
    event.preventDefault();

    const post_caption = document.querySelector('input[name="edit-caption"]').value.trim();
    console.log(post_caption)
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    console.log(id)
    const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            post_caption
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace(`/api/posts/viewpost/${id}`);
    } else {
        alert(response.statusText);
    }
}

document.getElementById('editform').addEventListener('submit', editFormHandler);


// delete function
async function deleteFormHandler(event) {
    event.preventDefault();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    console.log(id)
    const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        document.location.replace('/profile');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.delete-form').addEventListener('submit', deleteFormHandler);
