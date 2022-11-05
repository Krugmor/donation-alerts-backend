function decode(base64: string) {
  return decodeURIComponent(
    Buffer.from(base64.replace(/-/g, "+").replace(/_/g, "/"), "base64")
      .toString("ascii")
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
}

export const decodeJwt = (token: string) => {
  var base64Array = token.split(".");
  var jsonPayload = decode(base64Array[1]);

  return JSON.parse(jsonPayload);
};
