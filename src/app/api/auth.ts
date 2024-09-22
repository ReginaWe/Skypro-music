const BASE_URL = "https://webdev-music-003b5b991590.herokuapp.com/user/";

export async function login({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    const data = await fetch (`${BASE_URL}login/`, {
        method: "POST",
        body: JSON.stringify({email, password}),
        headers: {
            "content-type": "application/json"
        }
    })

    if (data.ok) {
        return await data.json();
    } else {
        throw new Error("Ошибка при получении информации о пользователе");
    }
}

export async function signUp({
    username,
    email,
    password,
  }: {
    username: string;
    email: string;
    password: string;
  }) {
    const data = await fetch (`${BASE_URL}signup/`, {
        method: "POST",
        body: JSON.stringify({email, password}),
        headers: {
            "content-type": "application/json"
        }
    })

    if (data.ok) {
        return await data.json();
    } else {
        throw new Error("Ошибка при регистрации пользователя");
    }
}

export async function getTokens({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
    debugger
    const tokens = await fetch(`${BASE_URL}token/`, {
        method: "POST",
        body: JSON.stringify({email, password}),
        headers: {
            "content-type": "application/json"
        }
    })

    if (tokens.ok) {
        return await tokens.json();
    } else {
        throw new Error("Ошибка при получении токена");
    }
}

export async function refreshTokens({
    refreshToken,
  }: {
    refreshToken: string;
  }) {
      const tokens = await fetch(`${BASE_URL}token/`, {
          method: "POST",
          body: JSON.stringify({refreshToken}),
          headers: {
              "content-type": "application/json"
          }
      })
  
      if (tokens.ok) {
          return await tokens.json();
      } else {
          throw new Error("Ошибка при обновлении токена");
      }
  }
