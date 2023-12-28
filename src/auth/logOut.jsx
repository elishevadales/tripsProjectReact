export const logOut = () => {
    localStorage.removeItem(TOKEN_NAME);
    nav("/");
}