const BASE_URL = "https://webdev-music-003b5b991590.herokuapp.com/user/";

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const data = await fetch(`${BASE_URL}login/`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "content-type": "application/json",
    },
  });

  if (data.ok) {
    return await data.json();
  } else {
    throw new Error("Ошибка при получении информации о пользователе");
  }
}

export async function signUp({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const response = await fetch(`${BASE_URL}signup/`, {
    method: "POST",
    body: JSON.stringify({ email, password, username: email,}),
    headers: {
      "content-type": "application/json",
    },
  });

  const data = await response.json();

  if (response.ok) {
    return data;
  } else {
    const errors = [data.message]

    if (data.data && data.data.errors)
      for (const key in data.data.errors) {
        errors.push(data.data.errors[key])
      }

    throw new Error(errors.join("\n"));
  }
}

export async function getTokens({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const response = await fetch(`${BASE_URL}token/`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "content-type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Ошибка при получении токена");
  }

  const data = await response.json();

  return data;
}

export async function refreshTokens({
  refreshToken,
}: {
  refreshToken: string;
}) {
  const tokens = await fetch(`${BASE_URL}token/`, {
    method: "POST",
    body: JSON.stringify({ refreshToken }),
    headers: {
      "content-type": "application/json",
    },
  });

  if (tokens.ok) {
    return await tokens.json();
  } else {
    throw new Error("Ошибка при обновлении токена");
  }
}
