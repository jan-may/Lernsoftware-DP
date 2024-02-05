export const judgeOptions = {
  method: "POST",
  url: "https://judge0-extra-ce.p.rapidapi.com/submissions",
  params: {
    base64_encoded: "true",
    wait: "true",
    fields: "*",
  },
  headers: {
    "content-type": "application/json",
    "Content-Type": "application/json",
    "X-RapidAPI-Key": import.meta.env.VITE_JUDGE0_API_KEY,
    "X-RapidAPI-Host": "judge0-extra-ce.p.rapidapi.com",
  },
  data: {
    language_id: 29,
    source_code: "",
    stdin: "",
    cpu_time_limit: 3,
    cpu_extra_time: 0,
    wall_time_limit: 3,
  },
};
