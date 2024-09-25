// makes frontend call to serverless Netlify function and returns JSON response object

export const callToServerlessFunction = async () => {
  const apiCall = window.location.hostname === "localhost" ? "http://localhost:8888/.netlify/functions/api-call" : "/.netlify/functions/api-call";

  try {
    const fetchedApiData = await fetch(apiCall);
    const apiDataJson = await fetchedApiData.json();

    if (!fetchedApiData.ok) {
      const errorMessage = `${apiDataJson.status} ${apiDataJson.statusText}`;
      console.log("Error: ", errorMessage);
      throw new Error(errorMessage);
    }

    return apiDataJson;
  } catch (error) {
    return error;
  }
};