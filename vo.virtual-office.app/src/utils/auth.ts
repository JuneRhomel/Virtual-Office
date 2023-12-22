import { ResponseLoginModel, LoginModel } from "../model/model";
async function auth(_props: LoginModel): Promise<ResponseLoginModel> {
    let response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(_props),
    });
    const responseData: ResponseLoginModel = await response.json();
    const token = responseData.token;
    localStorage.setItem("token", token);
    return responseData;
}

export default auth;
