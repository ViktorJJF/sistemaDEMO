import { isPast, format } from "date-fns";
import { store } from "@/store";

export let msToTime = (duration) => {
  var milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  return (
    (hours > 0 ? (hours != 1 ? hours + " horas " : hours + " hora ") : "") +
    (minutes > 0 ? minutes + " minutos" : "") +
    (seconds > 0 ? seconds + " segundos" : "")
  );
  // seconds +
  // " segundos"
};

export const isLogged = () => {
  return new Promise((resolve, reject) => {
    axios
      .post("/api/users/logged")
      .then((res) => {
        if (res.data.ok) {
          resolve(res.data.payload);
        } else {
          resolve(false);
        }
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });
};

// const localesDateFns = {
//     en: require('date-fns/locale/en'),
//     es: require('date-fns/locale/es')
// }

export const getFormat = (date, formatStr) => {
  // return format(date, formatStr, {
  //     locale: localesDateFns[window.__localeId__]
  // })
  return format(date, formatStr);
};

export const formatErrorMessages = (translationParent, msg) => {
  const errorArray = [];
  // Check for error msgs
  if (msg !== null) {
    const json = JSON.parse(JSON.stringify(msg));
    // If error message is an array, then we have mutiple errors
    if (Array.isArray(json)) {
      json.map((error) => {
        errorArray.push(i18n.t(`${translationParent}.${error.msg}`));
      });
    } else {
      // Single error
      errorArray.push(i18n.t(`${translationParent}.${msg}`));
    }
    return errorArray;
  }
  // all good, return null
  return null;
};

export const buildPayloadPagination = (pagination, search) => {
  const { sortBy, page, rowsPerPage } = pagination;
  let { descending } = pagination;
  // Gets order
  descending = descending ? -1 : 1;

  let query = {};

  // If search and fields are defined
  if (search) {
    query = {
      sort: sortBy,
      order: descending,
      page,
      limit: rowsPerPage,
      filter: search.query,
      fields: search.fields,
    };
  } else {
    // Pagination with no filters
    query = {
      sort: sortBy,
      order: descending,
      page,
      limit: rowsPerPage,
    };
  }
  return query;
};

// Catches error connection or any other error (checks if error.response exists)
export const handleError = (error, commit, reject) => {
  let errMsg = error.response.data.err.message;
  console.log("el error: ", errMsg);
  // Resets errors in store
  console.log("se entro al error");
  commit("loadingModule/showLoading", false, { root: true });
  let msg;
  if (errMsg) {
    msg = errMsg;
  } else {
    msg = "Algo salio mal";
  }
  commit("errorModule/showError", msg, {
    root: true,
  });
  reject(error);
};

export const buildSuccess = (
  msg,
  commit,
  resolve,
  resolveParam = undefined
) => {
  commit("loadingModule/showLoading", false, { root: true });
  commit("successModule/showSuccess", msg, {
    root: true,
  });
  //   commit(types.SUCCESS, null, { root: true });
  //   setTimeout(() => {
  //     return msg
  //       ? commit(types.SUCCESS, msg, { root: true })
  //       : commit(types.SHOW_SUCCESS, false, { root: true });
  //   }, 0);
  //   commit(types.ERROR, null);
  resolve(resolveParam);
};

// Checks if tokenExpiration in localstorage date is past, if so then trigger an update
export const checkIfTokenNeedsRefresh = () => {
  // Checks if time set in localstorage is past to check for refresh token
  if (
    window.localStorage.getItem("token") !== null &&
    window.localStorage.getItem("tokenExpiration") !== null
  ) {
    if (
      isPast(
        new Date(
          JSON.parse(window.localStorage.getItem("tokenExpiration")) * 1000
        )
      )
    ) {
      store.dispatch("refreshToken");
    }
  }
};
