export const getCleanBase64File = async (file) => {
    const dataUrl = await new Promise(resolve => {
        let reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(file);
    });
    return dataUrl.split(",").pop();
};