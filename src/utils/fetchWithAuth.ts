export async function fetchWithAuth(url: string, options: RequestInit, refresh: string) {
    let res = await fetch(url, options);
    if (res.status === 401) {
      const newAccessToken = await refreshToken(refresh);
  
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${newAccessToken}`,
      };
      res = await fetch(url, options); 
    }
  
    if (!res.ok) {
      throw new Error(res.statusText);
    }
  
    return res; 
}