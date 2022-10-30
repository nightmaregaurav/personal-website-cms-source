import { Octokit } from "@octokit/rest";
import {showError} from "./message_helper";


const getUserName = async (oct) => {
    const user = await oct.users.getAuthenticated().catch(_ => {});
    let username = "";
    if(user === undefined || user === null) {
        await showError("Failed to get user information from GitHub. Please check your API key.");
        return false;
    } else {
        username = user?.data?.login ?? "";
        if(username === ""){
            await showError("Failed to get user information from GitHub. Please check your API key.");
            return false;
        }
    }
    return username;
};

const getRepo = async (oct, repo) => {
    if(repo === undefined || repo === null || repo === "") {
        await showError("No Repository provided. Please provide a valid Repository name.");
        return false;
    } else {
        const username = await getUserName(oct);
        // noinspection JSValidateTypes
        const response = await oct.repos.get({
            owner: username,
            repo,
        }).catch(_ => {});

        if(response === undefined || response === null || response.status !== 200) {
            await showError("Failed to get repository information of provided name. Please check your Repository name.");
            return false;
        }
        return true;
    }
}

export const validateGithubApiKey = async (apiKey) => {
    const octokit = new Octokit({
        auth: apiKey,
        log: null,
    });
    return await getUserName(octokit) !== false;
}

export const validateGithubRepository = async (apiKey, repo) => {
    const octokit = new Octokit({
        auth: apiKey,
        log: null,
    });
    if (await getRepo(octokit, repo) === false) return false;

    const username = await getUserName(octokit);
    const validation_file = await octokit.repos.getContent({
        owner: username,
        repo,
        path: ".from_nightmaregaurav_personal-website-cms",
    }).catch(_ => {});
    const file_sha = validation_file?.data?.sha ?? null;

    if(file_sha === null) {
        await showError("The Repository exists but does not appear to be compatible.");
        return false;
    }
    return true;
}

export const uploadFileToGithub = async (key, repo, filepath, file_content_in_base64, message="Updated via setup") => {
    message = message.trim();

    // noinspection JSCheckFunctionSignatures
    const octokit = new Octokit({
        auth: key,
        log: null,
    });

    const username = await getUserName(octokit);

    const file = await octokit.repos.getContent({
        owner: username,
        repo,
        path: filepath,
    }).catch(_ => {});

    await octokit.repos.createOrUpdateFileContents({
        owner: username,
        repo,
        message,
        path: filepath,
        content: file_content_in_base64,
        sha: file?.data?.sha ?? null,
    }).catch(_ => {
        showError("Failed to upload file to GitHub. Please try again later.");
    });
}