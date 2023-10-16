import React from "react";
import { Alert, BackHandler } from "react-native";

/*********************** ARCHIVO DE FUNCIONES AUXILIARES VARIAS JAVASCRIPT **************************/
export const _handleBackButtonMsg = () => {
  Alert.alert(
    "",
    "¿Seguro quieres salir de Yapp?",
    [
      {
        text: "Cancelar",
        onPress: () => console.log("Se cancelo cerrar la app"),
        style: "cancel"
      },
      {
        text: "OK",
        onPress: () => BackHandler.exitApp()
      }
    ],
    {
      cancelable: false
    }
  );
  return true;
};

export const _validateRut = rut => {
  var Fn = {
    //"XXXXXXXX-X"
    validaRut: function(rut) {
      if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rut)) {
        return false;
      }
      var tmp = rut.split("-");
      var digv = tmp[1];
      var rut = tmp[0];
      if (digv == "K") digv = "k";
      return Fn.dv(rut) == digv;
    },
    dv: function(T) {
      var M = 0,
        S = 1;
      for (; T; T = Math.floor(T / 10))
        S = (S + (T % 10) * (9 - (M++ % 6))) % 11;
      return S ? S - 1 : "k";
    }
  };

  return Fn.validaRut(rut);
};

export const _formatRut = rut => {
  var actual = rut.replace(/^0+/, "");
  if (actual != "" && actual.length > 1) {
    var sinPuntos = actual.replace(/\./g, "");
    var actualLimpio = sinPuntos.replace(/-/g, "");
    var inicio = actualLimpio.substring(0, actualLimpio.length - 1);
    var rutPuntos = "";
    var i = 0;
    var j = 1;
    for (i = inicio.length - 1; i >= 0; i--) {
      var letra = inicio.charAt(i);
      rutPuntos = letra + rutPuntos;
      if (j % 3 == 0 && j <= inicio.length - 1) {
        rutPuntos = "." + rutPuntos;
      }
      j++;
    }
    var dv = actualLimpio.substring(actualLimpio.length - 1);
    rutPuntos = rutPuntos + "-" + dv;
  }
  return rutPuntos;
};

export const _validateRegisterEmail = email => {
  const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
  return expression.test(String(email).toLowerCase());
};

export const _validateRegisterPassword = password => {
  const expression = /^([a-zA-Z0-9_-\u0600-\u065f\u066a-\u06EF\u06fa-\u06ff\ufb8a\u067e\u0686\u06af\u0750-\u077f\ufb50-\ufbc1\ufbd3-\ufd3f\ufd50-\ufd8f\ufd92-\ufdc7\ufe70-\ufefc\uFDF0-\uFDFD]+){6,10}$/;
  return expression.test(String(password).toLowerCase());
};

export const justAnAlert = () => {
  alert("hello");
};

export const arrayCheckboxHelperOb4 = arrayProps => {
  let filledArray = [...new Array(arrayProps.length)].map((convenio, i) => ({
    id: convenio.id,
    name: convenio.name
  }));
};
