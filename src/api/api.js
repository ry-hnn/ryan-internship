import axios from "axios";

const API_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections";
const ITEMS_API_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems";
const SELLERS_API_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers";
const EXPLORE_API_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore";
const FILTER_API_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter={value}";
const AUTHOR_API_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/authors";

const getHotCollections = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/hot-collections`);
    const collections = response.data;
    if (id) {
      return collections.find((item) => item.id === id);
    }
    return collections;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getNewItems = async () => {
  try {
    const response = await axios.get(ITEMS_API_URL);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getTopSellers = async () => {
  try {
    const response = await axios.get(SELLERS_API_URL);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getExploreItems = async () => {
  try {
    const response = await axios.get(EXPLORE_API_URL);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getFilterItems = async (filter) => {
  try {
    const response = await axios.get(
      `${FILTER_API_URL.replace("{value}", filter)}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};


// Added retry logic to reduce failures from temporary network/API hiccups.

const getAuthorItems = async (authorId, retries = 3) => {
  if (!authorId) {
    return null;
  }

  const fetchData = async (attempt) => {
    try {
      const response = await axios.get(`${AUTHOR_API_URL}?author=${authorId}`, { timeout: 5000 });
      if (response.status === 200) {
        return response.data;
      } else {
        return null;
      }
    } catch (error) {
      if (attempt < retries) {
        return fetchData(attempt + 1);
      } else {
        return null;
      }
    }
  };

  return fetchData(0);
};

export {
  getHotCollections,
  getNewItems,
  getTopSellers,
  getExploreItems,
  getFilterItems,
  getAuthorItems,
};
