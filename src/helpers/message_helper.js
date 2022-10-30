import { toast } from 'react-toastify';

export var lastMessage = null;
export var lastToastTime = null;
const repeatedToastInterval = 2;
const nonRepeatableMessages = ["Session Expired."];
const ignoreErrorMessages = ["token not found."]

export const sendNotification = async (message="Notification message") => {
    if(!(nonRepeatableMessages.includes(message) && lastMessage === message && Math.round((new Date() - lastToastTime) / 1000) < repeatedToastInterval)){
        toast(message);
        lastMessage = message;
        lastToastTime = new Date();
    }
};
export const giveInfo = async (message="Info message") => {
    if(!(nonRepeatableMessages.includes(message) && lastMessage === message && Math.round((new Date() - lastToastTime) / 1000) < repeatedToastInterval)){
        toast.info(message);
        lastMessage = message;
        lastToastTime = new Date();
    }
};
export const giveWarning = async (message="Warning message") => {
    if(!(nonRepeatableMessages.includes(message) && lastMessage === message && Math.round((new Date() - lastToastTime) / 1000) < repeatedToastInterval)) {
        toast.warn(message);
        lastMessage = message;
        lastToastTime = new Date();
    }
};
export const showSuccess = async (message="Success message") => {
    if(!(nonRepeatableMessages.includes(message) && lastMessage === message && Math.round((new Date() - lastToastTime) / 1000) < repeatedToastInterval)) {
        toast.success(message);
        lastMessage = message;
        lastToastTime = new Date();
    }
};
export const showError = async (message="Error message") => {
    if(!ignoreErrorMessages.includes(message.toLowerCase())){
        if(!(nonRepeatableMessages.includes(message) && lastMessage === message && Math.round((new Date() - lastToastTime) / 1000) < repeatedToastInterval)) {
            toast.error(message);
            lastMessage = message;
            lastToastTime = new Date();
        }
    }
}
export const showProgress = async (promise, start_message="Work in progress", success_message="Success", failure_message="Failed") => {
    await toast.promise(promise, {
        pending: start_message,
        success: success_message,
        error: failure_message

    });
}
