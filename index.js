const core = require('@actions/core');
const Octokit = require("@octokit/rest");

async function run() {
    try {
        const labels = core.getInput('labels');
        const token = core.getInput('token');
        let octokit;
        if (token) {
            octokit = new Octokit({
                auth: `token ${token}`
            });
        } else {
            octokit = new Octokit();
        }
        const [owner, repo] = process.env.GITHUB_REPOSITORY.split("/");

        const response = await octokit.issues.listForRepo({
            owner,
            repo,
            labels,
        });

        const issues = response.data;
        const randomIssue = issues[Math.floor(Math.random() * issues.length)]

        core.setOutput('title', randomIssue.title);
        core.setOutput('htmlUrl', randomIssue.html_url);
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();