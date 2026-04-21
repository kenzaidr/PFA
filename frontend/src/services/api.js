const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

async function parseErrorResponse(response) {
  try {
    const data = await response.json();
    const err = new Error(data.message || 'Request failed');
    err.status = response.status;
    err.fieldErrors = data.fieldErrors || {};
    err.data = data;
    return err;
  } catch {
    const err = new Error(`Request failed with status ${response.status}`);
    err.status = response.status;
    err.fieldErrors = {};
    return err;
  }
}

export const api = {
  async register(payload) {
    const response = await fetch(`${API_BASE_URL}/api/v1/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw await parseErrorResponse(response);
    }

    return response.json();
  },
};
