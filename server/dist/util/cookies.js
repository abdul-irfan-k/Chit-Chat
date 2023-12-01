export const assignCookiesHandler = ({ res, token, tokenName, expires }) => {
    const expire = typeof expires !== "string"
        ? expires
        : expires == "1d"
            ? new Date(Date.now() + 1000 * 60 * 60 * 24)
            : new Date(Date.now() + 1000 * 60 * 60);
    res.cookie(tokenName, token, {
        httpOnly: true,
        expires: expire,
    });
};
