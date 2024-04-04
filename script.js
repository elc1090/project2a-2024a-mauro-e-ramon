// Get the GitHub username input form
const gitHubForm = document.getElementById('gitHubForm');

// Listen for submissions on GitHub username input form
gitHubForm.addEventListener('submit', (e) => {

    // Prevent default form submission action
    e.preventDefault();

    // Get the GitHub username input field on the DOM
    let usernameInput = document.getElementById('usernameInput');

    // Get the value of the GitHub username input field
    let gitHubUsername = usernameInput.value;
    
    // Get the repo input field on the DOM
    let repoInput = document.getElementById('repoInput');

    // Get the value of the repo input field
    let userRepository = repoInput.value;

    // Run GitHub API function, passing in the GitHub username
    requestUserRepoCommits(gitHubUsername, userRepository)
        .then(response => response.json()) // parse response into json
        .then(data => {
            // update html with data from github
            if (data.message === "Not Found") {
                let ul = document.getElementById('userRepoCommits');

                // Create variable that will create li's to be added to ul
                let li = document.createElement('li');

                // Add Bootstrap list item class to each li
                li.classList.add('list-group-item')
                // Create the html markup for each li
                li.innerHTML = (`
                    <p><strong>No account exists with username:</strong> ${gitHubUsername}</p>
                `);
                // Append each li to the ul
                ul.appendChild(li);
            } else {
                let ul = document.getElementById('userRepoCommits');

                for (let i in data) {
                    // Create variable that will create li's to be added to ul
                    let li = document.createElement('li');
                    
                    // Add Bootstrap list item class to each li
                    li.classList.add('list-group-item')
                    
                    // Create the html markup for each li
                    li.innerHTML = (`
                    <h3><strong>Author:</strong> ${data[i].commit.committer.name}</h3>
                    <p><strong>Commit Msg:</strong> ${data[i].commit.message}</p>
                    <p><strong>Data:</strong> ${data[i].commit.committer.date}</p>
                    `);
                    
                    // Append each li to the ul
                    ul.appendChild(li);
                }
                
            }
        });
})

function requestUserRepoCommits(username, reponame) {
    // create a variable to hold the `Promise` returned from `fetch`
    // return Promise.resolve(fetch(`https://api.github.com/users/${username}/repos`));
    return Promise.resolve(fetch(`https://api.github.com/repos/${username}/${reponame}/commits`));
}
