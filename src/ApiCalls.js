const baseURL = "https://getpantry.cloud/apiv1/pantry/929de230-c666-4f11-9602-b7c818abee8d"

const checkForErrors = (response) => {
  if(!response.ok) {
    throw new Error(response.status)
} else {
    return response.json(); 
}
}

export const getShelves = () => {
  return fetch(`${baseURL}`)
  .then(response => checkForErrors(response))
}

export const getItems = (shelves) => {
  const items = shelves.map(shelf => {
    return fetch(`${baseURL}/basket/${shelf}`)
   .then(response => checkForErrors(response))
  }) 
  return Promise.all(items)
}