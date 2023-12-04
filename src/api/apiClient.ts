import axios from "axios";

const API_URL = "https://api.mocki.io/v2/016d11e8/product-widgets";

export const fetchProductWidgets = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching:", error);
        throw error;
    }
};
