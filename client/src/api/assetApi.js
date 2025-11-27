const API_URL = 'http://localhost:5000/api/assets';

export const fetchAssets = async () => {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Failed to fetch assets');
    return response.json();
};

export const createAsset = async (assetData) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(assetData)
    });
    if (!response.ok) throw new Error('Failed to create asset');
    return response.json();
};

export const deleteAsset = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Failed to delete asset');
    return response.json();
};

//adding 
export const updateAsset = async (id, assetData) => {
    // Assuming your backend uses PUT /api/assets/:id
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(assetData)
    });
    if (!response.ok) throw new Error('Failed to update asset');
    return response.json();
};