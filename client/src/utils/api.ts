export const authAPI = {
  login: async (credentials: { username: string; password: string }) => {
    // Server expects { email, password } so map username -> email field
    const payload = { email: credentials.username, password: credentials.password };

    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    return res.json();
  },

  register: async (data: { username: string; email: string; password: string }) => {
    // Server expects `name` field for the user
    const payload = { name: data.username, email: data.email, password: data.password };

    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    return res.json();
  },
};
