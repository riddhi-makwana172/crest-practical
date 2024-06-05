

const apiHost = "https://wizard-world-api.herokuapp.com"

export const wizardColumns = [{
    title: "Name",
    key: "name",
    filter: true
},
{
    title: "Difficulty",
    key: "difficulty",
    filter: true
},
{
    title: "Ingredient",
    key: "ingredients",
    filter: true
},
{
    title: "Inventor Full Name",
    key: "inventors",
    filter: true
},
{
    title: "Manufacturer",
    key: "manufacturer",
    filter: true
},
{
    title: "Characteristics",
    key: "characteristics",
    filter: false
}]

export const callAPIInterface = async (path) => {
    try {
        const url = `${apiHost}${path}`
        const response = await fetch(url);

        // Check for successful response status code
        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        // Handle errors appropriately, e.g., display an error message to the user
        return null; // Or return a default value or handle error state
    }
}

export const regex = /\s/g;

export const createQueryString = (obj) => {
    const params = [];
    for (const [key, value] of Object.entries(obj)) {
        params.push(`${[key.replace(regex, "")]}=${encodeURIComponent(value)}`);
    }
    return params.join('&');
}