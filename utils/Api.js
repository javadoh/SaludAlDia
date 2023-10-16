import React from "react";
import {
  BACKEND_PREFIX_URL,
  BACKEND_VERSION_URL,
  STATIC_TOKEN_CONNECTION,
  BACKEND_CALIDAD_PREFIX_URL,
  BACKEND_CALIDAD_VERSION_URL,
  PATH_GET_USER,
  PATH_GET_PROMOS_NOTICES
} from "@utils/Constants";

//const BASE_PATH = `${BACKEND_PREFIX_URL}${BACKEND_VERSION_URL}`; //ANTIGUA PRODUCCION YAPP ANTERIOR
const BASE_PATH = `${BACKEND_CALIDAD_PREFIX_URL}${BACKEND_CALIDAD_VERSION_URL}`;

class APIError extends Error {
  constructor(res, data) {
    super(
      data.errors
        ? data.errors[0]
        : data.error || data.message || res.statusText || res.status
    );

    this.name = "APIError";
    this.type = data.type;
    this.status = res.status;
    this.statusText = res.statusText;
  }
}

function buildPath(path) {
  const normalizedPath = path[0] === "/" ? path : `/${path}`;
  console.log("PATH: " + BASE_PATH + normalizedPath);
  return BASE_PATH + normalizedPath;
}

function makeRequest(path, options) {
  const { method = "GET", body, headers = {} } = options;

  const normalizedBody = typeof body === "object" ? JSON.stringify(body) : body;

  const authCookie = true; //readAuthCookie();
  if (authCookie) {
    headers["Authorization"] = `Bearer: ${authCookie}`;
  }

  headers["Content-Type"] = "application/json";
  headers["Accept"] = "application/json";

  return new Request(buildPath(path), {
    method,
    body: normalizedBody,
    headers
  });
}

async function callApi(path, options) {
  const req = makeRequest(path, options);
  const res = await window.fetch(req);

  if (!res.ok) {
    console.log("RESPONSE ERROR: " + res.error);
    let data = {};
    try {
      data = await res.json();
    } catch (error) {
      console.log("ERROR: " + error);
    }
    throw new APIError(res, data);
  }

  if (res.status == 204) {
    return;
  }

  try {
    return await res.json();
  } catch (error) {
    console.log(error);
    // The server's response was not application/JSON
    /*errorTracker.log(
      new Error(
        `Expected a JSON response for ${req.method} ${
          req.url
        }. Got something else.`
      )
    );*/

    return {};
  }
}

/***************************************************************/
/*********************  API CALLS ******************************/
/***************************************************************/

export const GET_ONBOARD_INIT_PARAMS = {
  async getOnBoardInitData() {
    var path = `initboard`;
    const data = await callApi(path, {
      method: "GET"
    });
    return data;
  }
};

export const POST_ONBOARD_USER_DATA = {
  async postOnBoardUserData(data) {
    console.log("Data desde el api: " + data);

    var path = `onboard/`;
    const response = await callApi(path, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: data
    });

    console.log("DESDE API RESPONSE: " + response);
    return response;
  }
};

export const GET_PROMOS_NOTICES = {
  async getGeneralPromosNotices() {
    var path = `${PATH_GET_PROMOS_NOTICES}`;
    const data = await callApi(path, {
      method: "GET"
    });
    return data;
  }
};

export const GET_USER_PROFILE = {
  async getUserProfile(userId) {
    var path = `${PATH_GET_USER}${userId}`;
    const response = await callApi(path, {
      method: "GET"
    });
    return response;
  }
};

export const POST_PROFILE_USER_DATA = {
  async postProfileUserData(data) {
    console.log("Data desde el api postprofile: " + data);

    var path = `userSave`;
    const response = await callApi(path, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: data
    });

    console.log("DESDE API POST PROFILE RESPONSE: " + response);
    return response;
  }
};

export const GET_PRODUCTS_LIVE_SEARCH = {
  async getProductsLiveToSearch(text) {
    var path = `product?word=${text}`;
    const data = await callApi(path, {
      method: "GET"
    });
    return data;
  }
};

export const GET_PRODUCT_RESULTS = {
  async getProductResults(isExactSearch, productId, userId) {
    var path = `productresult?exactSearch=${isExactSearch}&id=${productId}&userId=${userId}`;
    const data = await callApi(path, {
      method: "GET"
    });
    return data;
  }
};

export const POST_PRODUCT_TO_PRE_ORDER = {
  async postProductToPreOrder(data) {
    var path = `addProductShoppingCart`;
    const response = await callApi(path, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: data
    });
    return response;
  }
};

export const GET_USER_PRE_ORDER = {
  async getUserProductPreOrder(userId) {
    var path = `getShoppingCartByUser/${userId}`;

    console.log("Api path: " + path);
    const data = await callApi(path, {
      method: "GET",
      headers: {
        Authorization: "sfgkjdfsgfksdjgf",
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
    console.log("Api data: " + data);
    return data;
  }
};

export const DELETE_PRODUCT_FROM_PRE_ORDER = {
  async deleteProductFromPreOrder(idProductPreOrder) {
    var path = `deleteProductShoppingCart/${idProductPreOrder}`;
    const response = await callApi(path, {
      method: "POST",
      headers: {
        Authorization: "sfgkjdfsgfksdjgf",
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
    return response;
  }
};

export const POST_ADDRESS_PRE_ORDER = {
  postAddressPreOrder(data) {
    let path = `address`;
    const response = fetch(BASE_PATH + path, {
      method: "POST",
      headers: {
        Authorization: "sfgkjdfsgfksdjgf",
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: data
    });

    return response;
  }
};
