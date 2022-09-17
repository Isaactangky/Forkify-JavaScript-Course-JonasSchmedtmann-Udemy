import { TIMEOUT_SEC } from "./config";
import { async } from "regenerator-runtime";

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};
export const AJAX = async function (url, uploadData = undefined) {
  // const res = await fetch(url);
  try {
    const fetchPro = uploadData ?
      fetch(url, {
        method: 'POST', // POST request
        headers: {
          'Content-Type': 'application/json', // Upload data type
        },
        body: JSON.stringify(uploadData),
      })
      : fetch(url);
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);

    // `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (error) {
    throw error;
  }
};

/*
export const getJSON = async function (url) {
  // const res = await fetch(url);
  try {
    const fetchPro = fetch(url)
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);

    // `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (error) {
    throw error;
  }
};

export const sendJSON = async function (url, uploadData) {
  // const res = await fetch(url);
  try {
    const fetchPro = fetch(url, {
      method: 'POST', // POST request
      headers: {
        'Content-Type': 'application/json', // Upload data type
      },
      body: JSON.stringify(uploadData),
    })
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);

    // `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (error) {
    throw error;
  }
};
*/